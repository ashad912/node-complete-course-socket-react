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

export const addItemEmit = (item) => {
    socket.emit('addItem', item)
}

export const deleteItemEmit = (id) => {
    socket.emit('deleteItem', id)
}