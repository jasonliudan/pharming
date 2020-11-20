import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, TextField, Button } from '@material-ui/core';
import { numberWithDecimals } from 'utils';
import Config from 'lib/config';


const StakeDialog = ({
    open,
    dialogTitle,
    poolBalance,
    stakeToken,
    rewardToken,
    totalStaked,
    userBalance,
    onClose,
    onStake,
}) => {
    const [stakeAmount, setStakeAmount] = React.useState('');

    const handleStake = () => {
        const _amount = parseFloat(stakeAmount);
        const _balance = numberWithDecimals(userBalance, stakeToken.decimals, Config.Utils.decimals, true);
        if (_amount > _balance || _amount <= 0) {
            alert('Invalid stake amount');
        } else {
            onStake(_amount);
            onClose();
        }
    }

    const handleSetMax = () => {
        const _balance = numberWithDecimals(userBalance, stakeToken.decimals, Config.Utils.decimals, true);
        setStakeAmount(_balance.toString());
    }

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>
                <span>
                    {dialogTitle}
                </span>
            </DialogTitle>
            <DialogContent>
                <span>
                    Your {stakeToken.symbol} Balance is&nbsp;
                    <b>{numberWithDecimals(userBalance, stakeToken.decimals, Config.Utils.decimals)}</b>&nbsp;
                </span>
                <hr />
                <div>
                    <Button onClick={handleSetMax} color='primary' variant='outlined' size='medium'>
                        Max</Button>&nbsp;
                    <TextField
                        variant='outlined' type='number' size='small'
                        placeholder='Enter amount to stake'
                        onChange={(event) => setStakeAmount(event.target.value)}
                        value={stakeAmount}
                        required
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleStake} >
                    Stake
                </Button>
                <Button onClick={onClose} >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
};

export default StakeDialog;
