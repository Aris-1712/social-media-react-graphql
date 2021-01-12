import React from 'react'
import Posts from '../Posts'
import './Home.css'
const Home=(props)=>{
return(
    <div className="home">
        <div className="sec1"></div>
       
       <div className="sec2"><Posts></Posts></div>
       <div className="sec3"></div>
    </div>
)
}

export default Home