import styled from 'styled-components';
import { AddPeople, AudioMuted, Keypad, Message, Phone, Sound, VideoPlus, Voicemail } from '../../components/icons';
import { useEffect, useState } from 'react';
import { CircularProgress } from '../../components/CircleProgress';
import BlackScreen from '../../components/BlackScreen';

const Result = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const [progress, setProgress] = useState(51);

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
      <BlackScreen />
      <Box>
        <CircularProgress progress={progress} />
        <h3>해당 통화는 의심스러운 활동이 감지되지 않았습니다.</h3>
        <SuspicionBox>
          <p>의심되는 주요 단어</p>
          <p>의심되는 주요 문장</p>
          <p>의심되는 보이스 피싱 목소리 패턴</p>
        </SuspicionBox>
      </Box>
      <ButtonBox buttonstate={progress >= 30 ? 0 : 1}>
        {progress >= 30 && <Button color='#EB5544'>신고</Button>}
        <Button color='#67CE68'>확인</Button>
      </ButtonBox>
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

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;

  margin-top: 5rem;

  h3 {
    font-size: 1rem;
    color: white;
    margin-top: 1rem;
  }

  p {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: white;
  }
`;

const SuspicionBox = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const ButtonBox = styled.div`
  margin: auto auto 5rem auto;
  display: flex;
  justify-content: ${(props) => (props.buttonstate === 0 ? 'space-between' : 'center')};
  align-items: center;
  width: 75%;
`;

const Button = styled.button`
  width: 5rem;
  height: 3rem;

  background-color: ${(props) => props.color};
  border-radius: 20%;
  color: white;
`;

export default Result;
