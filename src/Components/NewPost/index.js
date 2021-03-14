import { Avatar, Button, Divider, Input, Skeleton } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../Reducer/Actions'
import { MdTitle } from 'react-icons/md'
import { GoRocket } from 'react-icons/go'
import { BsImageAlt } from 'react-icons/bs'
import firebase from '../../Firebase/firebase'
import { v4 as uuidv4 } from 'uuid';
import {createPost} from '../../API/calls'
import { useToast } from "@chakra-ui/react"
import './NewPost.css'
const NewPost = (props) => {
    const toast = useToast()
    const [user, setUser] = useState({})
    const [titleInput, setTitleInput] = useState(false)
    const [image, setImage] = useState(null)
    const [title,setTitle]=useState('')
    const [body,setBody]=useState('')
    console.log(localStorage.getItem('user_email'))
    useEffect(() => {
        props.getUser()
        
    }, [])
    useEffect(() => {
        console.log(props.user)
        if ("data" in props.user && !("error" in props.user.data)) {

            setUser(props.user.data.data.getUser)
        }
    }, [props.user])
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
    const Post=async()=>{
        let res=null
        if(image){
            let filename=uuidv4()
            res=await uploadImage(filename)
        }
        
        let data={
            Image:image?res:"",
            body:body,
            title:title,
            time:new Date()
        }
        let result=await createPost(data)
        props.getPosts()
        clear()
        toast({
            title: "Posted successfully.",
            
            status: "success",
            duration: 9000,
            isClosable: true,
          })

    }
    const clear=()=>{
        setImage(null)
        setTitle('')
        setTitleInput(false)
        setBody('')
    }
    return (<div>{
        Object.keys(user).length !== 0 ? <div className="newPostHolder" >
            <div className="newpost">
                <Avatar size="md" name={user.Name} src={user.image} />
                <div className="postContent" >
                    {image ? <img style={{ marginBottom: 10 }} src={URL.createObjectURL(image)}></img> : null}
                    <Input className="postText" value={body} onChange={(e)=>{setBody(e.target.value)}}  placeholder={`What's on your mind, ${user.Name.split(' ')[0]} ?`} size="lg" />
                    <Input value={title} onChange={(e)=>{setTitle(e.target.value)}} placeholder="Enter title" style={{ visibility: titleInput ? "visible" : "hidden", height: titleInput ? 50 : 0, borderRadius: 15, marginLeft: 10, marginTop: 20, transition: "height 0.2s,visibility 0.1s" }}></Input>
                </div>
            </div>
            <Divider></Divider>
            <div className="buttonsHolder" >
                <Button onClick={() => { setTitleInput(!titleInput) }} variant="ghost" colorScheme="green" leftIcon={<MdTitle />}>
                    Add Title
                </Button>
                <Button onClick={() => {
                    document.getElementById("image_select").click()
                }} type='file' variant="ghost" colorScheme="red" leftIcon={<BsImageAlt />}>
                    Add Image
                </Button>
                <Button onClick={Post} variant="ghost" colorScheme="blue" leftIcon={<GoRocket />}>
                    POST
                </Button>
                <input id="image_select" onChange={(e) => {
                    setImage(e.target.files[0])
                }} type="file" style={{ display: "none" }}></input>

            </div>
        </div> : <div><Skeleton height="400px" /></div>
    }</div>

    )

}
const mapStateToProps = (state) => {
    return (
        {
            user: state.user
        }
    )
}
const mapActionsToState = (dispatch) => {
    return (
        {
            getUser: () => {dispatch(Actions.getUserThunk(localStorage.getItem("user_email"))) },
            getPosts:()=>{dispatch(Actions.getPostsAction())}
        }
    )
}
export default connect(mapStateToProps, mapActionsToState)(NewPost)