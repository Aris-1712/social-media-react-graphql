import logo from './logo.svg';
// import './App.css';
import { useEffect } from 'react';
import axios from 'axios'
import Login from './Components/Login';
import { ChakraProvider } from "@chakra-ui/react"
function App() {
 
  return (
    <ChakraProvider>
    <div>
      <Login></Login>
      </div>
      </ChakraProvider>
  );
}

export default App;
