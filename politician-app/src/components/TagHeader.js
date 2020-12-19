import React from 'react'
import '../style/TagHeader.css'
import logo from '../components/images/2020_TAG_Horizontal_Color_Positive.png'
import Hamburger from '../components/HamburgerMenu'


export default class Tagheader extends React.Component {
  render () {
    return (
      <header className="site-header">
        <nav className="site-navigation">
          <Hamburger crossClassName={ "burger-menu" } />
        </nav>
        <div className="site-identity">
          <h6 className='logo-text'>POWERED BY:</h6>
          <a href="/"><img className='logo' src={logo} alt="Tag Strategies" /></a>
        </div>  
      </header>
    )
  }
}