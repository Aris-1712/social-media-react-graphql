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
        <div className="HeaderHolder">
            <div class="HeaderHolderInner">
                <img onClick={()=>{props.history.push('/home')}}  src={`${process.env.PUBLIC_URL}/Logo/header.png`}></img>
                <div className="HeaderSearchHolder" >
                    <div><InputGroup className="HeaderInputBox">
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
                            // console.log(ele)
                            return(
                                <div className="searchUser" onClick={()=>{
                                    props.history.push({pathname:'/profile',state:{user:ele.email}})
                                }} >
                                    <Avatar size="sm" name={ele.Name} src={ele.image} />
                                    <Text  fontSize="sm">{ele.Name}</Text>
                                </div>
                            )
                        })}
                        </div></OutsideClickHandler>
                    </div>
                    <i  onClick={() => {
                        localStorage.clear()
                        props.history.push('/Signin')
                    }} class="fa fa-sign-out signout" aria-hidden="true"></i></div>
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