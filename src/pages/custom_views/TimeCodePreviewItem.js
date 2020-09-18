import React from 'react';
class TimeCodePreviewItem extends React.Component {
   
    constructor(props){
        super(props)
        this.state = {
          
        }
      
    }
    
   
    render() {
        return (
            <div className="flex">
                <p className="timecode_preview_item_time">{this.props.timecode.time }<span className="timecode_preview_item_time timecode_preview_item_title">{" — " + this.props.timecode.title}</span></p>
            </div>
        );
    }
}
export default TimeCodePreviewItem;