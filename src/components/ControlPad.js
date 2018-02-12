import React from 'react'
import PropTypes from 'prop-types'


type ControlPadProps = {
    onChange: PropTypes.func,
}

export default class ControlPad extends React.Component {
  props:ControlPadProps

  keyboardGo = (_key, _enabled = true) => {
    try{
        const el = document.getElementById('camera')
        let cm = el.components['wasd-controls']
        cm.keys['Key' + _key] = _enabled
    }catch(e){
        console.log('keyboardGo:' + e)
    }
    
  }

  render () {
    return (
      <div id='ControlPad' style={{display:'none'}}>
        <div id='ControlPadA' onTouchStart={() => this.keyboardGo('A')} onTouchEnd={() => this.keyboardGo('A', false)} onMouseDown={() => this.keyboardGo('A')} onMouseUp={() => this.keyboardGo('A', false)}>
            <img src='./images/arrow.png'  />
        </div>
        <div id='ControlPadW'  onTouchStart={() => this.keyboardGo('W')} onTouchEnd={() => this.keyboardGo('W', false)} onMouseDown={() => this.keyboardGo('W')} onMouseUp={() => this.keyboardGo('W', false)}>
            <img src='./images/arrow.png'  />
        </div>
        <div id='ControlPadD'  onTouchStart={() => this.keyboardGo('D')} onTouchEnd={() => this.keyboardGo('D', false)} onMouseDown={() => this.keyboardGo('D')} onMouseUp={() => this.keyboardGo('D', false)}>
            <img src='./images/arrow.png'   />
        </div>
      </div>
    )
  }
}
