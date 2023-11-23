// components/LocalVideo.js

import React, { forwardRef } from 'react';

const LocalVideo = forwardRef((props, ref) => {
    return <video ref={ref} autoPlay playsInline />;
});

LocalVideo.displayName = 'LocalVideo';

export default LocalVideo;
