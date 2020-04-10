import React from 'react';
import Box from './Box';
import './DragThingsToBoxesDemo.css';
import * as socket from '../../../socket'
import uuid from 'uuid/v1'
import Loading from '../../layout/Loading';


//const socket = io('http://localhost:4000/dnd')

const userItemsName = 'userItems'
const missionItemsName = 'missionItems'

const createTempItemListUser = () => {
  return [
      {
        _id: uuid(),
        model: {
          id: 101,
          type: {
              id: 201,
              type: 'amulet'
          },
          name: 'diamond',
          imgSrc: 'diamond-amulet.png'
        },
        owner: '35resf23'
      },
      {
        _id: uuid(),
        model: {
          id: 102,
          type: {
              id: 201,
              type: 'amulet'
          },
          name: 'pearl',
          imgSrc: 'pearl-amulet.png'
      },
        owner: '35resf23'
      },
      {
        _id: uuid(),
        model: {
          id: 103,
          type: {
              id: 201,
              type: 'amulet'
          },
          name: 'sapphire',
          imgSrc: 'sapphire-amulet.png'
      },
        owner: '35resf23'
      },
      {
        _id: uuid(),
        model: {
          id: 101,
          type: {
              id: 201,
              type: 'amulet'
          },
          name: 'diamond',
          imgSrc: 'diamond-amulet.png'
        },
        owner: '35resf23'
      },
      

  ]
}

const createTempItemListMission = () => {
  return [
    
      /*{
        _id: uuid(),
        model: {
          id: 103,
          type: {
              id: 201,
              type: 'amulet'
          },
          name: 'sapphire',
          imgSrc: 'sapphire-amulet.png'
      },
        owner: '35resf23'
      },*/

  ]
}

const backToEvents = (history) => {
  history.push({
    pathname: '/',
    state: {indexRedirect: 1}
  }) 
}


export default class DragThingsToBoxesDemo extends React.Component {




  state = {
    [userItemsName]: createTempItemListUser(),
    [missionItemsName]: createTempItemListMission(),
    //socketValue: 0
  }
 
  componentDidMount() {
    
    /*socket.on('test', (data) => {
      console.log('socketing')
      this.setState({
        data: data
      })
    })*/

    /*socket.on('updateItems', (items) => {
      console.log('getUpdatedList')
      this.setState({
        missionItems: items
      }, () => {
        this.setState({
          updating: false
        })
      })
    })*/
    

    /*socket.on('addItem', (item) => {
      console.log('addItemSocketOnClient')

      const items = [...this.state.missionItems, item]
      this.setState({
        missionItems: items
      })
    })

    socket.on('deleteItem', (id) => {
      console.log('deleteItemSocketOnClient')

      let items = this.state.missionItems.filter((item) => {
        return item._id !== id
      })
      this.setState({
        missionItems: items
      })
    })*/
    
    /*if(this.props.location.state && this.props.location.state.id != null){
      const id = this.props.location.state.id
      console.log(id)
      //this.props.history.replace('', null);
    } else {
      backToEvents(this.props.history)
      //redirection in props.history
    }*/
  }

  handleBack = () => {
    backToEvents(this.props.history)
  }

  handleClick = () => {
    /*console.log('clicked')
    this.setState({
      socketValue: this.state.socketValue + 1
    }, () => {
      socket.emit("test", this.state.socketValue)
    })*/

  }




  addMissionItem = (item) => {
    //socket.emit('addItem', item)
    socket.addItemEmit(item, this.state.roomId)
  }

  deleteMissionItem = (id) => {
    //socket.emit('deleteItem', id)
    socket.deleteItemEmit(id, this.state.roomId)
  }

  addItemToState = (item, targetKey) => {
    console.log(...this.state[targetKey])
    const items = [...this.state[targetKey], item]
    
    this.setState({
      [targetKey]: items
    })
  }

  deleteItemFromState = (id, targetKey) => {
    console.log(...this.state[targetKey])
    let items = this.state[targetKey].filter((item) => {
      return item._id !== id
    })

    this.setState({
      [targetKey]: items
    })
  }
  render() {

    if(!this.state.roomId){
      return <Loading/>
    }
    return (
      <React.Fragment>
        <div onClick={this.handleBack}>
          <p>Back</p>
          
        </div>
        <p>SocketIO-RoomId: {this.state.roomId}</p>
        <div onClick={this.handleClick}>Increment</div>
        <div className="drag_things_to_boxes">
            <Box targetKey={userItemsName} items={this.state.userItems} addItem={this.addItemToState} deleteItem={this.deleteItemFromState} boxname='user'/>
            <Box targetKey={missionItemsName} items={this.state.missionItems} addItem={this.addMissionItem} deleteItem={this.deleteMissionItem} boxname='mission' />
        </div>
      </React.Fragment>
    )
  }
}