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
          <div className="likeModelHolder">
              {props.Likes.map((ele)=>{
                  return(
                      <div className="likesHolder" >
                          <Avatar size="sm" name={ele.Name} src={ele.image} />
                          <Text fontSize="md" >{ele.Name}</Text>
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