import 'aframe'
import 'aframe-animation-component'
import 'aframe-particle-system-component'
import 'babel-polyfill'
import devToolsEnhancer from 'remote-redux-devtools'
import SceneContainer from './containers/SceneContainer'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
export const store = createStore(reducer, devToolsEnhancer({ realtime: true }))

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {color: 'red'}
  }

  changeColor () {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue']
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)]
    })
  }

  render () {
    return (
      <SceneContainer store={store} />
    )
  }
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.querySelector('#sceneContainer'))
