import React from 'react'
import '../style/Parallax.css'

import '../style/Sidebar.css'
import logo from '../components/images/2020_TAG_Horizontal_Color_Positive.png'

const navLinks = [
  { url: '/about-us', name: 'About Us' },
  { url: '/projects', name: 'Projects' },
  { url: '/services', name: 'Services' },
  { url: '/contact-us', name: 'Contact Us' },
];

export default class Menu extends React.Component {  
  constructor(){
    super();
    this.state = {
      style:"menu",
      menuStatus:"open"
    };
    this.handleClick = this.handleClick.bind(this);
  };

  handleClick() {
    switch(this.state.menuStatus)
    {
      case "open":
        this.setState({
          menuStatus:"close",
          style:"menu active"
        });
        break;
      case "close":
        this.setState({
          menuStatus:"open",
          style:"menu"
        });
        break;
      default:
        this.setState({
          menuStatus:"close",
          style:"menu active"
        });
    }        
  }

  render() {
    return (      
      <div className='new-header'>
        <button className='menubutton' onClick={this.handleClick}></button>
        <div className={this.state.style}>
          <ul  className='parallax'>
            {navLinks.map(({ url, name }) => (
              <li key={name}>
                <a href={url}>{name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="site-identity row">
          <h6 className='logo-text col-6'>POWERED BY:</h6>
          <a href="/"><img className='logo col' src={logo} alt="Tag Strategies" /></a>
        </div> 
      </div>
    );
  }
}
