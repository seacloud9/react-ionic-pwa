import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setScene: ['data']
})

export const GameTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  game_scene: 0
})

/* ------------- Reducers ------------- */

export const setScene = (state, { data }) => {
  return state.merge({ game_scene: data.game_scene })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_SCENE]: setScene
})
