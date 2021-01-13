import {getPosts, signin} from '../API/calls'

const singinThunk=(payLoad)=>{
  
    return({
        type:"SIGNIN",
        payLoad:payLoad
    })
}

export const signinAction=(data)=>{
return (async(dispatch)=>{
    let res=await signin(data)
  
    return(dispatch(singinThunk(res)))
})
}
const getPostThunk=(payLoad)=>{
return({
    type:"GET_POSTS",
    payLoad:payLoad
})
}
export const getPostsAction=()=>{
    return(async(dispatch)=>{
        let res=await getPosts()
       
        return(dispatch(getPostThunk([...res])))
    })
}