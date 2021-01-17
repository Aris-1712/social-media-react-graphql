import React, { useEffect, useState } from 'react'
import './Signup.css'
import { Avatar, Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import axios from 'axios'
import { Api } from '../../API/Api'
import { v4 as uuidv4 } from 'uuid';
import firebase from '../../Firebase/firebase'
const Signup = (props) => {
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false)
    const [imageTempUrl,setImageTempUrl]=useState('')
    
    const [image,setImage]=useState()
    const handleHide = () => setShow(!show)

    const uploadImage = (filename) => {
        
        return new Promise((resolve, reject) => {
            let storageRef = firebase.storage().ref();
            let uploadTask = storageRef.child('images/' + filename).put(image);

            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                 (snapshot)=> {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            // console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                    }
                },function(error) {
                    console.log(error)
                    reject("UPLOAD FAILED")
                   
                    },
                    function(){
                        uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                            resolve(url)
                        })
                    })
        })
    }
   

    return (
        <div className="signup">
            <div className="signup_holder">
                <img src={process.env.PUBLIC_URL + '/Logo/dark.png'}></img>
                <h1>Signup</h1>
                <Avatar onClick={()=>{
                    document.getElementById("profile_pic").click()
                    
                }} size="2xl" name={name} src={imageTempUrl}/>
                <input onChange={(e)=>{
                    setImage(e.target.files[0])
                    setImageTempUrl(URL.createObjectURL(e.target.files[0]))
                }}  id="profile_pic" type="file" style={{display:"none"}}></input>
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
                <Button onClick={async() => {
                    let filename=uuidv4()
                    let res=await uploadImage(filename)
                    axios({
                        url: Api,
                        method: 'post',
                        data: {
                            query: `
                        mutation{
                            createUser(email:"${email}",Age:${age},name:"${name}",password:"${password}",image:"${res}"){
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