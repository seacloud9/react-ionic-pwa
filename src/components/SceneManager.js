/**
 * Created by brsmith on 7/3/17.
 */
import 'aframe'
import 'aframe-look-at-component'
import 'aframe-animation-component'
import 'aframe-text-geometry-component'
import 'aframe-particle-system-component'
import 'aframe-maze-component'
import '@ekolabs/aframe-spritesheet-component'
import 'aframe-villain-component'
import 'aframe-environment-component'
import 'babel-polyfill'
import {lvl1} from '../levels/level1'
import UiEnemeyEncounter from './UiEnemeyEncounter'
import UiStoryManager from './UiStoryManager'
import {Entity} from 'aframe-react'
import React from 'react'
import PropTypes from 'prop-types'

type SceneManagerProps = {
    onChange: PropTypes.func.isRequired,
    current_scene: PropTypes.number,
    onEnvLoad: PropTypes.func
}

export default class SceneManager extends React.PureComponent {
  props: SceneManagerProps
  constructor (props) {
    super(props)
    this.state = {
      current_scene: this.props.current_scene,
      color: '#e7ea13',
      enemeyToFight: null,
      storyState: 0,
      scene_array: [
        this.startScene.bind(this),
        this.fightScene.bind(this),
        this.mazeScene.bind(this),
        this.storyScene.bind(this)
      ],
      scene_envArray: [
        'preset: tron; groundColor2: #188d85; gridColor: #befb06; dressingColor: #0bf1d4; skyColor: #35f700; horizonColor: #92E2E2; active: true; seed: 14; skyType: color; fog: 0.08; ground: spikes; groundYScale: 2.91; groundColor: #061123; dressing: towers; ; grid: 1x1;',
        'preset: forest;lightPosition: 0 50 0; flatShading: true; active: true; seed: 8; skyType: gradient; skyColor: #093db5; horizonColor: #008df9; fog: 0.08; ground: noise; groundYScale: 2.18; groundTexture: squares; groundColor2: #ebff11; groundColor: #058d93; dressing: trees; dressingAmount:100; dressingColor: #e3ff6a; dressingScale: 0; gridColor: #effe48; grid: crosses',
        'preset: forest;lightPosition: 0 50 0; flatShading: true; active: true; seed: 8; skyType: gradient; skyColor: #093db5; horizonColor: #008df9; fog: 0.08; ground: noise; groundYScale: 2.18; groundTexture: squares; groundColor2: #ebff11; groundColor: #058d93; dressing: trees; dressingAmount:100; dressingColor: #e3ff6a; dressingScale: 0; gridColor: #effe48; grid: crosses',
        'ground: flat; skyColor: #000000; skyType: gradient; preset: none; gridColor: #000441; active: true; horizonColor: #000000; lightPosition: [object Object]; fog: 0.7; groundColor: #000000; groundColor2: #000000; dressingAmount: 100; dressingColor: #0e1779;',
        'active: true; seed: 8; skyType: gradient; skyColor: #24b59f; horizonColor: #eff9b7; fog: 0.08; ground: noise; groundYScale: 2.18; groundTexture: squares; groundColor: #937a24; groundColor2: #987d2e; dressing: trees; dressingAmount:100; dressingColor: #888b1d; dressingScale: 0; gridColor: #c5a543; preset: forest;'
      ]
    }
    var extras = require('aframe-extras')
    window.AFRAME.registerComponent('a-ocean', extras.primitives['a-ocean'])
  }

  shouldComponentUpdate (nextProps) {
    let shouldUpdate = true
    if (nextProps.enemeyToFight) shouldUpdate = nextProps.enemeyToFight === this.state.enemeyToFight
    if (nextProps.current_scene) shouldUpdate = nextProps.current_scene !== this.state.current_scene
    return shouldUpdate
  }

  stopSpriteAnimation (attr) {
    try {
      this[attr].spriteTween.stop()
    } catch (e) {
      // don't kill the game when an animation has already been removed
    }
  }

  setRotation (obj = 'camera', _rotation = new window.THREE.Euler(-0.039, -3.19, 0, 'XYZ')) {
    // let hero = document.getElementById('camera')
    // hero.setAttribute("rotation", _rotation)
    let $obj = document.getElementById('camera')
    $obj.object3D.rotation.set(-0.039, -3.19, 0)
    console.log('cam')
    console.log($obj.object3D.rotation)
  }

  spriteAnimation (attr) {
    let _animation = { progress: 0 }
    this[attr] = {}
    this[attr].spriteTween = new window.TWEEN.Tween(_animation)
    .to({ progress: 1 }, 600)
    .onUpdate(function () {
      document.querySelector(attr).setAttribute('sprite-sheet', 'progress', _animation.progress)
    })
    this[attr].spriteTween.onComplete(function () { _animation.progress = 0 })
    this[attr].spriteTween.chain(this[attr].spriteTween)
    this[attr].spriteTween.start()
  }

  componentDidMount () {
    setTimeout(this.props.onEnvLoad, 200)
  }

  componentWillReceiveProps (newProps) {
    this.setState(newProps)
  }

  constantSceneSwap () {
    this.maskEl = this.el.sceneEl.querySelector('#mask')
  }

