import {app} from './app'
import socket from 'socket.io'

//refactor needed cause we want to test before listenin
//listen for reqs

const server = app.listen(process.env.PORT || 4000, ()=>{ //process.env.port <- listening to setup hosting variable
    console.log('now listenin for reqs')
})

var io = socket(server) //param is a server, defined upper

io.of('/dnd').on('connection', (socket) => { //each client has own socket
    console.log('New client connected', socket.id)

    socket.on('test', (data)=>{ //data is an object sent by client side
        console.log('got mssg')
        io.of('dnd').emit('test', data) // 'sockets' - all sockets connected ll see it
    })

    socket.on('updateItems', (items)=>{ //data is an object sent by client side
        console.log('got items')
        io.of('dnd').emit('updateItems', items) // 'sockets' - all sockets connected ll see it
    })

    socket.on('addItem', (item) => {
        io.of('dnd').emit('addItem', item)
    })

    socket.on('deleteItem', (id) => {
        io.of('dnd').emit('deleteItem', id)
    })

    socket.on("disconnect", () => console.log("Client disconnected"));
})