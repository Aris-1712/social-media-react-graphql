import React from 'react'
import { Input, Text } from "@chakra-ui/react"

const Post=(props)=>{
    let post=props.post

    return(
        <div style={{height:"auto",borderRadius:5,border:"1px solid rgb(197 226 219)",display:"flex",flexDirection:"column",padding:10}}>
        <Text fontSize="xl">{post.user.Name}</Text>
        <img style={{width:"100%",height:300,objectFit:"contain",marginTop:5,marginBottom:5}} src={post.Image}></img>
        <div><i class="fa fa-thumbs-up" aria-hidden="true" style={{color:"#e64949",fontSize:20,marginRight:10}}></i>{`${post.Likes?post.Likes.length:0} Likes`} <i style={{color:"#082d0f",fontSize:20,marginLeft:20,marginRight:10}} class="fa fa-comments" aria-hidden="true"></i>{`${post.comments?post.comments.length:0} Comments`}</div>
        <Text fontSize="lg">{post.Title}</Text>
        <Text fontSize="sm">{post.Body}</Text>
        <Input style={{marginTop:10}} placeholder="Enter comment" size="md" />
        </div>
    )

}

export default Post