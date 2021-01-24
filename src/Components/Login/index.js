import React, { useEffect, useState } from 'react'
import './Login.css'
import { Button, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react"
import axios from 'axios'
import { Api } from '../../API/Api'
import * as Actions from '../../Reducer/Actions'
import { connect } from 'react-redux'
const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false)
    useEffect(()=>{
        if(localStorage.getItem("x-auth-token") && localStorage.getItem("x-auth-token")!==""){
            props.history.push('/home')
        }
    },[props])
    const handleHide = () => setShow(!show)
    return (
        <div className="login">
            <div className="login_holder">
                <img src={process.env.PUBLIC_URL+'/Logo/dark.png'}></img>
                <Text fontSize="2xl">Signup</Text>
            <Input placeholder="Enter Email" size="md" onChange={(e) => { setEmail(e.target.value) }} />
            <InputGroup size="md">
                <Input
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Enter Password"
                    onChange={(e) => { setPassword(e.target.value) }}
                />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleHide}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
            <Button onClick={() => {
                props.signin({email:email,password:password})
            //     axios({
            //         url: Api,
            //         method: 'post',
            //         data: {
            //             query: `
            // mutation{
            //     signin(email:"${email}",pass:"${password}")
            //     }
            //   `
            //         }
            //     }).then((result) => {
            //         localStorage.setItem("x-auth-token",result.data.data.signin)
            //         props.history.push('/home')
            //         // console.log(result)
            //     });
            }} colorScheme="blue">Login</Button>
            </div>
        </div>
    )

}

const mapActionsToProps=(dispatch)=>{
    return({
        signin:(data)=>{dispatch(Actions.signinAction(data))}
    })
}
const mapActionsToState=(state)=>{
    return({
        user:state.user
    })
}
export default connect(mapActionsToState,mapActionsToProps)(Login)