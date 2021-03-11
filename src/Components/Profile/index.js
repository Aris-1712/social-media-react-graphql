import { Avatar, Button, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../Reducer/Actions'
import {FaUserPlus} from 'react-icons/fa'
import Posts from '../Posts'
import { Redirect } from 'react-router'
import { getUser} from '../../API/calls'
const Profile = (props) => {
    const [user, setUser] = useState({})
    console.log(props.location.state)
    useEffect(() => {
        const getuserFunc=async()=>{
            console.log(props,props.location.state.user)
            let res=await getUser(props.location.state.user)
            console.log(res.data.data.getUser)
            setUser(res.data.data.getUser)
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
    return (
        <div>
            {Object.keys(user).length !== 0 ?
                <div style={{ width: "50%", margin: "100px auto" }}>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <div style={{ border: "3px solid #17b890", borderRadius: 100, padding: 10 }}><Avatar size="2xl" name={user.Name} src={user.image}></Avatar></div>
                        <Text style={{ fontWeight: 500 }} fontSize="4xl">{user.Name}</Text>
                        <Button style={{marginTop:10,fontSize:15}} leftIcon={<FaUserPlus />} colorScheme="blue" variant="outline">
                            Follow
                        </Button>
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