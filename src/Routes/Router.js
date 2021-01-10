import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Login from '../Components/Login'
import Signup from '../Components/Signup'

const Router=(props)=>{
return(
    <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route path="/Signup" component={Signup}></Route>
        <Route exact path="/Signin" component={Login}></Route>
    </Switch>
)
}

export default Router