import 'aframe'
import 'latest-createjs'
import '../story/narrator1'

window.AFRAME.registerComponent('uinarrator', {
  schema: {
    id: {default: null},
    _mc: {default: null},
    width: {default: 640},
    height: {default: 400},
    stage: {default: null}
  },
  init: function () {
    const canvas = document.getElementById(this.data.id)
    var handleFileLoad = function (evt, comp) {
      var images = comp.getImages()
	    if (evt && (evt.item.type === 'image')) { images[evt.item.id] = evt.result }
    }

    var handleComplete = function (evt, comp) {
      var lib = comp.getLibrary()
      var ss = comp.getSpriteSheet()
      var queue = evt.target
      var ssMetadata = lib.ssMetadata
      for (let i = 0; i < ssMetadata.length; i++) {
        ss[ssMetadata[i].name] = new window.createjs.SpriteSheet({'images': [queue.getResult(ssMetadata[i].name)], 'frames': ssMetadata[i].frames})
      }
      var exportRoot = new lib.narrator1()
      this.data.stage = new window.createjs.Stage(canvas)
      this.data.stage.addChild(exportRoot)
      window.createjs.Ticker.setFPS(lib.properties.fps)
    }

    this.comp = window.AdobeAn.getComposition('FDD16049B0D24C47828E3FC9E492AAC0')
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
