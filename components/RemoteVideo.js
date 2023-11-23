// components/RemoteVideo.js

import React, { forwardRef } from 'react';

const RemoteVideo = forwardRef((props, ref) => {
    return <video ref={ref} autoPlay playsInline />;
});

RemoteVideo.displayName = 'RemoteVideo';

export default RemoteVideo;
