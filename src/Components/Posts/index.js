import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Post from '../Post'
import { withRouter } from 'react-router'
import { Api } from '../../API/Api'
import Comments from '../Comments'
import * as Actions from '../../Reducer/Actions' 
import { connect } from 'react-redux'
import { postComment } from '../../API/calls'
const Posts = (props) => {
  
  const [posts, setPosts] = useState([])
  useEffect(()=>{
    console.log("HERE")
    props.getPosts()
    props.getUsers()
  },[])
  useEffect(() => {
    console.log(props.posts)
    setPosts([...props.posts].reverse())
      
  }, [props.posts])

  const onPost = async(val, postid) => {
    let temp = []
    let tempPosts=[...posts]
    posts.map((ele) => {
      if (ele._id == postid) {
        ele.comments.push({ Text: val, user: { ...props.user.data.data.getUser } })
      }
      temp.push(ele)
    })
    
    setPosts([...temp])

let data=await postComment(postid,val)
    if(data.error){
      setPosts([...tempPosts])
      props.getPosts()
      alert("Something went wrong")
    }
  }
 
  return (
    <>
    {props.profile?posts.map((ele) => {
      console.log(props.profile,ele._id)
if(ele.user._id===props.profile){
  
return (
  <Post postcomment={onPost} post={ele}>
    <Comments home={true} comments={ele.comments}></Comments>
  </Post>
)}
}) :posts.map((ele) => {

      return (
        <Post update={()=>props.getPosts()} postcomment={onPost} post={ele}>
          <Comments home={true} comments={ele.comments}></Comments>
        </Post>
      )
    })}
    </>
  )

}
const mapActionsToProps=(dispatch)=>{
  return({
      getPosts:()=>{dispatch(Actions.getPostsAction())},
      getUsers:()=>{dispatch(Actions.getUsersThunk())}
  })
}
const mapActionsToState=(state)=>{
  return({
      posts:state.posts,
      user:state.user
  })
}
export default withRouter(connect(mapActionsToState,mapActionsToProps)(Posts))