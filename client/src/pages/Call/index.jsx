import { useState, useEffect } from 'react';
import styled from 'styled-components';
import AudioAnalyser from 'react-audio-analyser';

const Call = () => {
  const [status, setStatus] = useState('');
  const [audioSrc, setAudioSrc] = useState('');
  const [audioType, setAudioType] = useState('audio/wav');

  const controlAudio = (status) => {
    setStatus(status);
  };

  const changeScheme = (e) => {
    setAudioType(e.target.value);
  };

  useEffect(() => {
    setAudioType('audio/wav');
  }, []);

  const audioProps = {
    audioType,
    status,
    audioSrc,
    timeslice: 1000,
    startCallback: (e) => {
      console.log('succ start', e);
    },
    pauseCallback: (e) => {
      console.log('succ pause', e);
    },
    stopCallback: (e) => {
      setAudioSrc(window.URL.createObjectURL(e));
      console.log('succ stop', e);
    },
    onRecordCallback: (e) => {
      console.log('recording', e);
    },
    errorCallback: (err) => {
      console.log('error', err);
    },
  };

  const downloadWavFile = () => {
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = audioSrc;
    a.download = 'recording.wav';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(audioSrc);
    document.body.removeChild(a);
  };

  return (
    <CallBox>
      <section className='text-wrapper'>
        <p>02-345-2345</p>
        <span>00:03</span>
      </section>
      <section className='btn-wrapper'>
        <AudioAnalyser {...audioProps}>
          <button className='btn' onClick={() => controlAudio('recording')}>
            통화
          </button>
          <button className='btn' onClick={() => controlAudio('paused')}>
            Pause
          </button>
          <button className='btn' onClick={() => controlAudio('inactive')}>
            종료
          </button>
          <button className='btn' onClick={() => downloadWavFile()}>
            다운로드
          </button>
        </AudioAnalyser>
      </section>
    </CallBox>
  );
};

const CallBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  background-image: url(/src/assets/images/background/call.jpg);
  background-size: cover;
  overflow: hidden;

  .text-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      font-size: 30px;
      font-weight: bold;
      color: white;
      margin-bottom: 10px;
    }
    span {
      font-size: 25px;
      color: #d9d9d9;
    }
  }

  .btn-wrapper {
    .audioContainer {
      display: flex;
      flex-direction: column;
      button {
        color: white;
        font-size: 40px;
      }
    }
  }

  .audio {
    height: 300px;
  }
`;

export default Call;
