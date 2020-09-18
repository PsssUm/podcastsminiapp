import React from 'react';
import { Checkbox} from '@vkontakte/vkui';

import arrow_right from '../resources/icons/arrow_right.svg'
import standart_album from '../resources/icons/standart_album.png'
import { Input, Textarea} from '@vkontakte/vkui';
import '../resources/styles/details.css'
import PhotoPicker from './custom_views/PhotoPicker';
import UploadPodcast from './custom_views/UploadPodcast';
class Details extends React.Component {
   
    constructor(props){
        super(props)
        this.state = {
            title : this.props.podcast.title,
            description : this.props.podcast.description,
            image : (this.props.podcast.imageSrc == standart_album ? undefined : this.props.podcast.imageSrc),
            podcastFile : this.props.podcast.podcastFile,
            duration : this.props.podcast.duration,
            isBadContent : this.props.podcast.isBadContent,
            isExport : this.props.podcast.isExport,
            isTrailer : this.props.podcast.isTrailer,
        }
        this.titleChanged = this.titleChanged.bind(this);
        this.descriptionChanged = this.descriptionChanged.bind(this);
        this.photoPicked = this.photoPicked.bind(this)
        this.podcastPicked = this.podcastPicked.bind(this)
        this.nextClicked = this.nextClicked.bind(this)
        this.durationChanged = this.durationChanged.bind(this)
        this.setPodcast = this.setPodcast.bind(this)
        this.openEdit = this.openEdit.bind(this)
    }
    photoPicked(image){
        this.setState({image : image})
    }
    titleChanged(event){
        if (event){
            var value = event.target.value
            this.setState({title : value})
        }
    }
    descriptionChanged(event){
        if (event){
            var value = event.target.value
            this.setState({description : value})
        }
    }
    podcastPicked(podcastFile){
        this.setState({podcastFile : podcastFile})
    }
    durationChanged(duration){
        this.setState({duration : duration})
    }
    nextClicked(){
        this.setPodcast()
        this.props.changePage("preview")
    }
    setPodcast(){
        var podcast = this.props.podcast
        podcast.title = this.state.title
        podcast.description = this.state.description
        podcast.duration = this.state.duration
        if (this.state.image == undefined){
            podcast.imageSrc = standart_album
        } else {
            podcast.imageSrc = this.state.image
        }
        podcast.audioFile = this.state.podcastFile
        podcast.isBadContent = this.state.isBadContent
        podcast.isExport = this.state.isExport
        podcast.isTrailer = this.state.isTrailer
        console.log("podcast = " + JSON.stringify(podcast))
        this.props.setPodcast(podcast)
    }
    openEdit(){
        this.setPodcast()
        this.props.changePage("edit")
    }
  
    render() {
        return (
            <div className="main_content">
                <div className="navbar_line"/>
                <div className="flex details_name_icon_cont">
                    <PhotoPicker image={this.state.image} photoPicked={this.photoPicked}/>
                    <div className="full_width_details">
                        <p className="details_name_title">Название</p>
                        <Input onChange={this.titleChanged} value={this.state.title} type="text" placeholder="Введите название подкаста"/>
                    </div>
                    
                </div>
                <div className="details_container">
                    <p className="details_name_title">Описание подкаста</p>
                    <Textarea onChange={this.descriptionChanged} value={this.state.description} type="text" />
                    <UploadPodcast podcast={this.props.podcast} openEdit={this.openEdit} durationChanged={this.durationChanged} podcastPicked={this.podcastPicked}/>
                    <Checkbox onChange={() => this.setState({isBadContent : !this.state.isBadContent})} checked={this.state.isBadContent} style={{paddingLeft : 0}}>Ненормативный контент</Checkbox>
                    <Checkbox onChange={() => this.setState({isExport : !this.state.isExport})} checked={this.state.isExport} style={{paddingLeft : 0}}>Исключить эпизод из экспорта</Checkbox>
                    <Checkbox onChange={() => this.setState({isTrailer : !this.state.isTrailer})} checked={this.state.isTrailer} style={{paddingLeft : 0}}>Трейлер подкаста</Checkbox>
                    <div className="just_content">
                        <div>
                            <p className="details_descrt_text">Кому доступен данный подкаст</p>
                            <p className="details_descrt_text_des">Всем пользователям</p>
                        </div>
                        <img className="details_right_arrow" src={arrow_right}/>
                    </div>
                    <p className="details_grey_publish">При публикации записи с эпизодом, он становится доступным для всех пользователей</p>
                </div>
                <div onClick={this.nextClicked} style={(this.state.title != "" && this.state.description != "" && this.state.podcastFile != undefined) ? {} : {opacity : '0.5', pointerEvents : 'none'}} className="large_vk_btn hover">Далее</div>
                
            </div>
        );
    }
}
export default Details;