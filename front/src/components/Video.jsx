import React from 'react';
import YouTube from 'react-youtube';
// import './Media.scss';

const Video = () => {
  const opts = {
    playerVars: {
      // différente configuration de lecture, d'affichage, d'utilisation//
      autoplay: 0,
      rel: 0,
      showinfo: 0,
      modestbranding: 1,
    },
  };
  return (
    <div className="Media">
      <YouTube
        className="video-media"
        videoId="iwROgK94zcM" // Lien id de la video, pour inserer une video, tu as le choix soit avec replace ou slice//
        opts={opts}
      />
    </div>
  );
};

export default Video;
