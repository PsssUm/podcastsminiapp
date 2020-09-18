import React from "react";
import { Button} from '@vkontakte/vkui';
import '../resources/styles/edit.css'
import { View, Panel, Root, PanelHeader } from '@vkontakte/vkui';
import play_blue from '../resources/icons/play_blue.svg'
import pause_gray from '../resources/icons/pause_gray.svg'
import cut_gray from '../resources/icons/cut_gray.svg'
import undo_gray from '../resources/icons/undo_gray.svg'
import music_gray from '../resources/icons/music_gray.svg'
import music_blue from '../resources/icons/music_blue.svg'
import volume_grow_gray from '../resources/icons/volume_grow_gray.svg'
import volume_grow_blue from '../resources/icons/volume_grow_blue.svg'
import volume_down_gray from '../resources/icons/volume_down_gray.svg'
import volume_down_blue from '../resources/icons/volume_down_blue.svg'
import add_circle_24 from '../resources/icons/add_circle_24.svg'
import { getEpmtyTimecodeModel, convertSecondsToTime } from '../utils/Utils';
import TimeCodeItem from './custom_views/TimeCodeItem';
import MusicPicker from './MusicPicker';
import Navbar from '../panels/Navbar';
import BottomSheetDialog from './custom_views/BottomSheetDialog';
import styled from "styled-components";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min";
import Waveform from "./custom_views/Waveform";
import TimelineExample from "./custom_views/TimeLineExample";
import WaveFormExample from "./custom_views/WaveFormExample";
import Mp3Cutter from 'mp3-cutter'
 
class EditPodcast extends React.Component {
   
    constructor(props){
        super(props)
        this.state = {
            isPlaying : false,
            isCut : false,
            isUndo : false,
            isMusic : false,
            isGrow : false,
            isDown : false,
            timecodes : this.props.podcast.timecodes,
            isShowMusicPicker : false,
            music : undefined,
            isShowBottomDialog : false,
            currentTime : 0,
            cutStart : -1,
            cutEnd : -1,
            audioSrc : URL.createObjectURL(this.props.podcast.audioFile)
        }
        this.playClicked = this.playClicked.bind(this);
        this.cutClicked = this.cutClicked.bind(this);
        this.undoClicked = this.undoClicked.bind(this);
        this.musicClicked = this.musicClicked.bind(this);
        this.growClicked = this.growClicked.bind(this);
        this.downClicked = this.downClicked.bind(this);
        this.onSave = this.onSave.bind(this);
        this.addTimecode = this.addTimecode.bind(this);
        this.onDeleteTimeCode = this.onDeleteTimeCode.bind(this);
        this.onTimeCodeTitleChanged = this.onTimeCodeTitleChanged.bind(this);
        this.onTimeCodeTimeChanged = this.onTimeCodeTimeChanged.bind(this);
        this.toogleMusicPicker = this.toogleMusicPicker.bind(this);
        this.onMusicPicked = this.onMusicPicked.bind(this);
        this.toogleBottomSheet = this.toogleBottomSheet.bind(this);
        this.changeMusic = this.changeMusic.bind(this);
        this.removeMusic = this.removeMusic.bind(this);
        this.onCloseBottom = this.onCloseBottom.bind(this);
        this.onTimeCodeChanged = this.onTimeCodeChanged.bind(this);
        this.disableUndo = this.disableUndo.bind(this);
        this.onRegionSelected = this.onRegionSelected.bind(this);
        this.onCutChanged = this.onCutChanged.bind(this);
     
    }

