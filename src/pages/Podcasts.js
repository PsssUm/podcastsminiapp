import React from 'react';
import NewsItem from './custom_views/NewsItem';
import '../resources/styles/news.css'
import PodcastItem from './custom_views/PodcastItem';
class Podcasts extends React.Component {
   
    constructor(props){
        super(props)
        this.state = {
            
        }
        
    }
    createPodcast = () => {
        this.props.setPodcast(getEpmtyModel())
        this.props.changePage("details")
    }
    render() {
        return (
            <div className="news_content podcasts_bg bot_margin_64">
                <div className="line_bg">
                     <div className="navbar_line ling_bot_4"/>
                </div>
                
                {this.props.posts.length > 0 && this.props.posts.map((item, index) => (
                    <PodcastItem openDetails={this.props.openDetails} index={index} podcast={item} key={index}/>
                ))}
                <div className="bottom_button_container">
                    <div className="bottom_btn_line"/>
                    <div onClick={this.createPodcast} className="large_vk_btn hover">Добавить подкаст</div>
                </div>
            </div>
        );
    }
}
export default Podcasts;