import React from "react"
import Deezer from "./images/deezer.png"
const styles = {
  img: {
    width: "150%",
    height: "auto",
  },
}
export default function LinkRenderer(props) {
  return (
    <a href={props.data.link} target="blank">
      <img alt="Deezer" src={Deezer} style={styles.img} />
    </a>
  )
}
