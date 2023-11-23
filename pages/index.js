// pages/video.js

import { useEffect, useRef } from 'react';
import LocalVideo from '../components/LocalVideo';
import RemoteVideo from '../components/RemoteVideo';

export default function Video() {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const peerConnectionRef = useRef(null); // using useRef for peerConnection
    const config = {
        iceServers: [
            {
                urls: 'stun:stun.l.google.com:19302'
            }
        ]
    };

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                localVideoRef.current.srcObject = stream;
                peerConnectionRef.current = new RTCPeerConnection(config); // Assign to peerConnectionRef.current
                stream.getTracks().forEach(track => {
                    peerConnectionRef.current.addTrack(track, stream);
                });

                peerConnectionRef.current.ontrack = event => {
                    remoteVideoRef.current.srcObject = event.streams[0];
                };

                // Implement signaling here (exchange of offer/answer and ICE candidates)

            }).catch(e => console.log(e));

        // Return cleanup function to close peer connection when component unmounts
        return () => {
            if (peerConnectionRef.current) {
                peerConnectionRef.current.close();
            }
        };
    }, []);

    return (
        <div>
            <LocalVideo ref={localVideoRef} />
            <RemoteVideo ref={remoteVideoRef} />
        </div>
    );
}
