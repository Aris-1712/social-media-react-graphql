import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import Home from '../Components/Home'
const PrivateRoute=(props)=>{
return(
    <Route path='/Home' component={Home}></Route>
)
}

export default PrivateRoute