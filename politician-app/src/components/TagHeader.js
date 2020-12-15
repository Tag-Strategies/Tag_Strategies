import React from 'react'
import '../style/TagHeader.css'
import logo from '../2020_TAG_Horizontal_Color_Positive.png'
import Dropdown from 'react-bootstrap/NavDropdown';
import { DropdownButton } from 'react-bootstrap';
import Hamburger from '../components/HamburgerMenu'


export default class Tagheader extends React.Component {
  render () {
    return (
      <header className="site-header">
        <div className="site-identity">
          <h6 className='logo-text'>POWERED BY:</h6>
          <a href="#"><img className='logo' src={logo} alt="Tag Strategies" /></a>
        </div>  
        <nav className="site-navigation">
          <Hamburger />
        </nav>
      </header>
    )
  }
}