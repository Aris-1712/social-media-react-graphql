import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Post from '../Post'
import { withRouter } from 'react-router'
import { Api } from '../../API/Api'
import Comments from '../Comments'

const Posts = (props) => {

  const [posts, setPosts] = useState([])

  useEffect(() => {

    const getData = async () => {
      try {
        let data = await Axios.post(Api, {
          query: `
        query{
            getPosts{
              Title
              Body
              Image
              _id
              Likes{
                Name
                _id
                image
              }
              user{
                Name
                _id
                image
              }
              comments{
                Text
                time
                user{
                  Name
                  _id
                  image
                }
              }
            }
          }
`
        }, {
          headers: {
            "x-auth-token": localStorage.getItem("x-auth-token")
          }
        })

        setPosts([...data.data.data.getPosts])
      } catch (err) {
        props.history.push('/signin')
      }
    }
    getData()

  }, [])

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
      setPosts([...tempPosts])
      alert("Something went wrong")
    }
  }
  console.log("rerender", posts)
  return (
    posts.map((ele) => {
      console.log(ele.comments)
      return (
        <Post postcomment={onPost} post={ele}>
          <Comments home={true} comments={ele.comments}></Comments>
        </Post>
      )
    })
  )

}

export default withRouter(Posts)