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
    props.getPosts()
  },[])
  useEffect(() => {

    setPosts([...props.posts])
      
  }, [props.posts])

  const onPost = async(val, postid) => {
    let temp = []
    let tempPosts=[...posts]
    posts.map((ele) => {
      if (ele._id == postid) {
        ele.comments.push({ Text: val, user: { ...ele.user } })
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
    posts.map((ele) => {

      return (
        <Post postcomment={onPost} post={ele}>
          <Comments home={true} comments={ele.comments}></Comments>
        </Post>
      )
    })
  )

}
const mapActionsToProps=(dispatch)=>{
  return({
      getPosts:()=>{dispatch(Actions.getPostsAction())}
  })
}
const mapActionsToState=(state)=>{
  return({
      posts:state.posts
  })
}
export default withRouter(connect(mapActionsToState,mapActionsToProps)(Posts))