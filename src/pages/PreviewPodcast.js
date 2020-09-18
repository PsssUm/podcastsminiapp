import React from 'react';
import '../resources/styles/preview.css'
import TimeCodePreviewItem from './custom_views/TimeCodePreviewItem';

class PreviewPodcast extends React.Component {
   
    constructor(props){
        super(props)
        this.state = {
            timecodes : this.props.podcast.timecodes
        }
        this.publishPodcast = this.publishPodcast.bind(this);
    }
    publishPodcast(){
        this.props.changePage("finished")
    }
    render() {
        return (
            <div className="main_content bot_margin_64">
                <div className="navbar_line"/>
                <div className="preview_container">
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
                </div>
                <div className="navbar_line"/>
                <div className="preview_container_desc">
                    <p className="preview_desc_title">Описание</p>
                    <p className="preview_desc_text">{this.props.podcast.description}</p>
                </div>
                <div className="navbar_line"/>
                <div className="preview_container_desc">
                    <p className="preview_desc_title preview_title_bot">Содержание</p>
                    {this.state.timecodes.length > 0 && this.state.timecodes.map((item, index) => (
                        <TimeCodePreviewItem index={index} timecode={item} key={index}/>
                    ))}
                    {this.state.timecodes.length == 0 && <p className="empty_timecodes">не описано</p>}
                </div>
                <div className="bottom_button_container">
                    <div className="bottom_btn_line"/>
                    <div onClick={this.publishPodcast} className="large_vk_btn hover">Опубликовать подкаст</div>
                </div>
            </div>
        );
    }
}
export default PreviewPodcast;