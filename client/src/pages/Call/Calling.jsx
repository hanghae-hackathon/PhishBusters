import { useEffect, useState } from 'react';
import AudioAnalyser from 'react-audio-analyser';
import { AddPeople, AudioMuted, Keypad, Message, Phone, Sound, VideoPlus, Voicemail } from '../../components/icons';
import styled from 'styled-components';

const Calling = ({ controlAudio, audioProps }) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds >= 59) {
          setMinutes((prevMinutes) => prevMinutes + 1);
          return 0;
        } else {
          return prevSeconds + 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <CallBox>
        <p>
          {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </p>
        <h3>010-1234-5678</h3>
      </CallBox>
      <AudioAnalyser {...audioProps}></AudioAnalyser>
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
          <Phone color='red' onClick={() => controlAudio('inactive')} />
          <Text>End</Text>
        </TextBox>
      </PhoneBox>
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
export default Calling;
