import React from 'react';

import { View, Panel, Root, PanelHeader } from '@vkontakte/vkui';
import Navbar from './panels/Navbar';

import '@vkontakte/vkui/dist/vkui.css';
import './resources/styles/style.css';

import EditorNavbar from './panels/EditorNavbar';
import CreateNew from './pages/CreateNew';
import Details from './pages/Details';
import EditPodcast from './pages/EditPodcast';
import { getEpmtyModel } from './utils/Utils';
import PreviewPodcast from './pages/PreviewPodcast';
import PodcastCreated from './pages/PodcastCreated';
import SharePodcast from './pages/SharePodcast';
import News from './pages/News';
import Podcasts from './pages/Podcasts';


class Application extends React.Component {
    
    constructor(){
        super()
        this.state = {
            activeView : 'create',
            podcast : getEpmtyModel(),
            posts : []
           
        }
        this.changePage = this.changePage.bind(this);
        this.setPodcast = this.setPodcast.bind(this);
        this.addPost = this.addPost.bind(this);
       
    }
    changePage(page){
        this.setState({activeView : page})
    }
   
    setPodcast(podcast){
        this.setState({podcast : podcast})
    }
    addPost(podcast){
        var posts = this.state.posts
        posts.push(podcast)
        this.setState({posts : posts})
    }
   
    render() {
        return (
            <Root activeView={this.state.activeView}>
                <View id="create" activePanel="create_panel">
                    <Panel style={{backgroundColor : "white"}} id="create_panel">
                        <PanelHeader>
                            <Navbar title="Подкасты"/>
                        </PanelHeader>
                        <CreateNew setPodcast={this.setPodcast} changePage={this.changePage}/>
                    </Panel>
                </View>
                <View id="details" activePanel="details_panel">
                    <Panel style={{backgroundColor : "white"}} id="details_panel">
                        <PanelHeader>
                            <Navbar back="create" onBack={this.changePage} title="Новый подкаст"/>
                        </PanelHeader>
                        <Details setPodcast={this.setPodcast} podcast={this.state.podcast} changePage={this.changePage}/>
                    </Panel>
                </View>
                <View id="edit" activePanel="edit_panel">
                    <Panel style={{backgroundColor : "white"}} id="edit_panel">
                        <EditPodcast back="edit" onBack={this.changePage} setPodcast={this.setPodcast} podcast={this.state.podcast} changePage={this.changePage}/>
                    </Panel>
                </View>
                <View id="preview" activePanel="preview_panel">
                    <Panel style={{backgroundColor : "white"}} id="preview_panel">
                        <PanelHeader>
                            <Navbar back="details" onBack={this.changePage} title="Новый подкаст"/>
                        </PanelHeader>
                        <PreviewPodcast setPodcast={this.setPodcast} podcast={this.state.podcast} changePage={this.changePage}/>
                    </Panel>
                </View>
                <View id="finished" activePanel="finished_panel">
                    <Panel style={{backgroundColor : "white"}} id="finished_panel">
                        <PanelHeader>
                                <Navbar title="Подкасты"/>
                        </PanelHeader>
                        <PodcastCreated setPodcast={this.setPodcast} podcast={this.state.podcast} changePage={this.changePage}/>
                    </Panel>
                </View>
                <View id="share" activePanel="share_panel">
                    <Panel style={{backgroundColor : "white"}} id="share_panel">
                        <PanelHeader>
                            <Navbar onSend={this.onSend} back="finished" onBack={this.changePage} title="Матвей"/>
                        </PanelHeader>
                        <SharePodcast addPost={this.addPost} setPodcast={this.setPodcast} podcast={this.state.podcast} changePage={this.changePage}/>
                    </Panel>
                </View>
                <View id="news" activePanel="news_panel">
                    <Panel style={{backgroundColor : "white"}} id="news_panel">
                        <PanelHeader>
                                <Navbar title="Новости"/>
                        </PanelHeader>
                        <News posts={this.state.posts.reverse()} setPodcast={this.setPodcast} podcast={this.state.podcast} changePage={this.changePage}/>
                    </Panel>
                </View>
                <View id="podcasts" activePanel="podcasts_panel">
                    <Panel style={{backgroundColor : "white"}} id="podcasts_panel">
                        <PanelHeader>
                                <Navbar title="Подкасты"/>
                        </PanelHeader>
                        <Podcasts posts={this.state.posts} setPodcast={this.setPodcast} podcast={this.state.podcast} changePage={this.changePage}/>
                    </Panel>
                </View>
            </Root>
            
            
        );
    }
}
export default Application;


