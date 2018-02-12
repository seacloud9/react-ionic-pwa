import 'aframe'
import '../story/story1.js'
import 'latest-createjs'

window.AFRAME.registerComponent('uistory1', {
  schema: {
    id: {default: null},
    _mc: {default: null},
    width: {default: 600},
    height: {default: 338},
    stage: {default: null}
  },
  init: function () {
    const canvas = document.getElementById(this.data.id)
    var handleFileLoad = function (evt, comp) {
      var images = comp.getImages()
	    if (evt && (evt.item.type == 'image')) { images[evt.item.id] = evt.result }
    }

    var handleComplete = function (evt, comp) {
      var lib = comp.getLibrary()
      var ss = comp.getSpriteSheet()
      var queue = evt.target
      var ssMetadata = lib.ssMetadata
      for (let i = 0; i < ssMetadata.length; i++) {
        ss[ssMetadata[i].name] = new window.createjs.SpriteSheet({'images': [queue.getResult(ssMetadata[i].name)], 'frames': ssMetadata[i].frames})
      }
      var exportRoot = new lib.story1a()
      this.data.stage = new window.createjs.Stage(canvas)
      this.data.stage.addChild(exportRoot)
      window.createjs.Ticker.setFPS(lib.properties.fps)
    }

    this.comp = window.AdobeAn.getComposition('A71D51E4C289466AACB347F26DF8C4A2')
    this.data.loader = new window.createjs.LoadQueue(false)
    this.data.loader.addEventListener('fileload', function (evt) { handleFileLoad.apply(this, [evt, this.comp]) }.bind(this))
    this.data.loader.addEventListener('complete', function (evt) { handleComplete.apply(this, [evt, this.comp]) }.bind(this))
    this.data.lib = this.comp.getLibrary()
    this.data.loader.loadManifest(this.data.lib.properties.manifest)
  },
  tick: function () {
    try {
      this.data.stage.update()
    } catch (e) {}
  }
})
