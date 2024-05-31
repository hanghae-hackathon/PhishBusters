import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Audio from '../../components/Audio';

const Home = () => {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => clearInterval(interval);
  });

  return (
    <HomeBox>
      <Time>{new Date(time).toLocaleTimeString('it-IT')}</Time>
      <Audio />
    </HomeBox>
  );
};

const HomeBox = styled.div`
  height: 100vh;
  background-image: url(/src/assets/images/background/home.jpg);
  background-size: cover;
  overflow: hidden;
`;

const Time = styled.h1`
  color: white;
  font-size: 3rem;
  text-align: center;
  margin-top: 20vh;
  transform: translateY(-50%);
`;
export default Home;
