import socket from 'socket.io'
import {server} from './index'

var io = socket(server) //param is a server, defined upper

io.use((socket, next) => {

})

io.of('/dnd').on('connection', (socket) => { //each client has own socket
    console.log('New client connected', socket.id)

    /*socket.on('test', (data)=>{ //data is an object sent by client side
        console.log('got mssg')
        io.of('dnd').emit('test', data) // 'sockets' - all sockets connected ll see it
    })

    socket.on('updateItems', (items)=>{ //data is an object sent by client side
        console.log('got items')
        io.of('dnd').emit('updateItems', items) // 'sockets' - all sockets connected ll see it
    })*/

    socket.on('addItem', (item) => {
        console.log('add item server')
        io.of('dnd').emit('addItem', item)
    })

    socket.on('deleteItem', (id) => {
        console.log('delete item server')
        io.of('dnd').emit('deleteItem', id)
    })

    socket.on("disconnect", () => console.log("Client disconnected"));
})

//api -> create event instance
//-> promise -> authMiddleware + authEventMiddleware -> load component with id of instance (!!!) -> socket emit connection
//==io.use -> query being in party by token->user->party //additional eventToken
//-> joining room refs by instance id