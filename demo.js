import Icon from 'react-repressions'
import React from 'react'

const Ico1 = 234

const Demo = props => {
  return <Icon type={props.type} left={false} right={true} size={"sm"} className={"demo-classnames"}></Icon>
}

export default Demo