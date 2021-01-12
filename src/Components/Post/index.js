import React from 'react'
import { Divider, Input, Text, Button, Avatar } from "@chakra-ui/react"
import './Post.css'
import { withRouter } from 'react-router'
const Post=(props)=>{
    let post=props.post

    return(
        <div className="post">
        <div style={{display:"flex",alignItems:"center"}}><Avatar size="sm" name={post.user.Name} src={post.user.image} /><Text fontSize="md" style={{fontWeight:600,marginLeft:10}}>{post.user.Name}</Text></div>
        <Divider className="divider"/>
        <img class="post_img" src={post.Image}></img>
        <Divider className="divider"/>
        <div><i class="fa fa-thumbs-up" aria-hidden="true" style={{color:"#e64949",fontSize:20,marginRight:10}}></i>{`${post.Likes?post.Likes.length:0} Likes`} <i onClick={()=>{props.history.push(`/post/${post._id}`)}} style={{color:"#082d0f",fontSize:20,marginLeft:20,marginRight:10}} class="fa fa-comments" aria-hidden="true"></i>{`${post.comments?post.comments.length:0} Comments`}</div>
        <Divider className="divider"/>
        <Text fontSize="sm" style={{fontWeight:600}}>{post.Title}</Text>
        <Text fontSize="sm">{post.Body}</Text>
        <Divider className="divider"/>
        <div style={{display:"flex",alignItems:"center",marginTop:10,justifyContent:"space-between"}}><Input style={{borderRadius:100}} placeholder="Enter comment" size="md" /> <Button style={{marginLeft:5}} colorScheme="teal" size="md">
                        POST
                    </Button>
                </div>
        </div>
    )

}

export default withRouter(Post)