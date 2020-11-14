import React, { Component } from 'react';
import styled from 'styled-components';

import { withRouter } from "react-router";

import { MainButton } from 'components/basicComponents';

import Config from 'lib/config';
import CardIcon from 'components/cardIcon';
class PoolCard extends Component {

    render() {
        const { poolData, apy } = this.props;
        const { tokens } = Config;
        const stakingTokenData = tokens[poolData.stakingToken];

        return (
            <FarmCardWrapper>
                <CardIcon src={stakingTokenData.image} />
                <div>
                    <h2>{`${stakingTokenData.name} Farm`}</h2>
                </div>
                <div className='center-h'>
                    <p>{`Deposit ${stakingTokenData.symbol}`}</p>
                    <p>{`Earn KCAL`}</p>
                </div>
                <MainButton style={{ margin: '15px 0px', width: '100%' }}
                    onClick={() => this.props.history.push(`farm/${poolData.poolId}`)}> SELECT </MainButton>
                {apy !== undefined ?
                    <p style={{ display: 'flex', justifyContent: 'center' }}>{`APY ${apy}%`}</p> :
                    <p>Loading ...</p>
                }
            </FarmCardWrapper>
        );
    }
}

const FarmCardWrapper = styled.div`
    width: 285px;
    height: 350px;
    padding: 20px;
    border-radius: 15px;
    background-color: #1D2D50;
    font-family: "Geo",sans-serif;
`

export default withRouter(PoolCard);
