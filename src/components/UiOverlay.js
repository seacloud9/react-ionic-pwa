import React from 'react'
import PropTypes from 'prop-types'
import {Entity} from 'aframe-react'
import '../aframeComponents/uiBanner'

type UiOverlayProps = {
    onChange: PropTypes.func.isRequired,
    current_scene: PropTypes.number,
    gradientArray: PropTypes.array,
    onEnvLoad: PropTypes.func
}

export default class UiOverlay extends React.Component {
  props:UiOverlayProps

  componentDidMount () {
    console.log(this.refs.uiOverlayCanvas)
  }

  render () {
    return (
      <Entity ref='uiOverlayCanvas' id='uiOverlayCanvas' width='3' height='1' primitive='a-plane' scale='0.1 0.1 0.11' position='-0.2 2 -2' animation__scale={{property: 'scale', dir: 'normal', dur: 1000, loop: false, from: '0.1 0.1 0.1', to: '1 1 1', fill: 'both'}} uibanner='id:uiOverlayFightScene' material='shader: flat; src: #uiOverlayFightScene' />
    )
  }
}
