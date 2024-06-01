import styled from 'styled-components';
import { Message, Phone, Voicemail } from '../../components/icons';

const Ringing = () => {
  return (
    <Container>
      <CallBox>
        <p>휴대전화</p>
        <h3>010-1234-5678</h3>
      </CallBox>
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
          <Phone color='green' />
          <Text>Accept</Text>
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
export default Ringing;
