import React, {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ProtectedRoute = (props) => {
  const {Component} = props
  const navigate =  useNavigate();


  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'false') {
      navigate('/login');
    }
  }, []); 
  return (
    <div>
   multiple pages ma jya jarur hoy tya aa use karvu 
      <Component/>
    </div>
  )
}

export default ProtectedRoute
