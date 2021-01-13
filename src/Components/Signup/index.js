import React, { useEffect, useState } from 'react'
import './Signup.css'
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import axios from 'axios'
import { Api } from '../../API/Api'
const Signup = (props) => {
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false)
    const handleHide = () => setShow(!show)

   

    return (
        <div className="signup">
            <div className="signup_holder">
                <img src={process.env.PUBLIC_URL + '/Logo/dark.png'}></img>
                <h1>Signup</h1>
                <Input placeholder="Enter Name" size="md" onChange={(e) => { setName(e.target.value) }} />
                <Input placeholder="Enter Age" size="md" onChange={(e) => { setAge(e.target.value) }} />
                <Input placeholder="Enter Email" size="md" onChange={(e) => { setEmail(e.target.value) }} />
                <InputGroup size="md">
                    <Input
                        pr="4.5rem"
                        type={ show ? "text" : "password" }
                        placeholder="Enter Password"
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={ handleHide }>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <Button onClick={() => {
                    axios({
                        url: Api,
                        method: 'post',
                        data: {
                            query: `
                        mutation{
                            createUser(email:"${email}",Age:${age},name:"${name}",password:"${password}"){
                              Name
                              _id
                              Age
                            }
                          }
              `
                        }
                    }).then((result) => {
                        localStorage.setItem("user", result.data)
                        props.history.push('/signin')
                    });
                }} colorScheme="blue">Signup</Button>
            </div>
        </div>
    )

}

export default Signup