import {
    AnyAction,
    combineReducers,
    configureStore,
    Reducer
} from '@reduxjs/toolkit'

import heroesSlice from './heroes-slice'

const combineReducer = combineReducers({
    heroes: heroesSlice.reducer
})
const rootReducer: Reducer = (
    state: ReturnType<typeof store.getState>,
    action: AnyAction
) => {
    return combineReducer(state, action)
}
const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
