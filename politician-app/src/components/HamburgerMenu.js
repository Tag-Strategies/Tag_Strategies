import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import HamburgerMenu from 'react-hamburger-menu';
import '../style/HamburgerMenu.css'

class Hamburger extends Component {
    constructor(){
        super()
        this.state = {
            open: false,
            hideOrShowHambugerDropDown: 'nav'
        }
    }

    handleClick = () => {
        this.setState({open: !this.state.open});
        if (!this.state.open){
            console.log('clicked burger')
        }
        if (this.state.open){          
            console.log('unclicked burger')
        }
    }

    displayHamburgerMenu = () => {
        return (
            <HamburgerMenu
                    isOpen={this.state.open}
                    menuClicked={this.handleClick.bind(this)}
                    width={50}
                    height={30}
                    strokeWidth={4}
                    rotate={0}
                    color='white'
                    borderRadius={20}
                    animationDuration={0.5}
                    className="burger-menu"
                />
        )
    }

    displayHamburger = () => {
        return (
            <ul className='nav'>
                    <li className='nav-link'><NavLink to='politician' >Home</NavLink></li>
                    <li className='nav-link'><NavLink to='/' >Test Page</NavLink></li>
                </ul>
        )
    }

    displayMobileMenu = () => {
        return (
            <ul className='hamburgerDropDown'>
                    <li className='nav-link'><NavLink to='politician' >Home</NavLink></li>
                    <li className='nav-link'><NavLink to='/' >Test Page</NavLink></li>
                </ul>
        )
    }

    render() {
        return (
            <div className='Hamburger'>
                { this.state.open ?  this.displayMobileMenu() : null}
                {window.innerWidth > 100000 ? this.displayHamburger() : this.displayHamburgerMenu()}
            </div>
        );
    }
}

export default Hamburger;