  changeColor () {
    const colors = ['#e7ea13', '#13ea2c', '#139cea', '#ea1331', '#13ea31']
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)]
    })
  }

  resetEnvironment () {
    try {
      let env = document.getElementById('mainScene')
      env.removeAttribute('environment')
      env.setAttribute('environment', this.state.scene_envArray[this.state.current_scene])
    } catch (e) {
      console.log(e)
    }
  }

  startStory1 () {
    this.setState({storyState: ++this.storyState}, () => {
      this.setRotation()
      this.props.onChange('#000000', 'density: 0.2; far: 300; color: #000000', 3, this.state.scene_envArray)
    })
  }

  startFight (_enemeyToFight) {
    // got to fightscene
    // stop animations
    // re-oreient player position
    let cp = document.getElementById('ControlPad')
    cp.style.display = 'none'
    this.setState({enemeyToFight: _enemeyToFight}, () => {
      this.stopSpriteAnimation('[badBot]')
      this.stopSpriteAnimation('[warMachine]')
      // this.setRotation()
      this.props.onChange('#093db5', 'density: 0.2; far: 300; color: #093db5', 1, this.state.scene_envArray)
    })
  }

  startTheGame () {
    let cp = document.getElementById('ControlPad')
    cp.style.display = 'flex'
    setTimeout(() => {
      this.spriteAnimation('[badBot]')
      this.spriteAnimation('[warMachine]')
    }, 800)
    this.props.onChange('#093db5', 'density: 0.2; far: 300; color: #093db5', 2, this.state.scene_envArray)
  }

  fightScene () {
    return (
      <Entity>
        <UiEnemeyEncounter enemeyToFight={this.state.enemeyToFight} onChange={() => {}} />
      </Entity>
    )
  }

  storyScene () {
    return (
      <Entity>
        <UiStoryManager onEnd={this.startTheGame.bind(this)} onChange={() => {}} />
      </Entity>
    )
  }

  startScene () {
    this.resetEnvironment()
    return (
      <Entity>
        <Entity position={{x: -1.8, y: 2, z: -5}} scale='1 1 1' text-geometry='value: ETHERAL; font: #exoFont; bevelEnabled: true; bevelSize: 0.1; bevelThickness: 0.1; curveSegments: 1; size: 0.5; height: 0.5;' material=' metalness:0.9; roughness: 0.05; sphericalEnvMap: #chrome2;' />
        <Entity id='ocean' scale='1 1 1' primitive='a-ocean' color='#92E2E2' width='200' depth='200' density='45' speed='2' position='0, 0.45, 0' />
        <Entity text={{value: 'Jack In', align: 'center'}} position={{x: 0, y: 1.5, z: -2}} />
        <Entity primitive='a-gltf-model' src='#intro_mask' position={{x: 0, y: 3, z: -6}} rotation={{x: 0, y: 180, z: 0}} />
        <Entity id='atom1' primitive='a-gltf-model' src='#atom' material=' metalness:0.9; roughness: 0.05; sphericalEnvMap: #chrome2; opacity:0.3' animation__rotate={{property: 'rotation', dur: 2000, loop: true, to: '360 360 360'}} animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '0.5 0.5 0.5'}} position={{x: -0.25, y: 1.5, z: -3}} scale='0.05 0.05 0.05' events={{click: () => this.startStory1.apply(this)}}>
          <Entity animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '1 1 1'}} primitive='a-gltf-model' src='#atom' scale='0.05 0.05 0.05' material=' metalness:0.9; roughness: 0.05; sphericalEnvMap: #chrome2; opacity:0.5' />
        </Entity>
      </Entity>
    )
  }

  mazeScene () {
    return (
      <Entity id='maze' aframe-maze={{
        wallMaterial: [
          new window.THREE.MeshLambertMaterial({map: window.THREE.ImageUtils.loadTexture('images/tron1.jpg')}),
          new window.THREE.MeshLambertMaterial({map: window.THREE.ImageUtils.loadTexture('images/tron2.jpg')}),
          new window.THREE.MeshBasicMaterial({map: window.THREE.ImageUtils.loadTexture('images/tree2.png'), transparent: true, opacity: 0.5}),
          new window.THREE.MeshLambertMaterial({color: 0xFBEBCD, opacity: 0.2})],
        map: lvl1,
        UNITSIZE: 126
      }} scale='1'>
        <Entity primitive='a-gltf-model' src='#lotus' position='0,  1.5, 2' />
        <Entity look-at='[camera]' villain={{sceneHasLoaded: true, aispeed: 0.02}} id='villian0' position='0,  1.5, 2'>
          <Entity primitive='a-image' badBot src='images/bad-bot.png' sprite-sheet='cols:40; rows: 1; progress: 0;' scale='3, 3, 3' />
        </Entity>
        <Entity look-at='[camera]' villain={{sceneHasLoaded: true, aispeed: 0.02, collisionDistance: 5, collisionAction: this.startFight.bind(this, 'warMachine')}} id='villian1' position='6,  1.5, 4'>
          <Entity primitive='a-image' warMachine src='images/war-machine.png' sprite-sheet='cols:17; rows: 1; progress: 0;' scale='3, 3, 3' />
        </Entity>
        <Entity look-at='[camera]' villain={{sceneHasLoaded: true, aispeed: 0.02/*, collisionAction: this.startFight.bind(this) */}} id='villian2' position='3,  1.5, 8'>
          <Entity primitive='a-image' badBot src='images/bad-bot.png' sprite-sheet='cols:40; rows: 1; progress: 0;' scale='3, 3, 3' />
        </Entity>
        <Entity look-at='[camera]' villain={{sceneHasLoaded: true, aispeed: 0.02}} id='villian3' position='9,  1.5, 6'>
          <Entity primitive='a-image' warMachine src='images/war-machine.png' sprite-sheet='cols:17; rows: 1; progress: 0;' scale='3, 3, 3' />
        </Entity>
      </Entity>
    )
  }

  render () {
    return (
      <Entity id='mainScene' scale='15 15 15' position='0 25 -500' environment={this.state.scene_envArray[this.state.current_scene]}>
        {this.state.scene_array[this.state.current_scene]()}
      </Entity>
    )
  }
}
