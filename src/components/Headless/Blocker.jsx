import React from 'react';
import PropTypes from 'prop-types';
import useBlockUrl from '../../shared/hooks/useBlockUrl';
const Blocker = ({BlockedItem , isRunning}) => {
    useBlockUrl(BlockedItem , isRunning);
    return (
        <></>
    );
};



export default Blocker;