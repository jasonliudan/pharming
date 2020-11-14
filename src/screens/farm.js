import React, { Component } from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';

import Config from 'lib/config';

import { WalletConnectButton } from 'components/basicComponents';
import RewardAsset from 'components/rewardAsset';
import StakeAsset from 'components/stakingAsset';
import {
    poolSetPoolInfo,
    poolSetStakeTokenInfo,
    poolSetStakeTokenContract,
    poolGetStakeTokenBalance,
    poolGetPeriodFinish,
    poolSetContract,
    poolStake,
    poolWithdraw,
    poolApproveToken,
    poolHarvest,
    poolExit,
    poolGetStaked,
    poolGetEarned,
    poolLoadAllowance
} from 'actions/poolActions';
import { setAccount } from 'actions/accountActions';
import web3client from 'api/web3client';
import { getDateLeft } from 'utils';

class Farm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            poolData: null,
            timeLeft: 0
        };
    }

    async componentDidMount() {



        //Main Data
        const { pid } = this.props.match.params;
        const poolData = Config.pools.find(pool => pool.poolId === pid);
        this.setState({ poolData: poolData });

        this.props.setPoolInfo(poolData);
        const contract = web3client.getContract(Config.tokens['SOUL'].abi, Config.tokens['SOUL'].address);
        this.props.setStakeTokenInfo(contract);

        //Time Left
        this.setState({
            timeLeft: getDateLeft(this.props.deadline)
        });

        //Set Pool Data
        const poolContract = web3client.getContract(poolData.abi, poolData.address);
        this.props.setPoolContract(poolContract);

        //Set Token Data
        this.props.setStakeTokenInfo(Config.tokens[poolData.stakingToken]);
        const tokenContract = web3client.getContract(Config.tokens[poolData.stakingToken].abi, Config.tokens[poolData.stakingToken].address);
        this.props.setStakeTokenContract(tokenContract);


        this.props.getPeriodFinish();

    }
    componentDidUpdate(prevProps) {
        if (this.props.account !== prevProps.account ||
            this.props.match.params.pid !== prevProps.match.params.pid) {
            this.props.loadAllowance();
            this.props.loadStaked();
            this.props.loadEarned();
            this.props.getStakeTokenBalance();
        }
    }

    async connectMetamask() {
        const account = await web3client.getAccount();
        this.props.setAccount(account);
    }

    render() {
        const { account ,periodFinish} = this.props;
        const { poolData } = this.state;
        if (!poolData) return <div />;

        const rewardTokenInfo = Config.tokens[poolData.rewardToken];
        const stakeTokenInfo = Config.tokens[poolData.stakingToken];

        return (
            <div>
                {account !== null ? <div>
                    <InfoCardWrapper>
                        <RewardAsset
                            rewardToken={rewardTokenInfo}
                            earned={this.props.earned}
                            periodFinish={periodFinish}
                            percent={1}
                            onHarvest={() => this.props.harvest()}
                        />
                        <StakeAsset
                            stakeTokenInfo={stakeTokenInfo}
                            rewardTokenInfo={rewardTokenInfo}
                            allowed={this.props.allowance > 0}
                            started={this.state.timeLeft > 0}
                            staked={this.props.staked}
                            totalStaked={this.props.totalStaked}
                            balance={this.props.stakeTokenBalance}
                            rewardBalance={this.props.poolInfo.balance}
                            onApprove={() => this.props.approve()}
                            onStake={(amount) => this.props.stake(amount)}
                            onUnstakeAll={() => this.props.unstake(this.props.staked)}
                        />
                    </InfoCardWrapper>
                </div> : <WalletConnectButton
                    onClick={() => this.connectMetamask()}>CONNECT WALLET</WalletConnectButton>}
            </div>
        );
    }
}

const InfoCardWrapper = styled.div`
    display: flex;
`

const mapStateToProps = state => ({
    account: state.accountReducer.account,
    totalStaked: state.poolReducer.totalStaked,
    staked: state.poolReducer.staked,
    allowance: state.poolReducer.allowance,
    earned: state.poolReducer.earned,
    periodFinish: state.poolReducer.periodFinish,
    stakeTokenBalance: state.poolReducer.stakeTokenBalance,
    deadline: state.poolReducer.deadline,
    stakeTokenInfo: state.poolReducer.stakeTokenInfo,
    rewardTokenInfo: state.poolReducer.rewardTokenInfo,
    poolInfo: state.poolReducer.poolInfo
});
const mapDispatchToProps = dispatch => ({
    setAccount: (account) => dispatch(setAccount(account)),

    setPoolInfo: (payload) => dispatch(poolSetPoolInfo(payload)),
    setPoolContract: (payload) => dispatch(poolSetContract(payload)),
    setStakeTokenInfo: (payload) => dispatch(poolSetStakeTokenInfo(payload)),
    setStakeTokenContract: (payload) => dispatch(poolSetStakeTokenContract(payload)),
    getStakeTokenBalance: () => dispatch(poolGetStakeTokenBalance()),
    getPeriodFinish: () => dispatch(poolGetPeriodFinish()),

    stake: (payload) => dispatch(poolStake(payload)),
    unstake: (payload) => dispatch(poolWithdraw(payload)),
    loadAllowance: () => dispatch(poolLoadAllowance()),
    approve: () => dispatch(poolApproveToken()),
    harvest: () => dispatch(poolHarvest()),
    exit: () => dispatch(poolExit()),
    loadEarned: () => dispatch(poolGetEarned()),
    loadStaked: () => dispatch(poolGetStaked()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Farm);
