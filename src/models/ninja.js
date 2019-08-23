import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import {Quest} from './quest'

const GeoSchema = new mongoose.Schema({
    "type": {
        type: String,
        default: "Point"
    },
    "coordinates": {
        type: [Number],
        index: '2dsphere'
    }
})



const NinjaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    }, // field options
    email: {
        type: mongoose.Schema.Types.String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    },
    rank: {
        type: String,
    },
    available: {
        type: Boolean,
        default: false
    },
    geometry: GeoSchema
}, {
    timestamps: true
})


NinjaSchema.virtual('quests', { //quests can be reached by relations, BI RELATION!!
    ref: 'quest',
    localField: '_id', //relation from ninja side (we are in ninja schema!)
    foreignField: 'owner' //relation from quest side
})

NinjaSchema.methods.generateAuthToken = async function () { //on instances
    const ninja = this
    const token = jwt.sign({_id: ninja._id.toString()}, process.env.JWT_SECRET)

    ninja.tokens = ninja.tokens.concat({token: token})
    await ninja.save()

    return token
}

//THE SAME DOES toJSON!!!
NinjaSchema.methods.getPublicProfile = function () { //on instances //not async in this case
    const ninja = this
    const ninjaObject = ninja.toObject() //thanks ninjaObject we can manipulate data inside
    
    console.log(ninjaObject)
    delete ninjaObject.password
    delete ninjaObject.tokens

    console.log(ninjaObject)

    return ninjaObject
}




NinjaSchema.methods.toJSON = function () { //like a middleware from express, we can use it with everythin
    const ninja = this
    const ninjaObject = ninja.toObject() //thanks ninjaObject we can manipulate data inside
    
    
    delete ninjaObject.password
    delete ninjaObject.tokens
    delete ninjaObject.avatar //avatar can have big size, no need to get it in response - only specific

    

    return ninjaObject
}

NinjaSchema.statics.findByCredentials = async (email, password) => {
    const ninja = await Ninja.findOne( {email: email})
    

    if(!ninja) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, ninja.password)

    if(!isMatch) {
        throw new Error('Unable to login')
    }
    

    return ninja
}

NinjaSchema.pre('save', async function(next){//middleware, working with static Ninja.create!!

    const ninja = this

    if(ninja.isModified('password')){ //mongoose method
        ninja.password = await bcrypt.hash(ninja.password, 8)
    }

    next()

}) //arrow func cannot bind this

NinjaSchema.pre('remove', async function(next){
    const ninja = this
    await Quest.deleteMany({ owner: ninja._id})
    next() //we're done with this code of middleware
})

/*NinjaSchema.pre('findOneAndUpdate', async function(next){//middleware, working with static 
    console.log('update halko')
    console.log(this)
    this.options.runValidators = true //validation active

    this._update.password = await bcrypt.hash(this._update.password, 8)
    // validation after hashing :<<< (pre save working correctly) - no solutions, only additional validation here
    
    next()

}) //arrow func cannot bind this*/

NinjaSchema.post('aggregate', function(ninjas, next) {
    
    //console.log(ninjas)
    ninjas.forEach(ninja => { 
        delete ninja.password
        delete ninja.tokens
        delete ninja.avatar //avatar can have big size, no need to get it in response - only specific
     });
     
    next();
  });
  

export const Ninja = new mongoose.model('ninja', NinjaSchema)