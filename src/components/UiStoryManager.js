import React from 'react'
import PropTypes from 'prop-types'
import {Entity} from 'aframe-react'
import '../aframeComponents/uiStory1'
import '../aframeComponents/uiNarrator'

type UiStoryManagerProps = {
    onChange: PropTypes.func.isRequired,
    onEnd: PropTypes.func.isRequired,
    current_scene: PropTypes.number,
    gradientArray: PropTypes.array,
    onEnvLoad: PropTypes.func
}

export default class UiStoryManager extends React.Component {
  props:UiStoryManagerProps

  componentDidMount () {
    document.querySelectorAll('.environmentDressing')[0].object3D.visible = false
    document.querySelectorAll('.environmentGround')[0].object3D.visible = false
    document.querySelectorAll('a-sky')[0].object3D.visible = false
    document.querySelector('#camera').components['gamepad-controls'].data.movementEnabled = false
    document.querySelector('#camera').components['wasd-controls'].data.enabled = false
    document.querySelector('#camera').setAttribute('position', { x: 0.554, y: 1.6, z: -0.730 })
    document.querySelector('#camera').setAttribute('rotation', { x: -4.480, y: 173.721, z: -0.008 })
  }

  render () {
    const scaleAni = {property: 'scale', dir: 'normal', dur: 1000, loop: false, from: '0.1 0.1 0.1', to: '1 2 1', fill: 'both'}
    const scaleDefault = '0.1 0.1 0.11'
    return (
      <Entity position='0 -1.5 1'>
        <Entity primitive='a-image' src='#start' scale='0.5 0.5 0.5' position='-0.270 2.010 1.340' events={{click: () => this.props.onEnd()}} rotation='0 180 0' material='transparent: true;' />
        <Entity ref='uiOverlayCanvasNarratorStory' id='uiOverlayCanvasNarratorStory' width='1.5' height='1' geometry='primitive: cylinder; radius: 2; segmentsRadial: 48; thetaLength: -160; openEnded: true' position='0 2.5 1' rotation='0 70 0' scale={scaleDefault} animation__scale={scaleAni} uinarrator='id:uiOverlayStoryNarratorScene' material='transparent: true; shader: flat; src: #uiOverlayStoryNarratorScene' />
        <Entity ref='uiOverlayCanvasStory' id='uiOverlayCanvasStory' width='1.5' height='1' geometry='primitive: cylinder; radius: 2; segmentsRadial: 48; thetaLength: -160; openEnded: true' position='0 2.5 2' rotation='0 70 0' scale={scaleDefault} animation__scale={scaleAni} uistory1='id:uiOverlayStoryScene' material='shader: flat; src: #uiOverlayStoryScene' />
      </Entity>
    )
  }
}
