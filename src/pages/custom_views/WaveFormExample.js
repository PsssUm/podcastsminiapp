import React, {
    useCallback,
    useEffect,
    useRef,
    useState,
    useMemo,
    useImperativeHandle,
    forwardRef
  } from "react";
  import ReactDOM from "react-dom";
  import styled from "styled-components";
  import { WaveSurfer, WaveForm, Region } from "wavesurfer-react";
  import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min";
  import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min";

  var isUndoClicked = false
  function generateNum(min, max) {
    return Math.random() * (max - min + 1) + min;
  }
  const Button = styled.button``;
  
  /**
   * @param distance
   * @param min
   * @param max
   * @returns {([*, *]|[*, *])|*[]}
   */
  function generateTwoNumsWithDistance(distance, min, max) {
    const num1 = generateNum(min, max);
    const num2 = generateNum(min, max);
    // if num2 - num1 < 10
    if (num2 - num1 >= 10) {
      return [num1, num2];
    }
    return generateTwoNumsWithDistance(distance, min, max);
  }
  var isGrow = false
  var isDown = false

 const WaveformExample = (props, ref) => {
    
    const plugins = useMemo(() => {
      return [
        {
          plugin: RegionsPlugin,
          options: {
            color : "rgba(242, 243, 245, 0.5)",
            dragSelection: true,

          }
        },
        {
          plugin: TimelinePlugin,
          options: {
            container: "#timeline",
          }
        }
      ].filter(Boolean);
    }, [true]);
    
  
    const [regions, setRegions] = useState([
     
    ]);
  
    // use regions ref to pass it inside useCallback
    // so it will use always the most fresh version of regions list
    const regionsRef = useRef(regions);
  
    useEffect(() => {
      regionsRef.current = regions;
    }, [regions]);
  
    const regionCreatedHandler = useCallback(
      region => {
        console.log("region-created --> region:", region);
        props.onRegionSelected(region)
        if (region.data.systemRegionId) return;
  
        setRegions([
          ...regionsRef.current,
          { ...region, data: { ...region.data, systemRegionId: -1 } }
        ]);
      },
      [regionsRef]
    );
  
    const wavesurferRef = useRef();
    const handlePosChange = useCallback(position => {
        console.log("position = " + position)
    })
    console.log("props.audioSrc = " + props.audioSrc)
    const handleWSMount = useCallback(
      waveSurfer => {
        wavesurferRef.current = waveSurfer;
        if (wavesurferRef.current) {
          wavesurferRef.current.load(props.audioSrc);
          wavesurferRef.current.setVolume(1)
          wavesurferRef.current.on("region-created", regionCreatedHandler);

          wavesurferRef.current.on("ready", () => {
            console.log("WaveSurfer is ready");
          });
  
          wavesurferRef.current.on("region-removed", region => {
            console.log("region-removed --> ", region);
          });
  
          wavesurferRef.current.on("loading", data => {
            console.log("loading --> ", data);
          });
          wavesurferRef.current.on("audioprocess", audioprocess);
          wavesurferRef.current.on("interaction", data => {
            props.onTimeCodeChanged(wavesurferRef.current.getCurrentTime())
          });
  
          if (window) {
            window.surferidze = wavesurferRef.current;
          }
        }
        
      },
      [regionCreatedHandler]
    );
    isGrow = props.isGrow
    isDown = props.isDown
    const audioprocess = useCallback((data) => {
            props.onTimeCodeChanged(data)
            if (isGrow){
                if (data <= 5){
                    wavesurferRef.current.setVolume(data/5)
                }
            } 
            if (isDown){
                if (data >= (wavesurferRef.current.getDuration() - 5)){
                    wavesurferRef.current.setVolume((wavesurferRef.current.getDuration() - data)/5)
                }
            }
      }, []);
    const play = useCallback(() => {
      wavesurferRef.current.playPause();
    }, []);
    if (wavesurferRef.current != undefined){
        if (props.isPlaying){
            wavesurferRef.current.play()
        } else {
            wavesurferRef.current.pause()
        }
    }
    const timeout = useCallback(() => {
        isUndoClicked = false
        props.disableUndo()
    }, []);
    const removeAllRegions = useCallback(() => {
        setRegions([]);
      }, [regions]);
    if (wavesurferRef.current != undefined){
        console.log("click undo = " + props.isUndo)
        if (props.isUndo && !isUndoClicked){
            isUndoClicked = true
            removeAllRegions()
            props.disableUndo()
            setTimeout(() => {
                isUndoClicked = false
            }, 200)
        }
    }
    
    const handleRegionUpdate = useCallback((region, smth) => {
        console.log("region-update-end --> region:", region);
        console.log(smth);
        props.onCutChanged(region.start, region.end)
      }, []);

    return (
        
      <div className="App">
           
        <WaveSurfer onPosChange={handlePosChange} plugins={plugins} onMount={handleWSMount}>
          <div className="timeline_bg" id="timeline" />
          <WaveForm 
                    barWidth={2}
                    barRadius={1}
                    barGap={3}
                    cursorWidth={2}
                    height={96} progressColor={"#3F8AE0"}  loopSelection={true} waveColor={"#3F8AE0"} cursorColor={"#FF3347"}  id="waveform">
            {regions.map(regionProps => (
            <Region
              onUpdateEnd={handleRegionUpdate}
              key={regionProps.id}
              {...regionProps}
            />
          ))}
          </WaveForm>
        </WaveSurfer>
        
      </div>
    );
 }
  export default WaveformExample;