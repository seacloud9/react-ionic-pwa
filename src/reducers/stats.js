/**
 * Created by brsmith on 7/9/17.
 */
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { INITIAL_STATE as heroState } from './hero'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  takeDamage: ['action'],
  drinkPotion: null
})

export const StatsTypes = Types
export default Creators

/* ------------- Initial State ------------- */
console.log(heroState)
export const INITIAL_STATE = Immutable(heroState.stats)

/* ------------- Reducers ------------- */

export const takeDamage = (state, action) => {
  const health = Math.max(0, this.state.health - action.payload)
  return { ...state, health }
}

export const drinkPotion = (state) => {
  const health = Math.min(this.state.health + 10, this.state.maxHealth)
  return { ...state, health }
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TAKE_DAMAGE]: takeDamage,
  [Types.DRINK_POTION]: drinkPotion
})
