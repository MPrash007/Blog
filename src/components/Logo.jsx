import React from 'react'
import logo from '../assets/Image.png'

function Logo({width = '100px'}) {
  return (
    <div>
      <img src={logoImage} alt="MegaBlog Logo" style={{ width }} />
    </div>
  )
}

export default Logo
