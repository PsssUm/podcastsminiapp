import React from 'react';
import more_blue_16 from '../../resources/icons/more_blue_16.svg'
class MusicItem extends React.Component {
   
    constructor(props){
        super(props)
        this.state = {
          
        }
      
    }
    
   
    render() {
        return (
            <div onClick={() => this.props.onMusicPicked(this.props.music)} className="music_item_container hover">
                <div className="flex">
                    <img className="album_image_music" src={this.props.music.album}/>
                    <div>
                        <p className="music_name_item">{this.props.music.title}</p>
                        <p className="music_artist_item">{this.props.music.artist}</p>
                    </div>
                </div>
                <div className="flex">
                     <p className="music_artist_item music_item_duration">{this.props.music.duration}</p>
                     <img className="more_item_music" src={more_blue_16}/>
                </div>
                
            </div>
        );
    }
}
export default MusicItem;