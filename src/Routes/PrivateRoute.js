import React, { useState } from 'react'
import {Route,Redirect} from 'react-router-dom'
import Home from '../Components/Home'
import Header from '../Header'
const PrivateRoute=(props)=>{
const [token,setToken]=useState(true) 
// if(localStorage.getItem("token"))
if(localStorage.getItem("x-auth-token")){
    return(
        <div>
        <Header></Header>
        <Route path={props.path} component={props.component}></Route>
        </div>
    )
}
else{
    return(
        <Redirect path='/signin'></Redirect>
    )
}

}

export default PrivateRoute