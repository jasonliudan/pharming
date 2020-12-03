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
                <h3>
                    {dialogTitle}
                </h3>
            </DialogTitle>
            <DialogContent>
                <div>
                    25% of accumulated pharming rewards will be reduced as early unstake penalty.
                    Pharming rewards are claimable after conclusion of pharming event. &nbsp;
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
