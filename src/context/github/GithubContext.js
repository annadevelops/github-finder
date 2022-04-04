import {
    createContext,
    useReducer
} from "react";

import githubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({
    children
}) => {

    // Initialize the state for the reducer
    const initialState = {
        users: [],
        user: {},
        loading: false
    }

    // Initialise the reducer, takes in the reducer and the initial state. 'dispatch' similar to 'setState', can be called anything but convention to called 'dispatch'. It's a function to set a type for the reducer action
    const [state, dispatch] = useReducer(githubReducer, initialState)

    //Test function to get all users
    const getUsers = async () => {
        setLoading()
        const response = await fetch(GITHUB_URL + '/users', {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`
            }
        })
        const data = await response.json()

        dispatch({
            type: 'GET_USERS',
            payload: data, // 'payload' == convention way to name the data that is sent to the reducer for the specific type
        })
    }

    const searchUsers = async (text) => {
        setLoading()
        // The URLSearchParams interface defines utility methods to work with the query string of a URL.
        const params = new URLSearchParams({
            q: text
        })
        const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`
            }
        })
        const {items} = await response.json()

        dispatch({
            type: 'GET_USERS',
            payload: items, // 'payload' == convention way to name the data that is sent to the reducer for the specific type
        })
    }

    const getUser = async (text) => {
        setLoading()
        // The URLSearchParams interface defines utility methods to work with the query string of a URL.
       
        const response = await fetch(`${GITHUB_URL}/users/${text}`, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`
            }
        })
        const data = await response.json()

        dispatch({
            type: 'GET_USER',
            payload: data, // 'payload' == convention way to name the data that is sent to the reducer for the specific type
        })
    }

    //Set Loading state
    const setLoading = () => 
        dispatch({
            type: 'SET_LOADING'
        })
    
        //clear users from state
    const clearResults = () => 
        dispatch({
            type:'CLEAR_RESULTS'
        })

    return <GithubContext.Provider
    value = {
        {
            users: state.users, // Get users from the state above in the reducer when initialised, and pass it to the component array.
            loading: state.loading,
            user: state.user,
            getUsers,
            searchUsers,
            getUser,
            clearResults,
        }
    } > {
        children
    } </GithubContext.Provider>
}

export default GithubContext