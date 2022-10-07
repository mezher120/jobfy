const initalState = {
    user: {},
}

export default function userReducer(state=initalState, action) {
    switch (action.type) {
        case 'GET_USERS':
            console.log(action.type)
            return {
                ...state, user: action.payload
            }
    
        default:
            return state;
    }
}