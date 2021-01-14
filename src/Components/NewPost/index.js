import { Avatar, Button, Divider, Input, Skeleton } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './NewPost.css'
const NewPost = (props) => {
    const [user, setUser] = useState({})
    useEffect(() => {
        setUser(props.user.data.data.getUser)
    }, [])
    return (<div>{
        Object.keys(user).length !== 0 ? <div className="newPostHolder" style={{ display: "flex", flexDirection: "column" }}>
            <div className="newpost">
                <Avatar size="md" name={user.Name} src={user.image} />
                <Input style={{ borderRadius: 15, height: 75, marginLeft: 10 }} placeholder={`What's on your mind, ${user.Name.split(' ')[0]} ?`} size="lg" />
            </div>
            <Divider></Divider>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginTop: 15, marginBottom: 15 }}>
                <Button colorScheme="teal" size="md">
                    Button
  </Button>
                <Button colorScheme="teal" size="md">
                    Button
  </Button>
                <Button colorScheme="teal" size="md">
                    Button
  </Button>
            </div>
        </div> : <div><Skeleton height="400px" /></div>
    }</div>

    )

}
const mapStateToProps = (state) => {
    return (
        {
            user: state.user
        }
    )
}
export default connect(mapStateToProps)(NewPost)