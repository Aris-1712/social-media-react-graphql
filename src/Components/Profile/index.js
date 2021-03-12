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
const Profile = (props) => {
    const loggedin_user=JSON.parse(localStorage.getItem("user_details"))
    const [user, setUser] = useState({})
    const [followCheck,setFollowCheck]=useState(false)
    console.log(props.location.state)
    useEffect(() => {
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
          console.log(data)
          let temp={...user}
          temp.followers=[...temp.followers,{Name:loggedin_user.Name,_id:loggedin_user._id,image:loggedin_user.image}]
          setUser({...temp})
          setFollowCheck(true)
    }
    const unfollow=async(id)=>{
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
          console.log(data)
          let temp={...user}
          let index
          debugger
          temp.followers.map((ele,ind)=>{
              if(ele._id===loggedin_user._id){
                  index=ind
              }
          })
          temp.followers.splice(index,1)
        //   temp.following=[...temp.following,loggedin_user._id]
          setUser({...temp})
          setFollowCheck(false)
    }
    return (
        <div>
            {Object.keys(user).length !== 0 ?
                <div style={{ width: "50%", margin: "100px auto" }}>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <div style={{ border: "3px solid #17b890", borderRadius: 100, padding: 10 }}><Avatar size="2xl" name={user.Name} src={user.image}></Avatar></div>
                        <Text style={{ fontWeight: 500 }} fontSize="4xl">{user.Name}</Text>
                        {!followCheck?<Button onClick={()=>{follow(user._id)}} style={{marginTop:10,fontSize:15}} leftIcon={<FaUserPlus />} colorScheme="blue" variant="outline">
                            Follow
                        </Button>:
                        <Button onClick={()=>{unfollow(user._id)}} style={{marginTop:10,fontSize:15}} /* leftIcon={<FaUserPlus />} */ colorScheme="blue" variant="solid">
                            Unfollow
                        </Button>}
                    </div>
                    <div style={{display:"flex",justifyContent:"space-evenly",marginTop:50,marginBottom:50,border:"1px solid rgb(197 226 219)",padding:20,borderRadius:20}}>
                    <div style={{textAlign:"center"}}><Text style={{fontWeight:500}} fontSize="lg">Total Posts</Text><Text style={{color:"#17b890",fontWeight:700}}>{user.posts.length}</Text></div>
                    <div style={{textAlign:"center"}}><Text style={{fontWeight:500}} fontSize="lg">Followers</Text><Text style={{color:"#17b890",fontWeight:700}}>{user.followers.length}</Text></div>
                    <div style={{textAlign:"center"}}><Text style={{fontWeight:500}} fontSize="lg">Following</Text><Text style={{color:"#17b890",fontWeight:700}}>{user.following.length}</Text></div>
                    </div>
                    <div style={{marginTop:20}}>
                    <Posts profilePosts={[...user.posts]} profile={user._id}></Posts>
                    </div>
                </div>
                
                : <div>Nothing</div>}
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