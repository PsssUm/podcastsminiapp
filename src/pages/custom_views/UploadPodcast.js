import React from 'react';
import podcast_icon from '../../resources/icons/podcast_icon.svg'
import moment from 'moment'
var objectUrl;
class UploadPodcast extends React.Component {
   
    constructor(props){
        super(props)
        this.isPodcastPicker = (this.props.podcast.audioFile != undefined)
        this.state = {
            isPickedPodcast : this.isPodcastPicker,
            name : "",
            duration : "",
        }
        this.fileUpload = React.createRef();
        this.podcastContainer = React.createRef();
        this.showPickedPodcast = this.showPickedPodcast.bind(this)
        this.pickPodcast = this.pickPodcast.bind(this)
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
        
    }
    componentDidMount(){
        
        if (this.isPodcastPicker){
            console.log("this.isPodcastPicker = " + this.isPodcastPicker)
            this.props.podcastPicked(this.props.podcast.audioFile)
            this.getDuration(this.props.podcast.audioFile)
            this.setState({name : this.props.podcast.audioFile.name})
        }
    }
    showPickedPodcast(){
        this.setState({isPickedPodcast : true})
    }
    pickPodcast(){
        this.fileUpload.current.click();
    }
    
    fileChangedHandler(event) {
        if(event && event.target.files && event.target.files.length > 0){
            // const urlObj = URL.createObjectURL(event.target.files[0])
            const file = event.target.files[0]
            this.showPickedPodcast()
            this.setState({name : file.name})
            this.props.podcastPicked(file)
            this.getDuration(file)

        }
    }
    getDuration = (file) => {
        objectUrl = URL.createObjectURL(file);
        window.document.getElementById("audio").src = objectUrl
        window.document.getElementById("audio").addEventListener("canplaythrough", this.onCanPlayAudio)
        
    }
    onCanPlayAudio = (e) =>{
        var seconds = e.currentTarget.duration;
        var duration = moment.duration(seconds, "seconds");
        
        var time = "";
        var hours = duration.hours();
        if (hours > 0) { time = hours + ":" ; }
        
        time = time + duration.minutes() + ":" + duration.seconds();
        
        URL.revokeObjectURL(objectUrl);
        this.setState({duration : time})
        this.props.durationChanged(time)
    }
  
    render() {
        return (
            <div id="podcastContainer">
                <input id="fileInput" className="custom-file-input hover" type="file" accept="audio/mp3" onChange={this.fileChangedHandler} style={{ display: "none" }} ref={this.fileUpload}/>
                <audio style={{display : 'none'}} id="audio"></audio>
                {!this.state.isPickedPodcast ? 
                <div className="upload_podcast_container">
                    <p className="upload_podcast_title">Загрузите Ваш подкаст</p>
                    <p className="create_donation_text">Выберите готовый аудиофайл из вашего телефона и добавьте его</p>
                    <div onClick={this.pickPodcast} className="stroke_button center_btn_upload hover">Загрузить файл</div>
                </div> :
                <div className="podcast_uploaded_container">
                    <div onClick={this.pickPodcast} className="flex just_content hover">
                        <div className="flex">
                            <img className="podcast_icon_picked" src={podcast_icon}/>
                            <p className="podcast_title_picked">{this.state.name}</p>
                        </div>
                        <p className="time_podcast_picked">{this.state.duration}</p>
                    </div>
                    <p className="podcast_picked_decr">Вы можете добавить таймкоды и скорректировать подкаст в режиме редактирования</p>
                    <div onClick={() => this.props.openEdit()} className="large_stroke_button hover">Редактировать аудиозапись</div>
                    
                </div>}
                <div className="navbar_line details_line"/>
                
                
            </div>
        );
    }
}
export default UploadPodcast;