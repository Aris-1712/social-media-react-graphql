import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { withRouter } from 'react-router'
import { Input, Skeleton, Text } from '@chakra-ui/react'
import {Api} from '../../API/Api'
import './Postdetail.css'
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
                      }
                      comments{
                          Text
                        user{
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
    })
    return (

        <div className="Postdetail">
            {post['Title']===undefined ? <div><Skeleton height="400px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
            </div> : <div className="post">
                    <Text fontSize="lg" style={{ fontWeight: 600 }}>{post.user.Name}</Text>
                    <img src={post.Image}></img>
                    <div><i class="fa fa-thumbs-up" aria-hidden="true" style={{ color: "#e64949", fontSize: 20, marginRight: 10 }}></i>{`${post.Likes ? post.Likes.length : 0} Likes`} <i onClick={() => { props.history.push(`/post/${post._id}`) }} style={{ color: "#082d0f", fontSize: 20, marginLeft: 20, marginRight: 10 }} class="fa fa-comments" aria-hidden="true"></i>{`${post.comments ? post.comments.length : 0} Comments`}</div>
                    <Text fontSize="sm" style={{ fontWeight: 600 }}>{post.Title}</Text>
                    <Text fontSize="sm">{post.Body}</Text>
                    <Input style={{ marginTop: 10 }} placeholder="Enter comment" size="md" />
                </div>}
        </div>
    )

}

export default withRouter(Postdetail)