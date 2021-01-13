const initialState={
user:{},
posts:[]
}
export const Reducer=(state=initialState,Action)=>{
    if(Action.type==="SIGNIN"){
    
        return({...state,user:{...Action.payLoad}})
    }if(Action.type==="GET_POSTS"){
        return({...state,posts:[...Action.payLoad]})
    }
    return state
}