import React from 'react';
import close_navbar from '../resources/icons/close_navbar.svg'
import send from '../resources/icons/send.svg'
import arrow_navbar from '../resources/icons/arrow_navbar.svg'

class EditorNavbar extends React.Component {
   
    constructor(props){
        super(props)
        this.state = {
          
        }
      
    }
   
    render() {
        return (
            <div className="navbar">
                <div className="flex horizontal-center">
                    <p className="navbar_title">{this.props.title}</p>
                    <img className="arrow_navbar_name" src={arrow_navbar}/>
                </div>
                
                <img onClick={() => {this.props.onBack(this.props.back)}} className="back_icon" src={close_navbar}/>
                <div onClick={() => {this.props.onSend()}} className="send_container">
                    <img className="send_icon" src={send}/>
                </div>
                
            </div>
        );
    }
}
export default EditorNavbar;