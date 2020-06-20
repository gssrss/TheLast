import React from "react"
export default function PictureRenderer(props) {
  return <img src={props.data.artist.picture_small} alt="Artist" />
}
