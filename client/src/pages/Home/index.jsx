import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { IoIosFlashlight } from 'react-icons/io';
import { IoIosCamera } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import BlackScreen from '../../components/BlackScreen';

const dayList = ['일', '월', '화', '수', '목', '금', '토'];
const Home = () => {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }).replace(/^0+/, '')
  );
  const [month, setMonth] = useState(new Date().getMonth());
  const [day, setDay] = useState(new Date().getDay());
  const [date, setDate] = useState(new Date().getDate());

  const navigate = useNavigate();

  useEffect(() => {
    // console.log(new Date());
    const interval = setInterval(() => {
      const _time = new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }).replace(/^0+/, '');
      setTime(_time);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const onClickBackGround = () => {
    setTimeout(() => {
      navigate('/call');
    }, 1000);
  };

  return (
    <HomeBox onClick={onClickBackGround}>
      <BlackScreen />
      <Day>
        {month + 1}월 {date}일 {dayList[day]}요일
      </Day>
      <Time>{time}</Time>

      <Bottom>
        <IconBackGround>
          <IoIosFlashlight />
        </IconBackGround>
        <IconBackGround>
          <IoIosCamera />
        </IconBackGround>
      </Bottom>
    </HomeBox>
  );
};

const HomeBox = styled.div`
  height: 100vh;
  background-image: url(/src/assets/images/background/home.png);
  background-size: cover;
  overflow: hidden;
`;

const Day = styled.h1`
  color: white;
  font-size: 2rem;
  text-align: center;
  margin-top: 10vh;
  transform: translateY(-50%);
`;

const Time = styled.h1`
  color: white;
  font-size: 6rem;
  text-align: center;
  margin-top: 5vh;
  transform: translateY(-50%);
`;

const Bottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  width: 75%;
  font-size: 2rem;
  color: white;
  margin-bottom: 5vh;
`;

const IconBackGround = styled.div`
  background-color: rgba(0, 0, 0, 0.26);
  border-radius: 50%;
  padding: 0.5rem;
  cursor: pointer;
`;
export default Home;
