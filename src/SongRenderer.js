import React from "react"
//import AudioPlayer from "react-h5-audio-player";
import ReactAudioPlayer from "react-audio-player"
export default function PictureRenderer(props) {
  return (
    <ReactAudioPlayer src={props.data.preview} controls controlsList="Barev" />
  )
}