    onTimeCodeChanged(time){
        var currentTime = parseInt(time)
        if (this.state.currentTime != currentTime){
            this.setState({currentTime : currentTime})
            console.log("currentTime = " + currentTime)
        }

    }
    onCloseBottom(){
        this.setState({isShowBottomDialog : false})
    }
    changeMusic(){
        this.setState({isShowMusicPicker : true})
    }
    removeMusic(){
        this.setState({music : undefined, isMusic : false})
    }
    playClicked(){
        this.setState({isPlaying : !this.state.isPlaying})
    }
    cutClicked(){
        this.setState({isCut : !this.state.isCut})
        // if (this.state.isCut && this.state.cutStart != -1){
        //     Mp3Cutter.cut({
        //         src: "https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3",
        //         target: "asd.mp3",
        //         start: Number(this.state.cutStart),
        //         end: Number(this.state.cutEnd) 
        //     });
        // }
    }
    undoClicked(){
        this.setState({isUndo : true, isDown : false, isGrow : false, isMusic : false})
    }
    disableUndo(){
        this.setState({isUndo : false})
    }
    onRegionSelected(region){
        this.setState({isCut : true})
    }
    musicClicked(){
        if (!this.state.isMusic){
            this.toogleMusicPicker()
        } else {
            this.toogleBottomSheet()
        }
        
    }
    onCutChanged(cutStart, cutEnd){
        this.setState({cutStart : cutStart, cutEnd : cutEnd})
    }
    growClicked(){
        this.setState({isGrow : !this.state.isGrow})
    }
    downClicked(){
        this.setState({isDown : !this.state.isDown})
    }
    toogleMusicPicker(){
        this.setState({isShowMusicPicker : !this.state.isShowMusicPicker})
    }
    toogleBottomSheet(){
        this.setState({isShowBottomDialog : !this.state.isShowBottomDialog})
    }
    onSave(){
        var podcast = this.props.podcast
        podcast.timecodes = this.state.timecodes
        this.props.setPodcast(podcast)
        this.props.changePage("details")
    }
    addTimecode(){
        var newTimeCode = getEpmtyTimecodeModel(convertSecondsToTime(this.state.currentTime))
        var timecodes = this.state.timecodes
        timecodes.push(newTimeCode)
        this.setState({timecodes : timecodes})
    }
    onDeleteTimeCode(timecode){
        var timecodes = this.state.timecodes
        const index = timecodes.indexOf(timecode);
        if (index > -1) {
            timecodes.splice(index, 1);
        }
        this.setState({timecodes : timecodes})
    }
    onTimeCodeTitleChanged(title, index){
        var timecodes = this.state.timecodes
        var timecode = timecodes[index]
        timecode.title = title
        timecodes[index] = timecode
        this.setState({timecodes : timecodes})
    }
    onTimeCodeTimeChanged(time, index){
        var timecodes = this.state.timecodes
        var timecode = timecodes[index]
        timecode.time = time
        timecodes[index] = timecode
        this.setState({timecodes : timecodes})
    }
    onMusicPicked(music){
        if (music != undefined){
            this.setState({isMusic : true})
            this.setState({music : music, isShowMusicPicker : false})
        }
        
    }
    render() {
        return (
            <div className="main_content bot_margin_64">
               {!this.state.isShowMusicPicker && <PanelHeader>
                    <Navbar back="details" onBack={this.props.onBack} title="Редактирование"/>
                </PanelHeader>}
                <div className="navbar_line"/>
                <div className="wave_container">
                    <div className="edit_waves">
                        <WaveFormExample onCutChanged={this.onCutChanged} isDown={this.state.isDown} isGrow={this.state.isGrow} onRegionSelected={this.onRegionSelected} disableUndo={this.disableUndo} isUndo={this.state.isUndo} onTimeCodeChanged={this.onTimeCodeChanged} audioSrc={this.state.audioSrc} isPlaying={this.state.isPlaying} playClicked={this.playClicked}/>
                    </div>
                    <div className="space_beetwen_controlls">
                        <img onClick={this.playClicked} className="controlls_icon hover" src={this.state.isPlaying ? pause_gray : play_blue}/>
                        <div className="flex">
                            <img onClick={this.cutClicked} style={this.state.isCut ? {} : {opacity : '0.4'}} className="controlls_icon controlls_icon_right hover" src={cut_gray}/>
                            <img onClick={this.undoClicked} className="controlls_icon hover" src={undo_gray}/>
                        </div>
                        <div className="flex">
                            <img onClick={this.musicClicked} className="controlls_icon controlls_icon_right hover" src={this.state.isMusic ? music_blue : music_gray}/>
                            <img onClick={this.growClicked} className="controlls_icon controlls_icon_right hover" src={this.state.isGrow ? volume_grow_blue : volume_grow_gray}/>
                            <img onClick={this.downClicked} className="controlls_icon hover" src={this.state.isDown ? volume_down_blue : volume_down_gray}/>
                        </div>
                    </div>

                </div>

                <div className="container_edit">
                    <p className="timecodes_title">Таймкоды</p>
                        {this.state.timecodes.length > 0 && this.state.timecodes.map((item, index) => (
                            <TimeCodeItem onTimeCodeTimeChanged={this.onTimeCodeTimeChanged} onTimeCodeTitleChanged={this.onTimeCodeTitleChanged} onDeleteTimeCode={this.onDeleteTimeCode} index={index} timecode={item} key={index}/>
                        ))}
                    <div onClick={this.addTimecode} className="add_timecode_container hover">
                        <img className="add_timecode_icon" src={add_circle_24}/>
                        <p className="add_timecode_text">Добавить таймкод</p>
                    </div>
                </div>
                <p className="timecodes_description">Отметки времени с названием темы. Позволяют слушателям легче путешествовать по подкасту.</p>
                <div className="bottom_button_container">
                    <div className="bottom_btn_line"/>
                    <div onClick={this.onSave} className="large_vk_btn hover">Сохранить</div>

                </div>
                {this.state.isShowMusicPicker && <MusicPicker onMusicPicked={this.onMusicPicked} onBack={this.toogleMusicPicker} setPodcast={this.setPodcast} podcast={this.state.podcast} changePage={this.changePage}/>}
                {this.state.isShowBottomDialog && <BottomSheetDialog removeMusic={this.removeMusic} changeMusic={this.changeMusic} onClose={this.onCloseBottom}/>}
            </div>
        );
    }
}
export default EditPodcast;