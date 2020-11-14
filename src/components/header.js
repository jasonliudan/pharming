import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { WalletConnectButton } from 'components/basicComponents';
import { setAccount } from 'actions';
import Web3Client from 'api/web3client';

class Header extends Component {

    async connectMetamask() {
        const account = await Web3Client.getAccount();
        this.props.setAccount(account);
    }

    render() {
        const { account } = this.props;
        return (
            <div>
                <div className="topleft">
                    <Link to={{ pathname: '/' }} style={{ textDecoration: 'none', color: 'white' }}>
                        <p>PHARMING</p>
                    </Link>
                </div>
                <div className="topright">
                    {account === null ?
                        <WalletConnectButton
                            onClick={() => this.connectMetamask()}>CONNECT WALLET</WalletConnectButton> :
                        <p>{account}</p>
                    }
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    account: state.accountReducer.account
});
const mapDispatchToProps = dispatch => ({
    setAccount: (account) => dispatch(setAccount(account))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
