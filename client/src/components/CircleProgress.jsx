import styled from 'styled-components';

export const CircularProgress = ({ progress }) => {
  const strokeDasharray = progress <= 30 ? '100 0' : `${progress} ${100 - progress}`;

  return (
    <CircleWrapper>
      <Svg viewBox='0 0 36 36'>
        {/* <CircleBackground
          d='M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831'
        /> */}
        <CircleForeground
          progress={progress}
          strokeDasharray={strokeDasharray}
          d='M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831'
        />
        <Text x='18' y='20.35'>{`${progress}%`}</Text>
      </Svg>
    </CircleWrapper>
  );
};

const CircleWrapper = styled.div`
  display: inline-block;
  margin: 0 auto;
  width: 100px;
  height: 100px;
`;

const Svg = styled.svg`
  width: 100%;
  height: 100%;
`;

const CircleBackground = styled.path`
  fill: none;
  stroke-width: 3.8;
  stroke: #e6e6e6;
`;

const CircleForeground = styled.path`
  fill: none;
  stroke-width: 3.8;
  stroke: ${(props) => (props.progress >= 30 ? '#EB5544' : '#67CE68')};
  transition: stroke-Dasharray 0.3s;
  stroke-linecap: round;
`;

const Text = styled.text`
  fill: white;
  font-size: 0.5em;
  text-anchor: middle;
`;
