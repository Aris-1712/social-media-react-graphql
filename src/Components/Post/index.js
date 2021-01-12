import React from 'react'
import { Input, Text } from "@chakra-ui/react"
import './Post.css'
import { withRouter } from 'react-router'
const Post=(props)=>{
    let post=props.post

    return(
        <div className="post">
        <Text fontSize="lg" style={{fontWeight:600}}>{post.user.Name}</Text>
        <img  src={post.Image}></img>
        <div><i class="fa fa-thumbs-up" aria-hidden="true" style={{color:"#e64949",fontSize:20,marginRight:10}}></i>{`${post.Likes?post.Likes.length:0} Likes`} <i onClick={()=>{props.history.push(`/post/${post._id}`)}} style={{color:"#082d0f",fontSize:20,marginLeft:20,marginRight:10}} class="fa fa-comments" aria-hidden="true"></i>{`${post.comments?post.comments.length:0} Comments`}</div>
        <Text fontSize="sm" style={{fontWeight:600}}>{post.Title}</Text>
        <Text fontSize="sm">{post.Body}</Text>
        <Input style={{marginTop:10}} placeholder="Enter comment" size="md" />
        </div>
    )

}

export default withRouter(Post)