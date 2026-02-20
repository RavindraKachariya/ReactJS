import { INCREMENT, DECREMENT, RESET } from "./constant";

let initialState = {
    value: 0
}

const countReducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT: return { ...state, value: state.value + 1 }
        case DECREMENT: return { ...state, value: state.value - 1 }
        case RESET: return initialState.value
        default: return state
    }
}

export { countReducer }