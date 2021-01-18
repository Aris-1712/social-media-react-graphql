
const initialState={
user:{},
posts:[]
}
export const Reducer=(state=initialState,Action)=>{
   
    switch (Action.type) {
        case "SIGNIN":
            return({...state,user:{...Action.payLoad}})
        case "GET_POSTS":
            return({...state,posts:[...Action.payLoad]})  
    }
    return state
 
    

}