import React from 'react';
import { Button} from '@vkontakte/vkui';
import '../resources/styles/music_picker.css'
import { View, Panel, Root, PanelHeader } from '@vkontakte/vkui';
import Navbar from '../panels/Navbar';
import search from '../resources/icons/search.svg'
import MusicItem from './custom_views/MusicItem';
import { getMusicList } from '../utils/Utils';
class MusicPicker extends React.Component {
   
    constructor(props){
        super(props)
        this.state = {
            searchText : "",
            musicList : getMusicList()
        }
        this.textChanged = this.textChanged.bind(this)
    }
    textChanged(event){
        if (event){
            var value = event.target.value
            this.setState({searchText : value})
        }
    }
   
    render() {
        return (
            <div className="music_picker_container">
                 <PanelHeader>
                    <Navbar isShowRightIcon={true} back="edit" onBack={this.props.onBack} title="Выбор музыки"/>
                </PanelHeader>
                <div className="search_music_container">
                    <img className="search_icon_input" src={search}/>
                    <input className="search_input" placeholder="Поиск" onChange={this.textChanged} value={this.state.searchText} />
                </div>
                {this.state.musicList.length > 0 && this.state.musicList.map((item, index) => (
                    <MusicItem onMusicPicked={this.props.onMusicPicked} index={index} music={item} key={index}/>
                ))}
            </div>
        );
    }
}
export default MusicPicker;