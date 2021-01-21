
const initialState={
user:{},
posts:[],
users:[]
}
export const Reducer=(state=initialState,Action)=>{
   
    switch (Action.type) {
        case "SIGNIN":
            return({...state,user:{...Action.payLoad}})
        case "GET_POSTS":
            return({...state,posts:[...Action.payLoad]})  
        case "GET_USERS":
            return({...state,users:[...Action.payLoad]})  
    }
    return state
 
    

}