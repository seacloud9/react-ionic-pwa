import React from 'react'
import PropTypes from 'prop-types'
import {Entity} from 'aframe-react'
import 'aframe-look-at-component'
import 'aframe-villain-component'
import 'aframe-animation-component'
import '@ekolabs/aframe-spritesheet-component'
import '../aframeComponents/uiBanner'

type UiEnemeyEncounterProps = {
    enemeyToFight: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    current_scene: PropTypes.number,
    gradientArray: PropTypes.array,
    onEnvLoad: PropTypes.func,
    camera: PropTypes.any,
}

export default class UiEnemeyEncounter extends React.Component {
  props:UiEnemeyEncounterProps

  spriteAnimation () {
    let attr = this.props.enemeyToFight
    let _animation = { progress: 0 }
    this[attr] = {}
    this[attr].spriteTween = new window.TWEEN.Tween(_animation)
    .to({ progress: 1 }, 600)
    .onUpdate(function () {
      document.querySelector('#' + this.props.enemeyToFight).setAttribute('sprite-sheet', 'progress', _animation.progress)
    }.bind(this))
    this[attr].spriteTween.onComplete(function () { _animation.progress = 0 })
    this[attr].spriteTween.chain(this[attr].spriteTween)
    this[attr].spriteTween.start()
  }

  getSourceImg () {
    return this.props.enemeyToFight.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
  }

  componentDidMount () {
    document.querySelector('#camera').components['gamepad-controls'].data.movementEnabled = false
    document.querySelector('#camera').components['wasd-controls'].data.enabled = false
    document.querySelector('#camera').setAttribute('position', { x: 0.5537604935079524, y: 1.6, z: -0.7602567708061172 })
    document.querySelector('#camera').setAttribute('rotation', { x: 4.0, y: 0, z: -0.008000000000001263 })
    this.spriteAnimation()
  }

  render () {
    const scaleAni = {property: 'scale', dir: 'normal', dur: 1000, loop: false, from: '0.1 0.1 0.1', to: '1 1 1', fill: 'both'}
    const scaleDefault = '0.1 0.1 0.11'
    const enemey = `images/${this.getSourceImg()}.png`
    return (
      <Entity position='0 -1.5 1'>
        <Entity look-at='[camera]' villain={{sceneHasLoaded: true, aispeed: 0, MOVESPEED: 0}} id='villian1' position='-0.25 3.18 -4'>
          <Entity primitive='a-image' id={this.props.enemeyToFight} src={enemey} sprite-sheet='cols:17; rows: 1; progress: 0;' scale='3, 3, 3' />
        </Entity>
        <Entity ref='uiOverlayCanvas' id='uiOverlayCanvas' width='1.4' height='0.34' primitive='a-plane' position='-0.25 2.04 -2' scale={scaleDefault} animation__scale={scaleAni} uibanner='id:uiOverlayFightScene' material='shader: flat; src: #uiOverlayFightScene' />
        <Entity ref='uiFightSceneIcons' primitive='a-plane' width='1' height='0.2' position='-0.25 2.18 -1.8' material='shader: flat; alphaTest:0.2; transparent:true; src: #fightSceneIcons' scale={scaleDefault} animation__scale={scaleAni} />
        <Entity position='-0.18 2.18 -1.6' text={{value: 'FIGHT       SPELL   ITEM     ESCAPE', width: 1, height: 1, wrapCount: 30, font: '/js/zorque.fnt'}} scale={scaleDefault} animation__scale={scaleAni} />
      </Entity>
    )
  }
}
