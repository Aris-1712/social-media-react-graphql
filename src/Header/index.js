import React from 'react'
import {withRouter} from 'react-router-dom'
const Header=(props)=>{

    return(
        <div style={{height:70,backgroundColor:"#17b890"}}>
            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",flex:1,margin:"0px 50px",alignItems:"center",height:"100%"}}>
                <img style={{width:150}} src={`${process.env.PUBLIC_URL}/Logo/header.png`}></img>
                <i onClick={()=>{localStorage.clear()
                props.history.push('/Signin')
                }} style={{fontSize:30,color:"#082D0F"}} class="fa fa-sign-out" aria-hidden="true"></i>
            </div>
        </div>
    )

}

export default withRouter(Header)