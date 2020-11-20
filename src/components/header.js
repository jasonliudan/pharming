import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Header extends Component {

    render() {
        return (
            <div className='header'>
                <Link to={{ pathname: '/pharming' }} style={{ textDecoration: 'none', color: 'white' }}>
                    <div style={{display: 'flex', width: 'fit-content', margin: 'auto', marginTop: '30px', marginBottom: '30px'}}>
                        <img src={require('assets/logo.png')} alt='logo' width={96} height={96}/>
                        <div style={{ marginLeft: '18px'}}>
                            <h1 style={{ margin: '14px 0px 0px 0px', fontSize: '42px', lineHeight: '40px' }}>PHANTASMA</h1>
                            <p style={{ margin: '0px', fontSize: '35px', lineHeight: '28px' }}>Pharming</p>
                        </div>
                    </div>
                </Link>
                <div style={{textAlign: 'center'}}>
                    <img src={require('assets/main-image.svg')} alt='logo'
                    style={{
                        maxWidth: '90%',
                        width: '500px',
                        margin: 'auto',
                        marginTop: '33%'
                    }} />
                </div>
            </div>
        );
    }
}

export default Header;
