import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { withRouter } from 'react-router'
import { Button, Divider, Input, Skeleton, Text } from '@chakra-ui/react'
import { Api } from '../../API/Api'
import * as Actions from '../../Reducer/Actions' 
import './Postdetail.css'
import Post from '../Post'
import Comments from '../Comments'
import { getPost, postComment } from '../../API/calls'
import { connect } from 'react-redux'
const Postdetail = (props) => {
  const [post, setPost] = useState({})
  useEffect(() => {
    const getPostDetail=async()=>{
      let data=await getPost(props.match.params.id)
      setPost(data)
    }
    getPostDetail()
  }, [])
  // ----------------
  const onPost = async(val, postid) => {
    let temp = {...post}
    let tempPost={...post}
    temp.comments=[...temp.comments, {Text: val,time:new Date().toISOString() ,user: { ...temp.user }} ]
    // ele.comments.push({ Text: val, user: { ...ele.user } })
      
    setPost({...temp})
    let data=await postComment(postid,val)
    if(data.error){
      setPost({...tempPost})
      props.getPosts()
      alert("Something went wrong")
    }
  }
  // ---------------
  return (

    <div className="Postdetail">
      {post['Title'] === undefined ? <div><Skeleton height="400px" />
      </div> :
        
          <Post postcomment={onPost} post={post}>
          <Comments home={false} comments={post.comments}></Comments>
          </Post>
       
      }
    </div>
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
export default withRouter(connect(mapActionsToState,mapActionsToProps)(Postdetail))