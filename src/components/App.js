import React ,{Component} from 'react';
import AudioRecordComponent from './AudioRecord/AudioRecordComponent'
import VideoRecordComponent from './VideoRecord/VideoRecordComponent';

class App extends Component {
    render(){
    return (  <div className="App" >
      <div>
       <h3>Demo for audio recording</h3>
       <AudioRecordComponent audioType = "mp3" width="200"/>
      </div>
      <div>
        <hr></hr>
        <h3>Demo for video recording</h3>
        <VideoRecordComponent videoType="mp4" width="400"></VideoRecordComponent>
      </div>
      
    </div>)
    }
}

export default App;