import React, { useEffect, useState } from "react"
import './Comments.css'
import Comment from '../Comment'
const Comments = (props) => {
    const [comments, setComments] = useState([])

    useEffect(() => {
        setComments([...props.comments])
    }, [props])


    return (
        <div className="comments">
            {props.home ? <Comment item={comments[comments.length - 1]}></Comment> : comments.map((ele) => {

                return (
                    <Comment item={ele}></Comment>
                )
            })}
        </div>
    )


}

export default Comments