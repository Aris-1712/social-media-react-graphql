import { Avatar, Text } from '@chakra-ui/react'
import React from 'react'
import './Comment.css'
import moment from 'moment'
const Comment=(props)=>{
    
    let comment=props.item
    if(comment){
    return(
        <div className="comment">
            <Avatar size="sm" name={comment.user.Name} src={comment.user.image} />
            <div className="comment_sec">
            <Text fontSize="sm" style={{fontWeight:600}}>{comment.user.Name}</Text>
            <Text fontSize="sm" style={{wordBreak:"break-all"}}>{comment.Text}</Text>
            <Text fontSize="xs" style={{wordBreak:"break-all",color:"grey"}}>{moment(comment.time).fromNow()}</Text>
            </div>
        </div>
    )}
    else{
        return(<div>No Comments.</div>)
    }

}

export default Comment