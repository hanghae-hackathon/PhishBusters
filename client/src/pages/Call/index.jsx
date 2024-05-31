import styled from 'styled-components';

const Call = () => {
  return (
    <CallBox>
      <section className='text-wrapper'>
        <p>02-345-2345</p>
        <span>00:03</span>
      </section>
      <section className='btn-wrapper'>
        <button>통화</button>
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
    button {
      color: white;
      font-size: 40px;
    }
  }
`;

export default Call;
