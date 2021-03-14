import React, { useEffect, useState } from 'react'
import { Divider, Input, Text, Button, Avatar, Skeleton } from "@chakra-ui/react"
import './Post.css'
import { withRouter } from 'react-router'
import PostModel from './PostModel'
import { connect } from 'react-redux'
import Axios from 'axios'
import { Api } from '../../API/Api'
import * as Actions from '../../Reducer/Actions'

const Post = (props) => {
  const [post, setPost] = useState()
  const [comment, setComment] = useState('')
  const [likeModal, setLikeModal] = useState(false)
  const [like, setLike] = useState(false)
  const user=JSON.parse(localStorage.getItem("user_details"))
  useEffect(() => {

    if (typeof post !== 'undefined') {
      console.log(props.user)
      if (localStorage.getItem("user_details")) {
        
        // console.log(props.user.data.data.getUser._id)
        let temp = post.Likes.filter(ele => {
          if (ele._id === user._id) {
            return true
          }
        })
        if (temp.length > 0) {
          setLike(true)
        }
        else {
          setLike(false)
        }
        if (post.Likes.length === 0) {
          setLike(false)
        }
      }
    }
  }, [props.user, post])
  useEffect(() => {
    setPost(props.post)
  }, [props.post])

  const likePost = async () => {
    let original = { ...post }
    let temp = { ...post }
    temp.Likes = [...temp.Likes, { _id: user._id, image: user.image, Name:user.Name }]
    setPost({ ...temp })
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
    }).then((res) => {
      // props.update()
    }).catch(err => {
      console.log("--", err)
      setPost({ ...original })
    })

  }

  const dislikePost = async () => {
    let original = { ...post }
    let temp = { ...post }
    let likearray = temp.Likes.filter((ele) => {
      if (ele._id === user._id) {
        return false
      }
      else {
        return true
      }
    })
    temp.Likes = [...likearray]
    setPost({ ...temp })
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
    }).then((res) => {
      props.update()
    }).catch(err => {
      console.log(err)
      setPost({ ...original })
    })

  }

  return (

    <div className="post">
      {typeof post === 'undefined' ? <Skeleton height="400px" /> : <div>
        <div className="avatarHolder" ><Avatar style={{ cursor: "pointer" }} onClick={() => {
          props.history.push({ pathname: '/profile', state: { user: post.user.email } })
        }} size="sm" name={post.user.Name} src={post.user.image} /><Text fontSize="md" >{post.user.Name}</Text></div>
        <Divider className="divider" />
        {post.Image !== "" ? <><img class="post_img" src={post.Image}></img>
          <Divider className="divider" />
        </> : null}
        <Text fontSize="sm" style={{ fontWeight: 600 }}>{post.Title}</Text>
        <Text fontSize="sm">{post.Body}</Text>
        <Divider className="divider" />
        <div>{like ? <i onClick={dislikePost} class="fa fa-thumbs-up likeIcon" aria-hidden="true" ></i> : <i onClick={likePost} class="fa fa-thumbs-o-up likeIcon" aria-hidden="true" ></i>}<Text className="like_text" onClick={() => { setLikeModal(true) }}>{`${post.Likes ? post.Likes.length : 0} Likes`}</Text>
          <i  class="fa fa-comments commentIcon" aria-hidden="true"></i>
          <Text onClick={() => {
            props.history.push(`/post/${post._id}`)
          }} className="comment_text">{`${post.comments ? post.comments.length : 0} Comments`}</Text></div>
        <Divider className="divider" />
        {props.children !== undefined ?
          <div>{props.children}
            <Divider className="divider" />
          </div>
          : null}

        <div className="commentText" ><Input value={comment} onChange={(e) => {
          setComment(e.target.value)
        }} style={{ borderRadius: 100 }} placeholder="Enter comment..." size="md" /> <Button onClick={() => {
          props.postcomment(comment, post._id)
          setComment('')
        }} style={{ marginLeft: 5 }} colorScheme="teal" size="md">
            POST
                    </Button>
        </div>
        <PostModel Likes={post.Likes} open={likeModal} close={() => { setLikeModal(false) }}></PostModel>
      </div>}
    </div>
  )

}
const mapActionsToProps = (dispatch) => {
  return ({
    getPosts: () => { dispatch(Actions.getPostsAction()) }
  })
}
const mapActionsToState = (state) => {
  return ({
    user: state.user,

  })
}
export default withRouter(connect(mapActionsToState, mapActionsToProps)(Post))