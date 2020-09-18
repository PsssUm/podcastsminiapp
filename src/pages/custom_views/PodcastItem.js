import React from 'react';
import avatar from '../../resources/icons/avatar.png'
import more from '../../resources/icons/more.svg'
import ic_comment_outline from '../../resources/icons/ic_comment_outline.svg'
import ic_eye from '../../resources/icons/ic_eye.svg'
import ic_like from '../../resources/icons/ic_like.svg'
import ic_reposts from '../../resources/icons/ic_reposts.svg'
import play_btn_podcast from '../../resources/icons/play_btn_podcast.svg'
import '../../resources/styles/details_style.css'

class PodcastItem extends React.Component {
   
    constructor(props){
        super(props)
      
    }
    
    render() {
        return (
                    <div className="flex details_name_icon_cont">
                        <div className="details_image_container hover">
                            <img className="picked_image" src={this.props.podcast.imageSrc} />
                        </div>
                        <div className="full_width_details">
                            <p className="preview_title">{this.props.podcast.title}</p>
                            <p className="group_text">ПараDogs</p>
                            <p className="duration_preview_text">Длительность: {this.props.podcast.duration}</p>


                        </div>
                        
                    </div>
        );
    }
}
export default PodcastItem;