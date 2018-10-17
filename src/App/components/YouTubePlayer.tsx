import React, {useEffect, useState} from 'react';
import YouTube from 'react-youtube';
import WindowDimensions from './WindowDimensions';

interface Props {
  videoId: string;
  startTime?: number;
}

const YouTubePlayer = ({videoId, startTime = 0}: Props) => {
  const [player, setPlayer] = useState(null);

  useEffect(
    () => {
      if (player) {
        player.seekTo(startTime);
      }
    },
    [startTime]
  );

  return (
    <WindowDimensions
      children={({width, height}) => {
        let videoWidth = width - 350;
        let videoHeight = videoWidth / 1.77;
        if (videoHeight > height - 100) {
          videoHeight = height - 100;
          videoWidth = videoHeight * 1.77;
        }
        const opts = {
          width: videoWidth,
          height: videoHeight,
        };

        return (
          <YouTube
            videoId={videoId}
            opts={opts}
            onReady={event => setPlayer(event.target)}
          />
        );
      }}
    />
  );
};

export default YouTubePlayer;
