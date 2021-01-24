import { Avatar, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { ImSearch } from 'react-icons/im'
import './header.css'
import OutsideClickHandler from 'react-outside-click-handler';
import { connect } from 'react-redux'
import _ from 'lodash'

const Header = (props) => {
const [search,setSearch]=useState('')
const [drop,setDrop]=useState(false)

useEffect(()=>{
if(search===''){
    setDrop(false)
}
else{setDrop(true)}

},[search])
    return (
        <div style={{ backgroundColor: "#1a202c" }}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", flex: 1, margin: "0px 50px", alignItems: "center", height: "100%" }}>
                <img onClick={()=>{props.history.push('/home')}} style={{ height: 80,cursor:"pointer" }} src={`${process.env.PUBLIC_URL}/Logo/header.png`}></img>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: 250 }}>
                    <div><InputGroup style={{ width: 200, borderColor: "#c6f6d5" }}>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<ImSearch style={{color:"#c6f6d5"}} />}
                        />
                        <Input  onChange={(e)=>{setSearch(e.target.value)}} className="search_box" type="tel" placeholder="Search..." />
                    </InputGroup>
                    <OutsideClickHandler onOutsideClick={()=>{
                        setDrop(false)
                    }}><div className={!drop?"dropdown-menu-hidden":"dropdown-menu"}>
                        {props.users.filter((ele)=>{
                            if(ele.Name.toLowerCase().includes(search.toLowerCase())){
                                return true
                            }
                        }).map((ele)=>{
                            return(
                                <div onClick={()=>{
                                    props.history.push({pathname:'/profile',state:{user:ele}})
                                }} style={{display:"flex",flexDirection:"row",alignItems:"center",padding:10,cursor:"pointer"}}>
                                    <Avatar size="sm" name={ele.Name} src={ele.image} />
                                    <Text style={{marginLeft:10}} fontSize="sm">{ele.Name}</Text>
                                </div>
                            )
                        })}
                        </div></OutsideClickHandler>
                    </div>
                    <i onClick={() => {
                        localStorage.clear()
                        props.history.push('/Signin')
                    }} style={{ fontSize: 30, color: "#c6f6d5" }} class="fa fa-sign-out" aria-hidden="true"></i></div>
            </div>
        </div>
    )

}
const mapActionsToState=(state)=>{
    return({
        users:state.users
    })
  }
export default withRouter(connect(mapActionsToState)(Header))   