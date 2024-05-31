import { useCallback, useState } from 'react';
import styled from 'styled-components';
import WaveStream from '../../../react-wave-stream/dist';
import Recorder from '../../../recorder/lib/Recorder';

const Call = () => {
  // const [stream, setStream] = useState();
  // const [media, setMedia] = useState();
  // const [onRec, setOnRec] = useState(true);
  // const [source, setSource] = useState();
  // const [analyser, setAnalyser] = useState();
  // const [audioUrl, setAudioUrl] = useState();
  // const [downloadUrl, setDownloadUrl] = useState();

  // const onRecAudio = () => {
  //   // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
  //   const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  //   // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
  //   const analyser = audioCtx.createScriptProcessor(0, 1, 1);
  //   setAnalyser(analyser);

  //   function makeSound(stream) {
  //     // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
  //     const source = audioCtx.createMediaStreamSource(stream);
  //     setSource(source);

  //     // 모노 채널로 변환
  //     const channelMerger = audioCtx.createChannelMerger(1);
  //     // source.connect(analyser);
  //     // analyser.connect(audioCtx.destination);
  //     source.connect(channelMerger);
  //     channelMerger.connect(analyser);
  //     analyser.connect(audioCtx.destination);
  //   }
  //   // 마이크 사용 권한 획득
  //   navigator.mediaDevices
  //     .getUserMedia({ audio: { sampleRate: 16000, channelCount: 1, type: 'wav' } })
  //     .then((stream) => {
  //       const mediaRecorder = new MediaRecorder(stream);
  //       mediaRecorder.start();
  //       setStream(stream);
  //       setMedia(mediaRecorder);
  //       makeSound(stream);

  //       analyser.onaudioprocess = function (e) {
  //         // 3분(180초) 지나면 자동으로 음성 저장 및 녹음 중지
  //         if (e.playbackTime > 180) {
  //           stream.getAudioTracks().forEach(function (track) {
  //             track.stop();
  //           });
  //           mediaRecorder.stop();
  //           // 메서드가 호출 된 노드 연결 해제
  //           analyser.disconnect();
  //           audioCtx.createMediaStreamSource(stream).disconnect();

  //           mediaRecorder.ondataavailable = function (e) {
  //             setAudioUrl(e.data);
  //             setOnRec(true);
  //           };
  //         } else {
  //           setOnRec(false);
  //         }
  //       };
  //     });
  // };

  // // 사용자가 음성 녹음을 중지했을 때
  // const offRecAudio = () => {
  //   // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
  //   media.ondataavailable = function (e) {
  //     setAudioUrl(e.data);
  //     setOnRec(true);
  //   };

  //   // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
  //   stream.getAudioTracks().forEach(function (track) {
  //     track.stop();
  //   });

  //   // 미디어 캡처 중지
  //   media.stop();
  //   // 메서드가 호출 된 노드 연결 해제
  //   analyser.disconnect();
  //   source.disconnect();
  // };

  // const onSubmitAudioFile = useCallback(() => {
  //   if (audioUrl) {
  //     setDownloadUrl(URL.createObjectURL(audioUrl)); // 출력된 링크에서 녹음된 오디오 확인 가능
  //     console.log(URL.createObjectURL(audioUrl)); // 출력된 링크에서 녹음된 오디오 확인 가능
  //   }
  //   // File 생성자를 사용해 파일로 변환
  //   const sound = new File([audioUrl], 'soundBlob', { lastModified: new Date().getTime(), type: 'audio' });
  //   console.log(sound); // File 정보 출력

  //   const downloadWavFile = () => {
  //     const url = URL.createObjectURL(audioUrl);
  //     const a = document.createElement('a');
  //     a.style.display = 'none';
  //     a.href = url;
  //     a.download = 'recording.wav';
  //     document.body.appendChild(a);
  //     a.click();
  //     window.URL.revokeObjectURL(url);
  //     document.body.removeChild(a);
  //   };

  //   // 다운로드 링크가 생성된 후 호출
  //   downloadWavFile();
  // }, [audioUrl]);

  const [blob, setBlob] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState(null);
  const [analyserData, setAnalyserData] = useState({ data: [], lineTo: 0 });

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const recorder = new Recorder(audioContext, {
    onAnalysed: (data) => setAnalyserData(data),
  });

  useEffect(() => {
    const initRecorder = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setStream(stream);
        recorder.init(stream);
      } catch (error) {
        console.error('Failed to get stream', error);
      }
    };

    initRecorder();

    // 컴포넌트가 언마운트될 때 녹음 중지
    return () => {
      recorder.stop();
    };
  }, [recorder]);

  const start = async () => {
    try {
      await recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  };

  const stop = async () => {
    try {
      const { blob } = await recorder.stop();
      setBlob(blob);
      setIsRecording(false);
    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  };

  const download = () => {
    Recorder.download(blob, 'react-audio');
    setBlob(null);
  };
  return (
    <CallBox>
      <section className='text-wrapper'>
        <p>02-345-2345</p>
        <span>00:03</span>
      </section>
      <section className='btn-wrapper'>
        <button onClick={start}>통화</button>
        <button onClick={stop}>종료</button>
        <button onClick={download}>제출</button>
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
    display: flex;
    flex-direction: column;
    button {
      color: white;
      font-size: 40px;
    }
  }
`;

export default Call;
