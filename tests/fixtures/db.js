import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import {Ninja} from '../../src/models/ninja'
import {Quest} from '../../src/models/quest'

export const ninjaOneId = new mongoose.Types.ObjectId()

export const ninjaOne = {
    _id: ninjaOneId,
    name: 'SuperMario',
    email: 'supermario@ninja.com',
    password: 'supermario',
    tokens: [{
        token: jwt.sign({_id: ninjaOneId}, process.env.JWT_SECRET)
    }]
}


export const ninjaTwoId = new mongoose.Types.ObjectId()

export const ninjaTwo = {
    _id: ninjaTwoId,
    name: 'ExtraMario',
    email: 'extramario@ninja.com',
    password: 'extramario',
    tokens: [{
        token: jwt.sign({_id: ninjaTwoId}, process.env.JWT_SECRET)
    }]
}

export const questOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'First task',
    completed: false,
    owner: ninjaOne._id,

}

export const questTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Second task',
    completed: true,
    owner: ninjaOne._id,
    
}

export const questThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Third task',
    completed: true,
    owner: ninjaTwo._id,
    
}

export const setupDatabase = async () => {
    await Ninja.deleteMany()
    await Quest.deleteMany()
    await new Ninja(ninjaOne).save()
    await new Ninja(ninjaTwo).save()
    await new Quest(questOne).save()
    await new Quest(questTwo).save()
    await new Quest(questThree).save()
}



