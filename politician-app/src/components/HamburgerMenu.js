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
                    borderRadius={0}
                    animationDuration={0.5}
                />
        )
    }

    displayHamburger = () => {
        return (
            <ul className='nav'>
                    <li className='nav-link'><NavLink to='/' >Home</NavLink></li>
                </ul>
        )
    }

    displayMobileMenu = () => {
        return (
            <ul className='hamburgerDropDown'>
                    <li className='nav-link'><NavLink to='/' >Home</NavLink></li>
                 
                </ul>
        )
    }

    render() {
        return (
            <div className='Hamburger'>
                { this.state.open ?  this.displayMobileMenu() : null}
                {window.innerWidth > 1200 ? this.displayHamburger() : this.displayHamburgerMenu()}
            </div>
        );
    }
}

export default Hamburger;