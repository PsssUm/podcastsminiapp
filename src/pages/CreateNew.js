import React from 'react';
import plus from '../resources/icons/plus.svg'
import { getEpmtyModel } from '../utils/Utils';

class CreateNew extends React.Component {
   
    constructor(props){
        super(props)
        this.state = {
          
        }
      
    }
    createNewPodcast = () => {
        this.props.setPodcast(getEpmtyModel())
        this.props.changePage("details")
    }
   
    render() {
        return (
            <div className="main_content">
                <div className="navbar_line"/>
               <div className="create_donation_container">
                   <img className="plus_img" src={plus}/>
                   <p className="create_title">Добавьте первый подкаст</p>
                   <p className="create_donation_text">Добавляйте, редактируйте и делитесь<br/>подкастами вашего сообщества.</p>
                   <div onClick={this.createNewPodcast} className="vk_btn horizontal-center">Добавить подкаст</div>
               </div>
            </div>
        );
    }
}
export default CreateNew;