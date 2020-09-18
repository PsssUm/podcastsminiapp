import React from 'react';
import avatar from '../../resources/icons/avatar.png'
import more from '../../resources/icons/more.svg'
import ic_comment_outline from '../../resources/icons/ic_comment_outline.svg'
import ic_eye from '../../resources/icons/ic_eye.svg'
import ic_like from '../../resources/icons/ic_like.svg'
import ic_reposts from '../../resources/icons/ic_reposts.svg'
import play_btn_podcast from '../../resources/icons/play_btn_podcast.svg'
import '../../resources/styles/details_style.css'

class NewsItem extends React.Component {
   
    constructor(props){
        super(props)
      
    }
    
    render() {
        return (
            <div onClick={() => this.props.openPodcasts()} className="news_item">
                <div className="just_content">
                    <div className="flex">
                        <img className="news_item_avatar" src={avatar}/>
                        <div>
                            <p className="news_name_title">{this.props.podcast.author}</p>
                            <p className="new_time">час назад</p>
                        </div>
                    </div>
                    <img className="news_more" src={more}/>
                </div>
                <p className="news_description_text">{this.props.podcast.postText}</p>
                <div className="podcast_card">
                    <img src={this.props.podcast.imageSrc} className="podcast_image_card"/>
                    <div className="podcast_card_bg">
                        <p className="podcast_card_title">{this.props.podcast.title}</p>
                        <p className="podcast_card_descr">{this.props.podcast.author + " • " + this.props.podcast.duration}</p>
                        <img className="play_btn_podcast" src={play_btn_podcast}/>
                    </div>
                </div>
                <div className="new_item_details">
                    <div className="detail_counters">
                        <img src={ic_like} width="24" className="detail_counters_icon"/><div className="detail_counters_text">65 </div>
                        <img src={ic_comment_outline} width="24" className="detail_counters_icon"/><div className="detail_counters_text">36 </div>
                        <img src={ic_reposts} width="21" className="detail_counters_icon"/><div className="detail_counters_text">7 </div>
                        <div className="detail_counters_right">
                            <img src={ic_eye} width="14" className="detail_counters_icon"/><div className="detail_counters_text_right">7,2K</div>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}
export default NewsItem;