import React, { useState } from 'react'
import './Login.css'
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import axios from 'axios'
const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false)
    const handleHide = () => setShow(!show)
    return (
        <div className="login">
            <div className="login_holder">
                <img src={process.env.PUBLIC_URL+'/Logo/dark.png'}></img>
                <h1>Login</h1>
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
                axios({
                    url: 'http://localhost:4000/',
                    method: 'post',
                    data: {
                        query: `
            mutation{
                signin(email:"${email}",pass:"${password}")
                }
              `
                    }
                }).then((result) => {
                    localStorage.setItem("x-auth-token",result.data.data.signin)
                    props.history.push('/home')
                    // console.log(result)
                });
            }} colorScheme="blue">Login</Button>
            </div>
        </div>
    )

}

export default Login