import { Avatar, Text } from '@chakra-ui/react'
import React from 'react'
import './Comment.css'
const Comment=(props)=>{
    let comment=props.item
    return(
        <div className="comment">
            <Avatar size="sm" name={comment.user.Name} src={comment.user.image} />
            <div className="comment_sec">
            <Text fontSize="sm" style={{fontWeight:600}}>{comment.user.Name}</Text>
            <Text fontSize="sm" style={{wordBreak:"breal-all"}}>{comment.Text}</Text>
            </div>
        </div>
    )

}

export default Comment