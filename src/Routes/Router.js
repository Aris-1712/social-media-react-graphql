import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Home from '../Components/Home'
import Login from '../Components/Login'
import Signup from '../Components/Signup'
import PrivateRoute from './PrivateRoute'

const Router=(props)=>{
return(
    <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route path="/Signup" component={Signup}></Route>
        <Route exact path="/Signin" component={Login}></Route>
        <PrivateRoute path='/home' component={Home}></PrivateRoute>
    </Switch>
)
}

export default Router