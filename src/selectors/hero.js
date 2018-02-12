/**
 * Created by brsmith on 7/22/17.
 */
import { createSelector } from 'reselect'
import { levels } from '../reducers/hero'

// ...
export const getXp = state => state.hero.xp
export const getHealth = state => state.hero.stats.health
export const getLevel =
    createSelector(
        getXp,
        xp =>
            levels.filter(level =>
                xp >= level.xp
            ).length
    )
export const getMaxHealth =
    createSelector(
        getLevel,
        l => levels[l].maxHealth
    )
export const isHealthLow =
    createSelector(
        [ getHealth, getMaxHealth ],
        (health, maxHealth) =>
        health < maxHealth * 0.15
    )
