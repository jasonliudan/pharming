import React from 'react';
import styled from 'styled-components';

import Config from 'lib/config';
import { numberWithDecimals } from 'utils';


import { MainButton } from 'components/basicComponents';

export const RewardAsset = ({ earned, onHarvest, percent, rewardToken, periodFinish }) => {
    const harvest = () => {
        var currentDate = new Date();
        if (new Date(currentDate) > new Date(periodFinish)) 
            onHarvest();
        else
            alert('You can only harvest after the Pool is finished');
    }
    return (
        <Card>
            <div>
                <div>
                    <div>
                        <h2>{rewardToken.name}</h2>
                    </div>
                    <div>
                        <img src={rewardToken.image} alt={rewardToken.name} />
                    </div>
                    <div>
                        <span>
                            {numberWithDecimals(earned, rewardToken.decimals, Config.Utils.decimals)}
                        </span>
                    </div>
                    <div>
                        <span>{`Estimated ${rewardToken.symbol} earned`}</span>
                    </div>
                </div>
                <div>
                    <div>
                        <MainButton style={{ margin: '15px 0px', width: '100%' }}
                            disabled={earned <= 0}
                            onClick={harvest}>
                            Harvest
                        </MainButton>
                    </div>
                </div>
            </div>
        </Card>
    )
}

const Card = styled.div`
    width: 285px;
    height: 350px;
    padding: 20px;
    margin: 10px;
    border-radius: 15px;
    background-color: #1D2D50;
    font-family: "Geo",sans-serif;
`

export default RewardAsset;

