import { Avatar, Button, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../Reducer/Actions'
import {FaUserPlus} from 'react-icons/fa'
import Posts from '../Posts'
const Profile = (props) => {
    const [user, setUser] = useState({})
    useEffect(() => {
        setUser(props.location.state.user)
    }, [props.location])
    // useEffect(() => {
    //     if ("data" in props.user) {
    //         setUser(props.user.data.data.getUser)
    //     }

    // }, [props.user])
    return (
        <div>
            {/* "data" in props.user &&  */Object.keys(user).length !== 0 ?
                <div style={{ width: "50%", margin: "100px auto" }}>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <div style={{ border: "3px solid #17b890", borderRadius: 100, padding: 10 }}><Avatar size="2xl" name={user.Name} src={user.image}></Avatar></div>
                        <Text style={{ fontWeight: 500 }} fontSize="4xl">{user.Name}</Text>
                        <Button style={{marginTop:10,fontSize:15}} leftIcon={<FaUserPlus />} colorScheme="blue" variant="outline">
                            Follow
                        </Button>
                    </div>
                    <div style={{marginTop:20}}>
                    <Posts profile={user._id}></Posts>
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
        getUser: () => { dispatch(Actions.getUserThunk()) }
    })
}
export default connect(mapStateToProps, mapActionToProps)(Profile)