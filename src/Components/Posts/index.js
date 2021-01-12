import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Post from '../Post'
import { withRouter } from 'react-router'
import { Api } from '../../API/Api'
const Posts=(props)=>{

    const [posts,setPosts]=useState([])

useEffect(()=>{
    
const getData=async()=>{
    try{
    let data=await Axios.post(Api,  {
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
              }
              user{
                Name
                _id
                image
              }
              comments{
                Text
                user{
                  Name
                  _id
                }
              }
            }
          }
`
    },{headers:{
        "x-auth-token":localStorage.getItem("x-auth-token")
    }})

    setPosts([...data.data.data.getPosts])
}catch(err){
    props.history.push('/signin')
}
}
getData()

},[])
    return(
posts.map((ele)=>{
    return(
        <Post post={ele}></Post>
    )
})
)

}

export default withRouter(Posts)