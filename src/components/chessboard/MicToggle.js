import React from 'react';
import micOn from '../../assets/images/micOn.svg';
import micOff from '../../assets/images/micOff.svg';
import SpeakerOn from '../../assets/images/SpeakerOn.svg';
import SpeakerOff from '../../assets/images/SpeakerOff.svg';

function MicToggle({ isMicEnabled, toggleMic, isSpeakerEnabled, toggleSpeaker }) {
    return (
        <div className='control-container'>
            <div className="control-label">Audio</div>
            <div className="MSPK">
            <button className='Mic' onClick={toggleMic}>
                {isMicEnabled ? 
                    <img src={micOff} alt="Mic Off" /> : 
                    <img src={micOn} alt="Mic On" />
                }
            </button>

            <button className='Speaker' onClick={toggleSpeaker}>
                {isSpeakerEnabled ? 
                    <img src={SpeakerOn} alt="Speaker On" />:
                    <img src={SpeakerOff} alt="Speaker Off" /> 
                }
            </button>
            </div>
       </div>
    );
}

export default MicToggle;
