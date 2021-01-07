import React, { useState } from 'react'
import './Login.css'
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import axios from 'axios'
const Login = (props) => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [show, setShow] = useState(false)
    const handleHide = () => setShow(!show)
    return (
        <div className="login">
            <Input placeholder="medium size" size="md" onChange={(e)=>{setEmail(e.target.value)}} />
            <InputGroup size="md">
                <Input
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                    onChange={(e)=>{setPassword(e.target.value)}}
                />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleHide}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
            <Button onClick={()=>{
                        axios({
          url: 'http://localhost:4000/',
          method: 'post',
          headers:{'x-auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVmZjU2MTJmMzlmYzg4NTE3MDBkMTYyZSIsImVtYWlsIjoiYXJpcy5nYW5pQGdtYWlsLmNvbSJ9LCJpYXQiOjE2MDk5Mzg0MzIsImV4cCI6MTYxMDAyNDgzMn0.NKxzytWl5HDK6EROhzuvJk61mFF1O5lWVNaJw6Ik49I"},
          data: {
            query: `
            mutation{
                signin(email:"${email}",pass:"${password}")
                }
              `
          }
        }).then((result) => {
          console.log(result.data)
        });
            }} colorScheme="blue">Login</Button>
        </div>
    )

}

export default Login