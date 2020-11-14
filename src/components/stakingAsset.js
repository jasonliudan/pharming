import React from 'react';
import styled from 'styled-components';

import Config from 'lib/config';
import { numberWithDecimals } from 'utils';

import { MainButton } from 'components/basicComponents';
import StakeDialog from 'components/dialogs/stakeDialog';
import UnstakeAllDialog from 'components/dialogs/unstakeAllDialog';

export const StakeAsset = ({ totalStaked, staked, allowed, onApprove, onStake, onUnstakeAll, balance, rewardBalance, stakeTokenInfo, rewardTokenInfo }) => {
    const [stakeDialogOpen, setStakeDialogOpen] = React.useState(false);
    const [unstakeDialogOpen, setUnstakeDialogOpen] = React.useState(false);

    return (
        <Card>
            <div>
                <div>
                    <div>
                        <h2>{stakeTokenInfo.name}</h2>
                    </div>
                    <div>
                        <img src={stakeTokenInfo.image} alt={stakeTokenInfo.name} />
                    </div>
                    <div>
                        <span>
                            {numberWithDecimals(staked, stakeTokenInfo.decimals, Config.Utils.decimals)}
                        </span>
                    </div>
                    <div>
                        <span>{`${stakeTokenInfo.symbol} Staked`}</span>
                    </div>
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
                    <div>
                        <img src={stakeTokenInfo.image} alt={stakeTokenInfo.name} width={35} />
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
                    <div>
                        <img src={stakeTokenInfo.image} alt={stakeTokenInfo.name} />
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
    width: 285px;
    height: 350px;
    padding: 20px;
    margin: 10px;
    border-radius: 15px;
    background-color: #1D2D50;
    font-family: "Geo",sans-serif;
`

export default StakeAsset;

