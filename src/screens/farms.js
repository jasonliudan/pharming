import React, { Component } from 'react';

import Config from 'lib/config';
import PoolCard from 'components/poolCard';

import styled from 'styled-components';

import web3client from 'api/web3client';
import coingeckoClient from 'api/coingecko';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            apyData: []
        };
    }
    async componentDidMount() {
        let apyData = [];
        for (let i = 0; i < Config.pools.length; i++) {
            const poolContract = web3client.getContract(Config.pools[i].abi, Config.pools[i].address);
            const rewardTokenPrice = await coingeckoClient.getPrice(Config.tokens[Config.pools[i].rewardToken].tokenId);
            const stakingTokenPrice = await coingeckoClient.getPrice(Config.tokens[Config.pools[i].stakingToken].tokenId);

            const rewardRate = await web3client.poolGetRewardRate(poolContract);
            apyData.push(rewardRate * rewardTokenPrice / Math.pow(10, 18) / stakingTokenPrice * 86400 * 365 * 100);
        }
        this.setState({ apyData: apyData });
    }
    render() {
        const { apyData } = this.state;
        const { pools } = Config;

        return (
            <FarmsContainer>
                {
                    pools.map((pool, index) =>
                        <PoolCard key={index}
                            poolData={pool}
                            apy={apyData[index]} />)
                }
            </FarmsContainer>
        );
    }
}

const FarmsContainer = styled.div`
    display: grid;
    grid-template-columns: 33.3% 33.3% 33.3%;
    column-gap: 15px;
    row-gap: 10px;
`
export default App;
