import React, { Component } from 'react';
import { withRouter } from "react-router";

import 'styles/header.scss';

class Header extends Component {

    render() {
        return (
            <div className='header'>
                <div style={{display: 'flex', width: 'fit-content', margin: 'auto', marginTop: '30px', marginBottom: '30px'}}
                onClick={()=>this.props.history.push('/pharming')}>
                        <img src={require('assets/logo.png')} alt='logo' className='logo'/>
                        <div style={{ marginLeft: '18px'}}>
                            <h1 className='title'>PHANTASMA</h1>
                            <p className='sub-title'>Pharming</p>
                        </div>   
                </div>
       
                <div style={{textAlign: 'center'}}>
                    <img src={require('assets/main-image.svg')} alt='logo'
                    className='header-ad'
                    />
                </div>
            </div>
        );
    }
}

export default withRouter(Header);
