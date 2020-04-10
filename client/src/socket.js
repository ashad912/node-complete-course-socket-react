import io from 'socket.io-client'

const socket =  io('http://localhost:4000/dnd')

export const addItemSubscribe = (item) => {
    socket.on('addItem', item, () => {
        return item
    })
}

export const deleteItemSubscribe = (id) => {
    socket.on('deleteItem', id, () => {
        return id
    })
}

export const joinRoomSubscribe = (roomId) => {
    socket.on('joinRoom', roomId, () => {
        return roomId
    })
}

export const addItemEmit = (item, roomId) => {
    const data = {item: item, roomId: roomId}
    console.log(data)
    socket.emit('addItem', data)
}

export const deleteItemEmit = (id, roomId) => {
    const data = {id: id, roomId: roomId}
    console.log(data)
    socket.emit('deleteItem', data)
}

export const joinRoomEmit = (roomId) => {
    socket.emit('joinRoom', roomId)
}