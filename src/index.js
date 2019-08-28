import {app} from './app'

//refactor needed cause we want to test before listenin
//listen for reqs

app.listen(process.env.PORT || 4000, ()=>{ //process.env.port <- listening to setup hosting variable
    console.log('now listenin for reqs')
})