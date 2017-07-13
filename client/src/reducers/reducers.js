import { combineReducers } from 'redux';
export const loginReducer = (state = {user: {}}, action) => {
    console.log('itemsReducer was called with state', state, 'and action', action)

    switch (action.type) {
        case 'FOUND_USER':
            return Object.assign({}, state, {
                "user": action.profile
            });
        default:
            return state;
    }
}

export const rootReducer = combineReducers({
	loginReducer,
})

export default rootReducer;