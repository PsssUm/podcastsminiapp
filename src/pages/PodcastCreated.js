import React from 'react';
import plus from '../resources/icons/check_circle_outline_56.svg'
import { getEpmtyModel } from '../utils/Utils';

class PodcastCreated extends React.Component {
   
    constructor(props){
        super(props)
        this.state = {
          
        }
      
    }
    sharePodcast = () => {
        this.props.changePage("share")
    }
   
    render() {
        return (
            <div className="main_content">
                <div className="navbar_line"/>
                <div className="create_donation_container">
                    <img className="plus_img" src={plus}/>
                    <p className="create_title">Подкаст добавлен</p>
                    <p className="create_donation_text">Раскажите своим подписчикам<br/>о новом подкасте, чтобы получить<br/>больше слушателей.</p>
                    <div onClick={this.sharePodcast} className="vk_btn horizontal-center">Поделиться подкастом</div>
                </div>
            </div>
        );
    }
}
export default PodcastCreated;