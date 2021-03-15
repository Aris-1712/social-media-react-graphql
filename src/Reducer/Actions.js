import { getPosts, signin, getUser, getUsers } from '../API/calls'

const singinThunk = (payLoad) => {

    return ({
        type: "SIGNIN",
        payLoad: payLoad
    })
}

export const signinAction = (data) => {
    return (async (dispatch) => {
        let res = await signin(data)

        return (dispatch(singinThunk(res)))
    })
}
const getPostThunk = (payLoad) => {
    return ({
        type: "GET_POSTS",
        payLoad: payLoad
    })
}
export const getPostsAction = () => {
    return (async (dispatch) => {
        let res = await getPosts()
        return (dispatch(getPostThunk([...res])))
    })
}

export const getUserThunk = (email) => {
    return (async (dispatch) => {
        let res = await getUser(email)

        return (dispatch(singinThunk(res)))
    })
}
const getUsersAction = (data) => {
    return ({
        type: "GET_USERS",
        payLoad: data
    })
}
export const getUsersThunk = () => {
    return (async (dispatch) => {
        let res = await getUsers()

        return (dispatch(getUsersAction(res.data.data.getUsers)))
    })
}