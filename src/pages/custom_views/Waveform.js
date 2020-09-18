import React from 'react';
import WaveSurfer from 'wavesurfer.js';

import { WaveformContianer, Wave, PlayButton } from './Waveform.styled';

class Waveform extends React.Component {
  constructor(props){
    super(props)
  }
  componentDidMount() {
    const track = document.querySelector('#track');

    for(var key in WaveSurfer.util) {
	    // var value = WaveSurfer[key];
	    console.log("value = " + key)
  }

    this.waveform = WaveSurfer.create({
	      barWidth: 2,
	      cursorWidth: 10,
	      container: '#waveform',
	      backend: 'WebAudio',
	      height: 96,
	      progressColor: '#3F8AE0',
	      responsive: true,
	      waveColor: '#3F8AE0',
	      cursorColor: 'transparent',
        loopSelection: true,
        
        });


    this.waveform.load("https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3");
  };
  
  componentDidUpdate(prevProps){
    if(prevProps != this.props.isPlaying && prevProps.isPlaying != this.props.isPlaying){
        this.waveform.playPause();
    }
  }
  handlePlay = () => {
    this.setState({ playing: !this.state.playing });
    this.waveform.playPause();
  };
  
  render() {
    const url = 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3';

    return (
      <WaveformContianer>
        <div id="#wave-timeline"></div>
        {/* <PlayButton onClick={this.handlePlay} >
          {!this.state.playing ? 'Play' : 'Pause'}
        </PlayButton> */}
        <Wave id="waveform" />
        <audio id="track" src={url} />
      </WaveformContianer>
    );
  }
};

export default Waveform;


