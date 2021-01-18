import React, { useEffect, useState } from 'react'
import { Divider, Input, Text, Button, Avatar } from "@chakra-ui/react"
import './Post.css'
import { withRouter } from 'react-router'
import PostModel from './PostModel'
import { connect } from 'react-redux'
import Axios from 'axios'
import { Api } from '../../API/Api'
const Post = (props) => {
    // let post = props.post
    const [post,setPost]=useState(props.post)
    const [comment,setComment]=useState('')
    const [likeModal,setLikeModal]=useState(false)
    const [like,setLike]=useState(false)
    useEffect(()=>{
        console.log(props.user)
        if(("data" in props.user && !("error" in props.user.data))){
        post.Likes.forEach(element => {
            if(element._id===props.user.data.data.getUser._id){
                setLike(true)
            }
        });
    }
    },[props.user,post])
    
    const likePost=async()=>{
        let original={...post}
        let temp={...post}
        temp.Likes=[...temp.Likes,{_id:props.user.data.data.getUser._id,image:props.user.data.data.getUser.image,Name:props.user.data.data.getUser.Name}]
        setPost({...temp})
        Axios.post(Api, {
            query: `
            mutation{
                likePost(id:"${post._id}"){
                  Likes{
                    _id
                    Name
                  }
                  Title
                  user{
                    Name
                    Age
                    image
                  }
                }
              }
      `
          }, {
            headers: {
              "x-auth-token": localStorage.getItem("x-auth-token")
            }
          }).catch(err=>{
            setPost({...original})
          })
        
    }
   
    const dislikePost=async()=>{
      let original={...post}
      let temp={...post}
      let likearray=temp.Likes.filter((ele)=>{
        if(ele._id===props.user.data.data.getUser._id){
          return false
        }
        else{
          return true
        }
      })
      temp.Likes=[...likearray]
      setPost({...temp})
      Axios.post(Api, {
          query: `
          mutation{
              dislikePost(id:"${post._id}"){
                Likes{
                  _id
                  Name
                }
                Title
                user{
                  Name
                  Age
                  image
                }
              }
            }
    `
        }, {
          headers: {
            "x-auth-token": localStorage.getItem("x-auth-token")
          }
        }).catch(err=>{
          setPost({...original})
        })
      
  }

    return (
        <div className="post">
            <div style={{ display: "flex", alignItems: "center" }}><Avatar size="sm" name={post.user.Name} src={post.user.image} /><Text fontSize="md" style={{ fontWeight: 600, marginLeft: 10 }}>{post.user.Name}</Text></div>
            <Divider className="divider" />
            {post.Image!==""?<><img class="post_img" src={post.Image}></img>
            <Divider className="divider" />
            </>:null}
            <Text fontSize="sm" style={{ fontWeight: 600 }}>{post.Title}</Text>
            <Text fontSize="sm">{post.Body}</Text>
            <Divider className="divider" />
            <div>{like?<i onClick={dislikePost} class="fa fa-thumbs-up" aria-hidden="true" style={{ color: "#e64949", fontSize: 20, marginRight: 10, cursor:"pointer" }}></i>:<i onClick={likePost} class="fa fa-thumbs-o-up" aria-hidden="true" style={{ color: "#e64949", fontSize: 20, marginRight: 10,cursor:"pointer" }}></i>}<Text className="like_text" onClick={()=>{setLikeModal(true)}}>{`${post.Likes ? post.Likes.length : 0} Likes`}</Text><i style={{ color: "#082d0f", fontSize: 20, marginLeft: 20, marginRight: 10 }} class="fa fa-comments" aria-hidden="true"></i><Text onClick={() => {
                if (props.location.pathname === '/home') {
                    props.history.push(`/post/${post._id}`)
                }
            }} className="comment_text">{`${post.comments ? post.comments.length : 0} Comments`}</Text></div>
            <Divider className="divider" />
            {props.children !== undefined ?
                <div>{props.children}
                    <Divider className="divider" />
                </div>
                : null}

            <div style={{ display: "flex", alignItems: "center", marginTop: 10, justifyContent: "space-between" }}><Input value={comment} onChange={(e)=>{
                setComment(e.target.value)}} style={{ borderRadius: 100 }} placeholder="Enter comment..." size="md" /> <Button onClick={()=>{
                    props.postcomment(comment,post._id)
                    setComment('')
                    }} style={{ marginLeft: 5 }} colorScheme="teal" size="md">
                POST
                    </Button>
            </div>
                    <PostModel Likes={post.Likes} open={likeModal} close={()=>{setLikeModal(false)}}></PostModel>
        </div>
    )

}
const mapActionsToState=(state)=>{
    return({
        user:state.user
    })
  }
export default withRouter(connect(mapActionsToState)(Post))