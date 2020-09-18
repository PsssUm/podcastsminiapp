import React from 'react';
import play_btn_podcast from '../resources/icons/play_btn_podcast.svg'
import { getEpmtyModel } from '../utils/Utils';
import '../resources/styles/share.css'
class SharePodcast extends React.Component {
   
    constructor(props){
        super(props)
        this.state = {
            description : this.props.podcast.description
        }
        this.onDescrtiptionChanged = this.onDescrtiptionChanged.bind(this);
        this.share = this.share.bind(this);
    }
    onDescrtiptionChanged(event){
        if (event){
            var value = event.target.value
            this.setState({description : value})
        }
    }
    share(){
        var podcast = this.props.podcast
        podcast.postText = this.state.description
        this.props.setPodcast(podcast)
        this.props.addPost(podcast)
        this.props.changePage("news")
    }
    render() {
        return (
            <div className="main_content bot_margin_64">
                <textarea onChange={this.onDescrtiptionChanged} value={this.state.description} className="share_textarea"/>
                <div className="podcast_card">
                    <img src={this.props.podcast.imageSrc} className="podcast_image_card"/>
                    <div className="podcast_card_bg">
                        <p className="podcast_card_title">{this.props.podcast.title}</p>
                        <p className="podcast_card_descr">{this.props.podcast.author + " • " + this.props.podcast.duration}</p>
                        <img className="play_btn_podcast" src={play_btn_podcast}/>
                    </div>
                </div>
                <div className="bottom_button_container">
                    <div className="bottom_btn_line"/>
                    <div onClick={this.share} className="large_vk_btn hover">Поделиться</div>
                </div>
            </div>
        );
    }
}
export default SharePodcast;