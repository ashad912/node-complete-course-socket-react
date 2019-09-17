import React from 'react';
import Box from './Box';
import './DragThingsToBoxesDemo.css';
import io from "socket.io-client"

// const socket = io('http://127.0.0.1:4000', {
//   path: '/dnd'
// })

const socket = io('http://localhost:4000/dnd')


const createTempItemListUser = () => {
  return [
      {
        _id: 1,
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
        _id: 2,
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
        _id: 3,
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
    
      {
        _id: 4,
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
    userItems: createTempItemListUser(),
    missionItems: createTempItemListMission(),
    socketValue: 0
  }
 
  componentDidMount() {
    socket.on('test', (data) => {
      console.log('socketing')
      this.setState({
        data: data
      })
    })

    socket.on('updateItems', (items) => {
      console.log('getUpdatedList')
      this.setState({
        missionItems: items
      }, () => {
        this.setState({
          updating: false
        })
      })
    })
    
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
    console.log('clicked')
    this.setState({
      socketValue: this.state.socketValue + 1
    }, () => {
      socket.emit("test", this.state.socketValue)
    })

  }

  updateUserItems = (items) => {
    this.setState({
      userItems: items
    })
  }

  updateMissionItems = (items) => {
    if(!this.state.updating){
      this.setState({
        updating: true,
        backup: this.state.missionItems
      }, () => {
        console.log('items update from', items)
        socket.emit('updateItems', items)
      })
    }else{
      setTimeout(() => { //Start the timer
        this.updateMissionItems(this.state.backup)
      }, 50)
    }
    
    
  }
  render() {
    return (
      <React.Fragment>
        <div onClick={this.handleBack}>
          <p>Back</p>
          
        </div>
        <p>SocketIO: {this.state.data}</p>
        <div onClick={this.handleClick}>Increment</div>
        <div className="drag_things_to_boxes">
            <Box targetKey="box" items={this.state.userItems} updateItems={this.updateUserItems} boxname='user'/>
            <Box targetKey="box" items={this.state.missionItems} updateItems={this.updateMissionItems}  boxname='mission' />
        </div>
      </React.Fragment>
    )
  }
}