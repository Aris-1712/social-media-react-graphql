import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { withRouter } from 'react-router'
import { Button, Divider, Input, Skeleton, Text } from '@chakra-ui/react'
import { Api } from '../../API/Api'
import './Postdetail.css'
import Post from '../Post'
import Comments from '../Comments'
const Postdetail = (props) => {
  const [post, setPost] = useState({})
  useEffect(() => {
    const getPost = async () => {
      let data = await Axios.post(Api, {
        query: `mutation{
                    getPost(id:"${props.match.params.id}"){
                      Title
                      _id
                      Body
                      Image
                      user{
                        Name
                        _id
                        image
                      }
                      comments{
                        time
                          Text
                        user{
                          image
                          Name
                          _id
                        }
                      }
                      Likes{
                        Name
                        image
                        _id
                      }
                      
                    }
                  }`
      }, {
        headers: {
          "x-auth-token": localStorage.getItem("x-auth-token")
        }
      })
      console.log(data.data.data.getPost)
      setPost(data.data.data.getPost)
    }
    getPost()
  }, [])
  // ----------------
  const onPost = async(val, postid) => {
    let temp = {...post}
    let tempPost={...post}
    temp.comments=[...temp.comments, {Text: val,time:new Date().toISOString() ,user: { ...temp.user }} ]
    // ele.comments.push({ Text: val, user: { ...ele.user } })
      
    setPost({...temp})
    let data = await Axios.post(Api, {
      query: `
      mutation{
        createComment(pid:"${postid}",text:"${val}",time:"${new Date().toISOString()}"){
          Text
          user{
            Name
          }
        }
      }
`
    }, {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token")
      }
    })
    if(data.error){
      setPost({...tempPost})
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

export default withRouter(Postdetail)