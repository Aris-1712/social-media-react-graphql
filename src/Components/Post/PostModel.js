import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Divider,
    Avatar,
    Text,
  } from "@chakra-ui/react"

const PostModel=(props)=>{
    
return(
    <>
    <Modal isOpen={props.open} onClose={props.close}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Liked By</ModalHeader>
        <ModalCloseButton />
        <Divider></Divider>
        <ModalBody>
          <div style={{display:"flex",flexDirection:"column"}}>
              {props.Likes.map((ele)=>{
                  return(
                      <div style={{display:"flex",flexDirection:'row',marginBottom:15,marginTop:15}}>
                          <Avatar size="sm" name={ele.Name} src={ele.image} />
                          <Text fontSize="md" style={{ fontWeight: 600, marginLeft: 10 }}>{ele.Name}</Text>
                      </div>
                  )
              })}
          </div>
        </ModalBody>

        <ModalFooter>
          {/* <Button colorScheme="blue" mr={3} onClick={props.close}>
            Close
          </Button> */}
          {/* <Button variant="ghost">Secondary Action</Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
)
}

export default PostModel