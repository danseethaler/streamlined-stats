import React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {RootState} from '../../../../redux/reducers';
import {SetType} from '../../../../redux/redux.definitions';
import YouTubePlayer from '../../../components/YouTubePlayer';
import {Columns} from '../components';
import {VideoContainer} from './components';
import PlayerTimedStats from './PlayerTimedStats';

interface SetProps extends RouteComponentProps<any> {
  set: SetType;
  playerName?: string;
}

class ReviewSet extends React.Component<SetProps, {startTime: number}> {
  private videoRef: React.RefObject<HTMLVideoElement>;

  constructor(props) {
    super(props);
    this.state = {startTime: 0};
    this.videoRef = React.createRef();
  }

  public playSelectedFile = file => {
    const fileURL = URL.createObjectURL(file);
    this.videoRef.current.src = fileURL;
  };

  public goToVideoTime = time => {
    if (this.videoRef.current) {
      this.videoRef.current.currentTime = time;
    }
    if (time === this.state.startTime) {
      this.setState({startTime: time + 0.1});
    } else {
      this.setState({startTime: time});
    }
  };

  public render() {
    const {set, playerName} = this.props;

    return (
      <Columns>
        {/* <LeaderBoard sets={[set]} /> */}
        {set.youtubeVideoId ? (
          <VideoContainer>
            <YouTubePlayer
              videoId={set.youtubeVideoId}
              startTime={this.state.startTime}
            />
          </VideoContainer>
        ) : (
          <>
            <h3>No video link found.</h3>
            <VideoContainer>
              <input
                type="file"
                accept="video/*"
                onChange={event => {
                  this.playSelectedFile(event.target.files[0]);
                }}
              />
              <video
                style={{
                  width: '100%',
                  height: 'auto',
                }}
                ref={this.videoRef}
                controls
                autoPlay
              />
            </VideoContainer>
          </>
        )}

        <PlayerTimedStats
          set={set}
          playerName={playerName}
          goToVideoTime={this.goToVideoTime}
        />
      </Columns>
    );
  }
}

export default connect(
  ({sets}: RootState, {match}: RouteComponentProps<any>) => ({
    set: sets[match.params.setId],
    playerName: match.params.playerName,
  })
)(ReviewSet);
