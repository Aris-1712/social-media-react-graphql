import { Api } from "./Api"
import Axios from 'axios'
import { Redirect } from "react-router"
export const signin=(data)=>{
    return new Promise((resolve,reject)=>{
        Axios({
            url: Api,
            method: 'post',
            data: {
                query: `
    mutation{
        signin(email:"${data.email}",pass:"${data.password}")
        }
      `
            }
        }).then((result) => {
            if ("errors" in result.data) {
            alert("Incorrect username or password")
            reject(result.data.errors[0].message)
            } else {
              localStorage.setItem("x-auth-token",result.data.data.signin)
              let user=getUser(data.email)
              resolve(user)
            }
          
        }).catch(err=>{
            alert("Incorrect username or password")
            reject(err)
        })
    })
    

}

export const getUser=async(email)=>{
  try{
    let data = await Axios.post(Api, {
        query: `mutation{
            getUser(email:"${email}"){
                Name
                _id
                image
                email
                followers{
                    Name
                    _id
                    image
                }
                following{
                    Name
                    _id
                    image
                }
                Age
                posts{
                    _id
                    Title
                    Body
                    Image
                    Likes{
                        _id
                        Name
                        image
                    }
                    comments{
                        Text
                        time
                        user{
                            _id
                            Name
                            image
                        }
                    }
                    time
                }

          }
}`
      }
      , {
        headers: {
          "x-auth-token": localStorage.getItem("x-auth-token")
        }
      }
      )
      console.log(data)
      localStorage.setItem("user_email",email)
      return data
    }catch(err){
      
      <Redirect path='/Signin'></Redirect>
    }
}


export const getPosts=()=>{
   
       return new Promise((resolve,reject)=>{
        let data = Axios.post(Api, {
            query: `
          query{
              getPosts{
                Title
                Body
                Image
                _id
                Likes{
                  Name
                  _id
                  image
                }
                user{
                  Name
                  _id
                  image
                  followers{
                    _id
                    Name
                    image
                  }
                  following{
                    _id
                    Name
                    image
                  }
                  posts{
                    _id
                  }
                }
                comments{
                  Text
                  time
                  user{
                    Name
                    _id
                    image
                  }
                }
              }
            }
  `
          }, {
            headers: {
              "x-auth-token": localStorage.getItem("x-auth-token")
            }
          }).then((data)=>{
           
           resolve([...data.data.data.getPosts])
          }).catch(err=>{
            alert(err)
            reject(err)
          })
       })  
}

export const postComment=(postid,val)=>{
    return new Promise((resolve,reject)=>{
         Axios.post(Api, {
            query: `
            mutation{
              createComment(pid:"${postid}",text:"${val}",time:"${new Date().toISOString()}"){
                Text
                user{
                  Name
                }
              }
            }
      `
          }, {
            headers: {
              "x-auth-token": localStorage.getItem("x-auth-token")
            }
          }).then((data)=>{
            resolve(data)
        })
    })
    
}


export const getPost=(id)=>{
    return new Promise((resolve,reject)=>{
        Axios.post(Api, {
            query: `mutation{
                        getPost(id:"${id}"){
                          Title
                          _id
                          Body
                          Image
                          user{
                            Name
                            _id
                            image
                          }
                          comments{
                            time
                              Text
                            user{
                              image
                              Name
                              _id
                            }
                          }
                          Likes{
                            Name
                            image
                            _id
                          }
                          
                        }
                      }`
          }, {
            headers: {
              "x-auth-token": localStorage.getItem("x-auth-token")
            }
          }).then((data)=>{
              resolve(data.data.data.getPost)
          }).catch(err=>{
              reject(err)
          })
    })

}

export const createPost=(data)=>{
  return new Promise((resolve,reject)=>{
       Axios.post(Api, {
          query: `
          mutation{
            createPost(title:"${data.title}",body:"${data.body}",Image:"${data.Image}",time:"${data.time}"){
              Title
              _id
              user{
                Name
              }
              comments{
                id
              }
            }
          }
    `
        }, {
          headers: {
            "x-auth-token": localStorage.getItem("x-auth-token")
          }
        }).then((data)=>{
          resolve(data)
      })
  })
  
}



export const getUsers=()=>{
  return new Promise((resolve,reject)=>{
    Axios.post(Api, {
      query: `query{
        getUsers{
          Name
          _id
          image
          email
          followers{
              Name
              _id
              image
          }
          following{
              Name
              _id
              image
          }
          Age
          posts{
              _id
              Title
              Body
              Image
              Likes{
                  _id
                  Name
                  image
              }
              comments{
                  Text
                  time
                  user{
                      _id
                      Name
                      image
                  }
              }
              time
          }

    }
      }`
    }, {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token")
      }
    }).then((res)=>{
      resolve(res)
    })
  })
}