import React from 'react'
import { useLocation } from 'react-router-dom'

function NotFound() {
  const location = useLocation();
  return (
    <div>
      {location && location.pathname} Route Not Found
    </div>
  )
}

export default NotFound