import 'aframe'
import 'latest-createjs'

window.AFRAME.registerComponent('uibanner', {
  schema: {
    id: {default: null},
    _mc: {default: null},
    width: {default: 512},
    height: {default: 512},
    stage: {default: null}
  },
  init: function () {
    const canvas = document.getElementById(this.data.id)
    this.data.stage = new window.createjs.Stage(canvas)
    this.data._mc = new window.createjs.MovieClip()
    window.createjs.Ticker.setFPS(60)
    window.createjs.Ticker.addEventListener(this.data.stage)
    this.data._mc.x = 0
    this.data._mc.y = 0
    this.data._mc.alpha = 1
    this.data._mc.loop = 0
    this.data._mc.height = this.data.height
    this.data._mc.width = this.data.width
    let gfx = new window.createjs.Shape()
    gfx.graphics.setStrokeStyle(1)
    gfx.graphics.beginStroke('#f0f809')
    gfx.graphics.beginLinearGradientFill(['#1b5891', '#00a8ab'], [0, 1], 0, 0, 0, this.data.height)
    gfx.graphics.drawRect(0, 0, this.data.width, this.data.height)
    gfx.graphics.endFill()
    gfx.x = 0
    gfx.y = 0
    gfx.alpha = 0
    this.data._mc.addChild(gfx)
    this.data.stage.addChild(this.data._mc)
    this.data._mc.timeline.addTween(window.createjs.Tween.get(gfx, {loop: false}).to({alpha: 1}, 200).pause())
  },
  tick: function () {
    this.data.stage.update()
  }
})
