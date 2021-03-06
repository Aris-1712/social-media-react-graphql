import { Avatar, Button, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../Reducer/Actions'
import {FaUserPlus} from 'react-icons/fa'
import Posts from '../Posts'
import { Redirect } from 'react-router'
import { getUser} from '../../API/calls'
import Axios from 'axios'
import {Api} from '../../API/Api'
import { useToast } from "@chakra-ui/react"
import './Profile.css'
const Profile = (props) => {
    const toast = useToast()
    const loggedin_user=JSON.parse(localStorage.getItem("user_details"))
    const [user, setUser] = useState({})
    const [followCheck,setFollowCheck]=useState(false)
    console.log(props.location.state)
    useEffect(() => {
        setUser({})
        const getuserFunc=async()=>{
            console.log(props,props.location.state.user)
            let res=await getUser(props.location.state.user)
            console.log(res)
            console.log(res.data.data.getUser)
            setUser(res.data.data.getUser)
            res.data.data.getUser.followers.map((ele)=>{
                if(ele._id===loggedin_user._id){
                    setFollowCheck(true)
                }
            })
        }
        if(typeof props.location.state !=='undefined'){
            getuserFunc()
            // setUser(props.location.state.user)
        }
        
    }, [props.location])
    if(typeof props.location.state ==='undefined'){
        return(<Redirect to='/home'></Redirect>)
    }
    console.log(user.posts)
    
    const follow=async(id)=>{
        let temp={...user}
        temp.followers=[...temp.followers,{Name:loggedin_user.Name,_id:loggedin_user._id,image:loggedin_user.image}]
        setUser({...temp})
        setFollowCheck(true)
        let data = await Axios.post(Api, {
            query: `mutation{
                follow(id:"${id}")
              }`
          }
            , {
              headers: {
                "x-auth-token": localStorage.getItem("x-auth-token")
              }
            }
          )
          if(data.status===200){
            toast({
                title: "You are now following this user.",
                
                status: "success",
                duration: 9000,
                isClosable: true,
              })
          }
         
    }
    const unfollow=async(id)=>{
        let temp={...user}
          let index
          temp.followers.map((ele,ind)=>{
              if(ele._id===loggedin_user._id){
                  index=ind
              }
          })
          temp.followers.splice(index,1)
        //   temp.following=[...temp.following,loggedin_user._id]
          setUser({...temp})
          setFollowCheck(false)
        let data = await Axios.post(Api, {
            query: `mutation{
                unfollow(id:"${id}")
              }`
          }
            , {
              headers: {
                "x-auth-token": localStorage.getItem("x-auth-token")
              }
            }
          )
          if(data.status===200){
            toast({
                title: "You are not following this user anymore.",
                
                status: "success",
                duration: 9000,
                isClosable: true,
              })
          }
          
    }
    return (
        <div>
            {Object.keys(user).length !== 0 ?
                <div className="ProfileHolder">
                    <div className="ProfileImageHolder" >
                        <div style={{ border: "3px solid #17b890", borderRadius: 100, padding: 10 }}><Avatar size="2xl" name={user.Name} src={user.image}></Avatar></div>
                        <Text style={{ fontWeight: 500 }} fontSize="4xl">{user.Name}</Text>
                        {props.location.state.user===loggedin_user.email?null:<>{!followCheck?<Button onClick={()=>{follow(user._id)}} style={{marginTop:10,fontSize:15}} leftIcon={<FaUserPlus />} colorScheme="blue" variant="outline">
                            Follow
                        </Button>:
                        <Button onClick={()=>{unfollow(user._id)}} style={{marginTop:10,fontSize:15}} /* leftIcon={<FaUserPlus />} */ colorScheme="blue" variant="solid">
                            Unfollow
                        </Button>}</>}
                    </div>
                    <div className="ProfileDetailHolder">
                    <div ><Text  fontSize="lg">Total Posts</Text><Text className="ProfileCount" >{user.posts.length}</Text></div>
                    <div ><Text  fontSize="lg">Followers</Text><Text className="ProfileCount" >{user.followers.length}</Text></div>
                    <div ><Text  fontSize="lg">Following</Text><Text className="ProfileCount" >{user.following.length}</Text></div>
                    </div>
                    <div style={{marginTop:20}}>
                    <Posts profilePosts={[...user.posts]} profile={user._id}></Posts>
                    </div>
                </div>
                
                : <div className="loader" >
                   
                    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>}
        </div>
    )

}
const mapStateToProps = (state) => {
    return ({
        user: state.user
    })
}
const mapActionToProps = (dispatch) => {
    return ({
        getUser: (email) => { dispatch(Actions.getUserThunk(email)) }
    })
}
export default connect(mapStateToProps, mapActionToProps)(Profile)