import React from 'react';
import NewsItem from './custom_views/NewsItem';
import '../resources/styles/news.css'
class News extends React.Component {
   
    constructor(props){
        super(props)
        this.state = {
            
        }
        this.openPodcasts = this.openPodcasts.bind(this);
    }
    openPodcasts(){
        this.props.changePage("podcasts")
    }
    render() {
        return (
            <div className="news_content">
                <div className="line_bg">
                     <div className="navbar_line line_bot_0"/>
                </div>
                
                {this.props.posts.length > 0 && this.props.posts.map((item, index) => (
                    <NewsItem openPodcasts={this.openPodcasts} openDetails={this.props.openDetails} index={index} podcast={item} key={index}/>
                ))}
            </div>
        );
    }
}
export default News;