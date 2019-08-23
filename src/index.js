//'node -r esm <file>'
//'nodemon -r esm <file>'

import express from 'express'
import {router} from './routes/api'
import {questRouter} from './routes/quest'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import multer from 'multer'

mongoose.Promise = global.Promise

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false})

//set up express app
const app = express()

//demo multer
/*const upload = multer({
    dest: 'public/images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) { //cb means callback
        // cb(new Error('File must be a PDF'))
        // cb(undefined, true) //1st param assoc with error - no error
        // cb(undefined, false)
        //!file.originalname.endsWith('.pdf')
        if (!file.originalname.match(/\.(doc|docx)$/)){
            return cb(new Error('Please upload a Word doc.'))
        }

        cb(undefined, true)
    }
})


//middleware upload.single('upload') - in postman req, it neccs to specify 'upload' header
//in 'images' we got file without extension for the moment
app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
}, (err, req, res, next)=> {
    res.status(400).send({ error: err.message }) //before app.use middleware with 422
})

// reg: / \.(doc|docx)$ / -> must be '.doc' or '.docx' at the end
*/

app.use(express.static('public')) //get the resources

app.use(bodyParser.json()) //going to have access to json mssg


//ORDER IS IMPORTANT!!!
/*app.use((req, res, next) => {
    res.status(503).send('Site is currently down. Check back soon!')
})*/

app.use('/api', router) //export required to use routes from api.js
app.use(questRouter)

//express middleware
/*
app.use((req, res, next)=>{
    //console.log(req.method, req.path)
    if (req.method === 'GET') {
        //res.send('GET requests are disabled')
    } else {
        next()
    }
})
*/




app.use((err, req, res, next)=>{ //4 args, func designed to catch errs
    //console.log(err) //1 param, when error occured it can be showed
    res.status(422).send({error: err.message}) //status provides http code, bad prepared mssg
})

/*
app.get('/api', (req, res) => {
    console.log('GET req')
    res.send({name: 'Yoshi'})
    //res.end() //force to stop searching in browser!
})
*/

//listen for reqs

app.listen(process.env.port || 4000, ()=>{ //process.env.port <- listening to setup hosting variable
    console.log('now listenin for reqs')
})

/*
//hashing pass test
const bCryptFunc = async () => {
    const password = 'Red12345!'
    const hashedPassword = await bcrypt.hash(password, 8) //nice bound beetwen strength and performancne

    console.log(password)
    console.log(hashedPassword)

    const isMatch = await bcrypt.compare('Red12345!', hashedPassword)
    console.log(isMatch)
}
//matching is performed on hashPassword, because hashing is not reversable

bCryptFunc()
*/


/*
//hashing pass test
const tokenFunc = async () => {
    const token = jwt.sign({ _id: 'abc123'}, 'thisismynewcourse', {expiresIn: '7 days'})//1st arg uid from db; 2nd secret token
    console.log(token)//2nd part contains uid and datetokencreation

    const data = jwt.verify(token, 'thisismynewcourse')
    console.log(data) //data correct if signature proper
}
//matching is performed on hashPassword, because hashing is not reversable

tokenFunc()

*/




//ex

/*
import {Quest} from './models/quest'
import {Ninja} from './models/ninja'

const main = async () => {
    const quest = await Quest.findById('5d5443875b76ef4170bad06a')
    //console.log(quest.owner) //then we can take owner id, and create new query - mongoose has better sol
    await quest.populate('owner').execPopulate() //thanks to 'ref' prop
    console.log(quest.owner) //now we have all user profile

    const ninja = await Ninja.findById('5d53f4f759959b4a60abc229')
    //console.log(ninja.quest) //it does not exist, we have to make virtual prop
    await ninja.populate('quests').execPopulate() //thanks to name of virtual field
    console.log(ninja.quests) //it's not stored in db, it's virtual
}

main()
*/