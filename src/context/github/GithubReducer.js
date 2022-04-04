/**
 * Reducer githubReducer.           
 * @param {object} state - The current state of the reducer.           
 * @param {object} action - The action to be performed.           
 * @returns {object} The new state of the reducer.           
 */

// React Reducer to set states instead of useState. Reducer takes in an initial state and an action. Each action paired with a type and when that type is called or 'dispatch' then returns what specified
const githubReducer = (state, action) => {
    switch(action.type) {
        case 'GET_USERS':
            return {
                ...state, // '...' spread operator so takes all new objects and spread it before the initial state
                users: action.payload,
                loading: false,
            }
        case 'GET_USER':
            return {
                ...state,
                user: action.payload
            }
        case 'SET_LOADING':
            return {
                ...state,
                loading: true,
            }
        case 'CLEAR_RESULTS':
            return {
                users: [],
                loading: false
            }
        default:
            return state
    }
}

export default githubReducer