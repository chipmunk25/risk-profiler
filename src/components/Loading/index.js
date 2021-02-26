import React from 'react';

import { BallClipRotatePulse } from 'react-pure-loaders';
import "./style.scss"
const LoadingProgress = ({ loading, className }) => <div className="chip-loader">
    <BallClipRotatePulse
        color={'#062D40'}
        bdColor={'#062D40'}
        loading={loading}
        size={10}
    />
</div>



export default LoadingProgress;