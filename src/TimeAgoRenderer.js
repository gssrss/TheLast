import React from "react"
import TimeAgo from "react-timeago"

export default function TimeAgoRenderer(props) {
  return <TimeAgo date={props.data.lastUpdate}></TimeAgo>
}
