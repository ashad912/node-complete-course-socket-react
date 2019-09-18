import React from 'react';
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';
import BoxItem from './BoxItem'; 



export default class Box extends React.Component {
    constructor(props) {
      super(props);
      /*this.state = {
        items: []
      };*/
    }

    /*componentDidMount(){
      this.setState({
        items: this.props.initList()
      })
    }*/
  
    handleDrop = (e) => {
      console.log('drop', this.props.boxname)
      const item = e.dragData
      this.props.addItem(item, this.props.targetKey)
      //send new item to backend, join boxname to path
      //const items = [...this.props.items, item]

      //this.props.updateItems(items)
      
      //e.containerElem.style.visibility="hidden";
    };
  
    kill = (id) => {
      console.log('kill', this.props.boxname)
      this.props.deleteItem(id, this.props.targetKey)
      /*console.log('kill', this.props.boxname)

      //send id to backend - find item and delete reference from user eq - user is still item owner
      //ALSO add killing item reference to transaction array
      //return updated eq

      let items = this.props.items.filter((item) => {
        return item._id !== id
      })

      //another delete approach
      /*let items = this.state.items.slice();
      const index = items.findIndex((item) => {
        return item.uid == uid
      });
      if (index !== -1) {
        items.splice(index, 1);
      }*/

      //this.props.updateItems(items)
    };

  
  
    render() {

      /*
          Note the two layers of DropTarget. 
          This enables it to handle dropped items from 
          outside AND items dragged between boxes.
      */

      const items = this.props.items //from backend

      return (
        <div className="component_box">
            
              <DropTarget
                onHit={this.handleDrop}
                targetKey="boxItem"
                dropData={{name: this.props.name}}
              >
                <div className="box">
                  {items.map((item, index) => {
                    return (
                      <BoxItem key={item._id} kill={this.kill} boxname={this.props.boxname} item={item}>
                        {item.model.imgSrc}
                      </BoxItem>
                    )
                  })}
                </div>
              </DropTarget>
            
        </div>
      );
    }
  }