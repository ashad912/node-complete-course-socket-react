import React from 'react';
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';
import './BoxItem.css';

/*
    BoxItem - a thing that appears in a box, after you drag something into the box
*/

export default class BoxItem extends React.Component {
    // the things that appear in the boxes
    constructor(props) {
      super(props);
    }
  
    deleteMe = (e) => {
      console.log(e)
      this.props.kill(this.props.item._id);
    };
  
    handleDrag = (e) => {
      console.log('dragged item from', this.props.boxname)
    }

    render() {
      /*
        Notice how these are wrapped in a DragDropContainer (so you can drag them) AND
        in a DropTarget (enabling you to rearrange items in the box by dragging them on
        top of each other)
      */
      

      return (
        <div className="box_item_component">
          <DragDropContainer
              targetKey="boxItem"
              dragData={this.props.item}
              customDragElement={this.props.customDragElement}
              onDrop={this.deleteMe}
              onDrag={this.handleDrag}
              disappearDraggedElement={true}
              //dragHandleClassName="grabber" //doesnt work on mobile

              //dragHandleClassName - specify that you can only drag a box by grabbing the 'x'.
              //disappearDraggedElement - makes the elements in the boxes disappear when you drag them, so they no longer take up any space.
              
            >
                <div className="outer">
                  <div className="item">
                    <img style={{height: 40, width:40}} src={require(`../../../assets/icons/${this.props.children}`)} alt='icon'/>
                  </div>
                </div>
          </DragDropContainer>
        
        </div>
      );
    }
  }