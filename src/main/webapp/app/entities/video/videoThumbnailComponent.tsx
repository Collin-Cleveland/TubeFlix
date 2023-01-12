import React from 'react';
import VideoImageThumbnail from 'react-video-thumbnail-image'; // use npm published version



const VideoThumbnail = props => {
  const { videoLink } = props;

  if (videoLink.charAt(12) == 'y'){
    // Extract the video ID from the link
    let videoId = videoLink.split('v=')[1];
    const ampersandIndex = videoId.indexOf('&');
    if (ampersandIndex !== -1) {
      videoId = videoId.substring(0, ampersandIndex);
    }

    // Construct the thumbnail image URL
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return <img width="300" src={thumbnailUrl} alt="Video thumbnail" />;
  }
  else {
    return (
      <img width="300" src="content/images/thumbnail-default.jpeg" alt="Default Video thumbnail" />
)};
};

export default VideoThumbnail;