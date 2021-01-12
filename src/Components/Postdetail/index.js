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
                      Body
                      Image
                      user{
                        Name
                        _id
                        image
                      }
                      comments{
                          Text
                        user{
                          image
                          Name
                          _id
                        }
                      }
                      Likes{
                        Name
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
  return (

    <div className="Postdetail">
      {post['Title'] === undefined ? <div><Skeleton height="400px" />
      </div> :
        
          <Post post={post}>
          <Comments home={false} comments={post.comments}></Comments>
          </Post>
       
      }
    </div>
  )

}

export default withRouter(Postdetail)