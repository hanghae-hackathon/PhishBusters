import styled from 'styled-components';
import { AddPeople, AudioMuted, Keypad, Message, Phone, Sound, VideoPlus, Voicemail } from '../../components/icons';
import { useEffect, useState } from 'react';
import { CircularProgress } from '../../components/CircleProgress';
import BlackScreen from '../../components/BlackScreen';
import { useNavigate } from 'react-router-dom';

const Result = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [progress, setProgress] = useState(15);
  const [result, setResult] = useState(JSON.parse(localStorage.getItem('result')));
  const [score, setScore] = useState(0);

  const navigate = useNavigate();

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

  useEffect(() => {
    const scoreString = result.chat_gpt.split('\n')[0]; // "보이스피싱 점수: 9"
    setScore(scoreString.replace(/[^0-9]/g, '')); // "9"

    return () => {
      localStorage.removeItem('result');
    };
  }, [result]);

  const goToHome = () => {
    navigate('/home');
    localStorage.removeItem('result');
  };
  return (
    <Container>
      <BlackScreen />
      <Box>
        <CircularProgress progress={`${score}0`} />
        {result.model_result === '일반' ? (
          <h3>해당 통화는 의심스러운 활동이 감지되지 않았습니다.</h3>
        ) : (
          <h3>해당 통화는 의심스러운 활동이 감지되었습니다.</h3>
        )}
        <SuspicionBox>
          {result.chat_gpt.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </SuspicionBox>
      </Box>
      <ButtonBox buttonstate={progress >= 30 ? 0 : 1}>
        {progress >= 30 && <Button color='#EB5544'>신고</Button>}
        <Button onClick={goToHome} color='#67CE68'>
          확인
        </Button>
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

  margin-top: 2rem;

  h3 {
    font-size: 1rem;
    color: white;
    margin-top: 1rem;
    font-weight: bold;
    padding: 0 1rem;
  }

  p {
    font-size: 1rem;
    margin-bottom: 0.1rem;
    color: white;
    font-weight: bold;
  }
`;

const SuspicionBox = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  padding: 0 1rem;
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
