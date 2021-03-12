import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import axios from 'axios'
import Login from './Components/Login';
import { ChakraProvider } from "@chakra-ui/react"
import Signup from './Components/Signup';
import Router from './Routes/Router';
import Interceptor from './Interceptor'
import ErrorBoundaryFallback from './ErrorBoundaryFallback';
import {ErrorBoundary} from 'react-error-boundary'
function App() {
 
  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
    <ChakraProvider>
    <Router></Router>
      </ChakraProvider>
      </ErrorBoundary>
      
  );
}

export default App;
