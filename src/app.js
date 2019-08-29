//'node -r esm <file>'
//'nodemon -r esm <file>'

import express from 'express'
import {router} from './routes/api'
import {questRouter} from './routes/quest'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import path from 'path'
import cors from 'cors'
import cookieParser from 'cookie-parser'

mongoose.Promise = global.Promise

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false})

//set up express app
export const app = express()


app.use(cors());
app.use(express.static(path.join(__dirname, 'client/build')));
//app.use(express.static('public')) //get the resources

app.use(bodyParser.json()) //going to have access to json mssg
app.use(cookieParser())


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

