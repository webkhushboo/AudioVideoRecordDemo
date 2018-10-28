import React, { Component } from 'react';
import {Button} from 'reactstrap';

class VideoRecordComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      videos: [],
      stream:null
    };
    this.flag = false;
  }

  async componentDidMount() {
    const stream = await navigator.mediaDevices.getUserMedia({audio: true,video:true});
    this.setState({stream:stream});
    // show it to user
    this.video.src = window.URL.createObjectURL(stream);
    this.video.play();
    // init recording
    this.mediaRecorder = new MediaRecorder(stream);
    // init data storage for video chunks
    this.chunks = [];
    // listen for data from media recorder
    this.mediaRecorder.ondataavailable = e => {
      if (e.data && e.data.size > 0) {
        this.chunks.push(e.data);
      }
    };
  }

  async startRecording(e) {
    e.preventDefault();
    // wipe old data chunks
    this.chunks = [];
    if(this.flag){
    const stream = await navigator.mediaDevices.getUserMedia({audio: true,video:true});
    this.setState({stream:stream});
    // show it to user
    this.video.src = window.URL.createObjectURL(stream);
    this.video.play();
    this.mediaRecorder = new MediaRecorder(stream);
    this.mediaRecorder.ondataavailable = e => {
      if (e.data && e.data.size > 0) {
        this.chunks.push(e.data);
      }
    };
    this.flag = false;
    }
    // start recorder with 10ms buffer
    this.mediaRecorder.start(10);
    // say that we're recording
    this.setState({recording: true});
  }

  stopRecording(e) {
    e.preventDefault();
    // stop the recorder
    this.mediaRecorder.stop();
    // say that we're not recording
    this.setState({recording: false});
    // save the video to memory
    this.saveVideo();
    const stream = this.state.stream;
    if (stream) {
      this.state.stream.getTracks().forEach(track => track.stop());
      this.flag =true;
    }
  }

  saveVideo() {
    // convert saved chunks to blob
    const blob = new Blob(this.chunks, {type: this.props.videoType});
    // generate video url from blob
    const videoURL = window.URL.createObjectURL(blob);
    // append videoURL to list of saved videos for rendering
    const videos = this.state.videos.concat([videoURL]);
    this.setState({videos});
  }

  deleteVideo(videoURL) {
    // filter out current videoURL from the list of saved videos
    const videos = this.state.videos.filter(a => a !== videoURL);
    this.setState({videos});
  }

  render() {
    const {recording, videos} = this.state;

    return (
      <div className="camera">
        <video style={{width: this.props.width}} muted="muted"
          ref={vid => {
            this.video = vid;
          }}>
         <p>Video stream not available. </p>
        </video>
        <div>
          {!recording && <Button color="warning" onClick={e => this.startRecording(e)}>
          <i className="fa fa-video-camera" aria-hidden="true"></i> Start Recording</Button>}
          {recording && <Button color="danger" onClick={e => this.stopRecording(e)}>Stop Recording</Button>}
        </div>
        <div>
          {videos.length>0 && <h3>Recorded videos:</h3>}
          {videos.map((videoURL, i) => (
            <div key={`audio_${i}`}>
              <video controls style={{width: this.props.width}} src={videoURL}   />
              <div>
                <Button color="danger" onClick={() => this.deleteVideo(videoURL)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default VideoRecordComponent;
