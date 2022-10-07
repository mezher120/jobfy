const initialState = {
    jobs: [],
}

export default function jobReducer(state=initialState, action) {
    switch (action.type) {
        case "GET_ALL_JOBS": 
         return {...state, jobs: action.payload}
        default:
            return state;
    }
}