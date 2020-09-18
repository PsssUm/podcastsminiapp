import React from 'react';
import back from '../resources/icons/back.svg'
import plus_48 from '../resources/icons/plus_48.svg'

class Navbar extends React.Component {
   
    constructor(props){
        super(props)
        this.state = {
          
        }
      
    }
   
    render() {
        return (
            <div className="navbar">
                <p id="navbarTitle" className="navbar_title">{this.props.title}</p>
                {this.props.back != undefined && <img onClick={() => {this.props.onBack(this.props.back)}} className="back_icon" src={back}/>}
                {(this.props.isShowRightIcon != undefined && this.props.isShowRightIcon) && <img src={plus_48} onClick={() => {}} className="navbar_right_icon"/>}
            </div>
        );
    }
}
export default Navbar;