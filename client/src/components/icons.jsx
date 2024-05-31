import { IoCall } from 'react-icons/io5';
import { AiOutlineAudioMuted } from 'react-icons/ai';
import { IoIosKeypad } from 'react-icons/io';
import { IoIosWifi } from 'react-icons/io';
import { IoPersonAddSharp } from 'react-icons/io5';
import { BiSolidVideoPlus } from 'react-icons/bi';
import { AiOutlineSound } from 'react-icons/ai';
import { TbMessageCircle2 } from 'react-icons/tb';
import { MdOutlineVoicemail } from 'react-icons/md';
import styled from 'styled-components';

export const Voicemail = () => {
  return (
    <IconBox>
      <MdOutlineVoicemail />
    </IconBox>
  );
};

export const Message = () => {
  return (
    <IconBox>
      <TbMessageCircle2 />
    </IconBox>
  );
};

export const Call = () => {
  return (
    <IconBox>
      <IoCall />
    </IconBox>
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
