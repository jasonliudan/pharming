import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import Config from 'lib/config';
import { numberWithDecimals } from 'utils';

import { MainButton } from 'components/basicComponents';
import StakeDialog from 'components/dialogs/stakeDialog';
import UnstakeAllDialog from 'components/dialogs/unstakeAllDialog';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const StakeAsset = ({ totalStaked, staked, locked, allowed, onApprove, onStake, onUnstakeAll, balance, withdrawableDate, rewardBalance, stakeTokenInfo, rewardRate, rewardTokenInfo, maximumStakingAmount }) => {
    const [stakeDialogOpen, setStakeDialogOpen] = React.useState(false);
    const [unstakeDialogOpen, setUnstakeDialogOpen] = React.useState(false);

    const withdrawDate = new Date(withdrawableDate);
    return (
        <Card>
            <div>
                <div>
                    <div>
                        <h2 style={{marginBottom: '20px'}}>{stakeTokenInfo.symbol}</h2>
                    </div>
                    <div style={{ position: 'relative', margin: 'auto', width: '250px'}}>
                        <CircularProgressbar value={numberWithDecimals(staked, stakeTokenInfo.decimals, Config.Utils.decimals)} 
                        maxValue={numberWithDecimals(totalStaked, stakeTokenInfo.decimals, Config.Utils.decimals)} strokeWidth={3} />
                        <TextInsideProgress>
                            <img src={require('assets/icons/phantasma-small.svg')} alt={stakeTokenInfo.name} />
                            {locked ===0 ?
                                <p style={{fontSize: '50px', lineHeight: '30px'}}>
                                    {numberWithDecimals(staked, stakeTokenInfo.decimals, Config.Utils.decimals)}
                                </p>: 
                                <p>
                                    {numberWithDecimals(locked, stakeTokenInfo.decimals, Config.Utils.decimals)} Locked until {moment.unix(withdrawDate).format('DD/MM/YYYY')}
                                </p>}
                            <p style={{fontSize: '18px', fontWeight: '900', color: '#4a9eff', marginTop: '30px'}}>Out of {numberWithDecimals(totalStaked, stakeTokenInfo.decimals, Config.Utils.decimals)}</p>
                            {totalStaked !== 0 && <p>{(staked/totalStaked*100).toFixed(2)}%</p>}
                        </TextInsideProgress>
                    </div>
                    <div style={{marginTop: '20px'}}>
                        <img src={require('assets/staking.svg')} alt={stakeTokenInfo.name} />
                        
                    </div>
                    <RewardInfo>
                       <img src={require('assets/icons/phantasma-energy-small.svg')} alt={stakeTokenInfo.name} />
                       <div>
                          {totalStaked !== 0 && (rewardRate * (staked / totalStaked) / Math.pow(10, 18) * 3600  * 24 * 30).toFixed(0)}
                       </div>
                        <div style={{fontSize: '15px', marginTop: '5px'}}>
                            <div style={{borderBottom: '1px solid black'}}>{rewardTokenInfo.symbol}</div>
                            <div>MONTH</div>
                        </div>
                    </RewardInfo>
                </div>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                        {allowed ? (
                            <MainButton style={{ width: '75%' }}
                                onClick={() => setStakeDialogOpen(true)}>
                                Stake
                            </MainButton>
                        ) : (
                                <MainButton style={{ width: '75%' }}
                                    onClick={onApprove}>
                                    {`Approve ${stakeTokenInfo.symbol}`}
                                </MainButton>
                            )}

                        <MainButton style={{ width: '23%' }}
                            onClick={() => setUnstakeDialogOpen(true)}>
                            <b>-</b>
                        </MainButton>
                    </div>
                </div>
            </div>

            <StakeDialog
                open={stakeDialogOpen}
                poolBalance={rewardBalance}
                stakeToken={stakeTokenInfo}
                rewardToken={rewardTokenInfo}
                totalStaked={totalStaked}
                userBalance={balance}
                dialogTitle={(
                    <div style={{display: 'flex'}}>
                        <img src={stakeTokenInfo.image} alt={stakeTokenInfo.name} width={35} /> &nbsp;&nbsp;
                        <span>{`Stake ${stakeTokenInfo.symbol}`}</span>
                    </div>
                )}
                onStake={onStake}
                onClose={() => setStakeDialogOpen(false)}
            />
            <UnstakeAllDialog
                open={unstakeDialogOpen}
                stakeToken={stakeTokenInfo}
                staked={staked}
                dialogTitle={(
                    <div style={{display: 'flex'}}>
                        <img src={stakeTokenInfo.image} alt={stakeTokenInfo.name} /> &nbsp;&nbsp;
                        <span>{`Withdraw ${stakeTokenInfo.symbol}`}</span>
                    </div>
                )}
                onUnstakeAll={onUnstakeAll}
                onClose={() => setUnstakeDialogOpen(false)}
            />
        </Card >
    )
}

const Card = styled.div`
    width: 82%;
    min-width: 285px;
    max-width: 400px;
    box-sizing: border-box;
    padding: 20px;
    margin: auto;
    border-radius: 20px;
    background-color: #130035;
    text-align: center;
`

const RewardInfo = styled.div`
    background-color: #4a9eff;
    color: #130035;
    height: 48px;
    max-width: 250px;
    border-radius: 10px;
    margin: auto;
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
    padding: 0px 10px;
    font-weight: 600;
    font-size: 40px;
`

const TextInsideProgress = styled.div`
    position: absolute;
    top: 30px;
    width: 100%;
`

export default StakeAsset;
   