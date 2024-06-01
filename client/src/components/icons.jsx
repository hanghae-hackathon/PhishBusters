import { IoCall } from 'react-icons/io5';
import { AiOutlineAudioMuted } from 'react-icons/ai';
import { IoIosKeypad } from 'react-icons/io';
import { IoPersonAddSharp } from 'react-icons/io5';
import { BiSolidVideoPlus } from 'react-icons/bi';
import { AiOutlineSound } from 'react-icons/ai';
import { BiSolidMessageRounded } from 'react-icons/bi';
import { MdOutlineVoicemail } from 'react-icons/md';
import styled from 'styled-components';

export const Voicemail = () => {
  return (
    <MessageBox>
      <MdOutlineVoicemail />
    </MessageBox>
  );
};

export const Message = () => {
  return (
    <MessageBox>
      <BiSolidMessageRounded />
    </MessageBox>
  );
};

export const Phone = ({ color }) => {
  return (
    <PhoneBox color={color}>
      <RotatedIoCall rotate={color === 'red' ? 0 : 1} />
    </PhoneBox>
  );
};

export const Keypad = () => {
  return (
    <IconBox>
      <IoIosKeypad />
    </IconBox>
  );
};

export const AudioMuted = () => {
  return (
    <IconBox>
      <AiOutlineAudioMuted />
    </IconBox>
  );
};

export const AddPeople = () => {
  return (
    <IconBox>
      <IoPersonAddSharp />
    </IconBox>
  );
};

export const VideoPlus = () => {
  return (
    <IconBox>
      <BiSolidVideoPlus />
    </IconBox>
  );
};

export const Sound = () => {
  return (
    <IconBox>
      <AiOutlineSound />
    </IconBox>
  );
};

const IconBox = styled.div`
  background-color: rgba(0, 0, 0, 0.26);
  border-radius: 100%;
  padding: 0.5rem;

  width: 4rem;
  height: 4rem;

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
  font-size: 2rem;

  cursor: pointer;
`;
const MessageBox = styled.div`
  background-color: rgba(0, 0, 0, 0.26);
  border-radius: 100%;
  padding: 0.5rem;

  width: 3rem;
  height: 3rem;

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
  font-size: 1.5rem;

  cursor: pointer;
`;

const PhoneBox = styled.div`
  background-color: ${(props) => (props.color === 'red' ? '#EB5544' : '#67CE68')};
  border-radius: 100%;
  padding: 0.5rem;

  width: 4rem;
  height: 4rem;

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
  font-size: 2rem;

  cursor: pointer;
`;

const RotatedIoCall = styled(IoCall)`
  transform: ${(props) => (props.rotate === 0 ? 'rotate(135deg)' : 'rotate(0deg)')};
`;
