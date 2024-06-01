import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AudioAnalyser from 'react-audio-analyser';
import { postWithFormData } from '../../api';
import { AddPeople, AudioMuted, Keypad, Message, Phone, Sound, VideoPlus, Voicemail } from '../../components/icons';
import styled from 'styled-components';

const Call = () => {
  const navigate = useNavigate();

  const [isReceive, setIsReceive] = useState(false);
  const [isRoading, setIsRoading] = useState(false);

  const [status, setStatus] = useState('');
  const [audioSrc, setAudioSrc] = useState('');

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  let timer = useRef();

  useEffect(() => {
    if (isRoading) {
      clearInterval(timer.current);
    }

    return () => {
      clearInterval(timer.current);
    };
  }, [isRoading]);

  const controlAudio = (status) => {
    setStatus(status);
  };

  const audioProps = {
    audioType: 'audio/wav',
    status,
    audioSrc,
    timeslice: 1000,
    startCallback: (e) => {
      console.log('succ start', e);

      timer.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds >= 59) {
            setMinutes((prevMinutes) => prevMinutes + 1);
            return 0;
          } else {
            return prevSeconds + 1;
          }
        });
      }, 1000);
    },
    pauseCallback: (e) => {
      console.log('succ pause', e);
    },
    stopCallback: (e) => {
      console.log('succ stop', e);
      setAudioSrc(window.URL.createObjectURL(e));
      submitWavFile(window.URL.createObjectURL(e));
    },
    onRecordCallback: (e) => {
      console.log('recording', e);
    },
    errorCallback: (err) => {
      console.log('error', err);
    },
  };

  // const downloadWavFile = () => {
  //   const a = document.createElement('a');
  //   a.style.display = 'none';
  //   a.href = audioSrc;
  //   a.download = 'recording.wav';
  //   document.body.appendChild(a);
  //   a.click();
  //   window.URL.revokeObjectURL(audioSrc);
  //   document.body.removeChild(a);
  // };

  const submitWavFile = async (blobUrl) => {
    const blobRes = await fetch(blobUrl);
    const blob = await blobRes.blob();

    const file = new File([blob], 'recording.wav', { type: 'audio/wav' });

    const formData = new FormData();
    formData.append('audio', file);

    try {
      console.log('send', formData);
      const res = await postWithFormData('phishing_detection', formData);

      if (res.status === 200) {
        localStorage.setItem('result', JSON.stringify(res.data));
        console.log(res, 'res');
      } else {
        localStorage.removeItem('result');
        console.error('서버로부터 오류 응답을 받았습니다.');
        console.log(res);
      }
    } catch (error) {
      localStorage.removeItem('result');
      console.error('오류 발생:', error);
    } finally {
      navigate('/result');
    }
  };

  return (
    <Container isReceive={isReceive} isRoading={isRoading}>
      <>
        {isReceive ? (
          <CallBox>
            <p>
              {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </p>
            <h3>010-1234-5678</h3>
          </CallBox>
        ) : (
          <CallBox>
            <p>mobile</p>
            <h3>010-1234-5678</h3>
          </CallBox>
        )}
        <>
          <AudioAnalyser {...audioProps}>
            {isRoading ? (
              <>
                <img src='src/assets/gif/loading.gif' alt='loading_gif' />
              </>
            ) : (
              <>
                {isReceive ? (
                  <>
                    <MessageBox margin='auto'>
                      <TextBox>
                        <Sound />
                        <Text>Audio</Text>
                      </TextBox>
                      <TextBox>
                        <VideoPlus />
                        <Text>FaceTime</Text>
                      </TextBox>
                      <TextBox>
                        <AudioMuted />
                        <Text>Mute</Text>
                      </TextBox>
                    </MessageBox>
                    <PhoneBox margin='0rem'>
                      <TextBox>
                        <AddPeople />
                        <Text>Add</Text>
                      </TextBox>
                      <TextBox>
                        <Keypad />
                        <Text>Keypad</Text>
                      </TextBox>
                      <TextBox>
                        <Phone
                          color='red'
                          onClick={() => {
                            controlAudio('inactive');
                            setIsRoading(true);
                          }}
                        />
                        <Text>End</Text>
                      </TextBox>
                    </PhoneBox>
                  </>
                ) : (
                  <>
                    <MessageBox margin='auto'>
                      <TextBox>
                        <Message />
                        <Text>message</Text>
                      </TextBox>
                      <TextBox>
                        <Voicemail />
                        <Text>voicemail</Text>
                      </TextBox>
                    </MessageBox>
                    <PhoneBox margin='0rem'>
                      <TextBox>
                        <Phone color='red' />
                        <Text>Decline</Text>
                      </TextBox>
                      <TextBox>
                        <Phone
                          color='green'
                          onClick={() => {
                            setIsReceive(true);
                            controlAudio('recording');
                          }}
                        />
                        <Text>Accept</Text>
                      </TextBox>
                    </PhoneBox>
                  </>
                )}
              </>
            )}
          </AudioAnalyser>
        </>
      </>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  background-image: url(/src/assets/images/background/call.jpg);
  background-size: cover;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  img {
    width: 100px;
    margin: 0 auto;
  }

  .audioContainer {
    display: flex;
    flex-direction: column;
    height: 60%;
    audio {
      display: none;
    }
    canvas {
      display: ${(props) => (props.isReceive && !props.isRoading ? 'inline-block' : 'none')};
    }
  }
`;

const CallBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 5rem;

  p {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #b0b0b8;
  }
  h3 {
    font-size: 2rem;
    color: white;
  }
`;

const MessageBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: ${(props) => props.margin};
  margin-bottom: 3rem;
  width: 75%;
`;

const PhoneBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: ${(props) => props.margin};
  margin-bottom: 3rem;
  width: 75%;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;
const Text = styled.p`
  color: white;
`;
export default Call;
