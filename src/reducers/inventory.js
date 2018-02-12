/**
 * Created by brsmith on 7/9/17.
 */
/**
 * Created by brsmith on 7/9/17.
 */
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { INITIAL_STATE as heroState } from './hero'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  drinkPotion: null
})

export const InventoryTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable(heroState.inventory)

/* ------------- Reducers ------------- */

export const drinkPotion = (state) => {
  const potions = Math.max(0, this.state.potions - 1)
  return { ...state, potions }
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DRINK_POTION]: drinkPotion
})
