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

    socket.on('joinRoom', (roomId) => {
        socket.join(roomId, () => {
            io.of('dnd').to(roomId).emit('joinRoom', roomId)
        })
    })

    /*socket.on('test', (data)=>{ //data is an object sent by client side
        console.log('got mssg')
        io.of('dnd').emit('test', data) // 'sockets' - all sockets connected ll see it
    })

    socket.on('updateItems', (items)=>{ //data is an object sent by client side
        console.log('got items')
        io.of('dnd').emit('updateItems', items) // 'sockets' - all sockets connected ll see it
    })*/

    socket.on('addItem', (data) => {
        console.log('add item server')
        console.log(data)
        io.of('dnd').to(data.roomId).emit('addItem', data.item)
    })

    socket.on('deleteItem', (data) => {
        console.log('delete item server')
        io.of('dnd').to(data.roomId).emit('deleteItem', data.id)
    })

    socket.on("disconnect", () => console.log("Client disconnected"));
})

//api -> create event instance
//-> promise -> authMiddleware + authEventMiddleware -> load component with id of instance (!!!) -> socket emit connection
//==io.use -> query being in party by token->user->party //additional eventToken
//-> joining room refs by instance id