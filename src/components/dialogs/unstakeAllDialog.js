import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from '@material-ui/core';
import { numberWithDecimals } from 'utils';
import Config from 'lib/config';

const UnstakeAllDialog = ({
    open,
    dialogTitle,
    staked,
    stakeToken,
    onClose,
    onUnstakeAll,
}) => {

    const unstakeAll = ()=>{
        onUnstakeAll();
        onClose();
    }
    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>
                <span>
                    {dialogTitle}
                </span>
            </DialogTitle>
            <DialogContent>
                <div>
                    Are you sure want to unstake all &nbsp;
                    <b>{numberWithDecimals(staked, stakeToken.decimals, Config.Utils.decimals)}?</b>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={unstakeAll} >
                    Withdraw All
                </Button>
                <Button onClick={onClose} >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
};

export default UnstakeAllDialog;
