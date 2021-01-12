import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import axios from 'axios'
import Login from './Components/Login';
import { ChakraProvider } from "@chakra-ui/react"
import Signup from './Components/Signup';
import Router from './Routes/Router';
function App() {
 
  return (
    <ChakraProvider>
    <Router></Router>
      </ChakraProvider>
  );
}

export default App;
