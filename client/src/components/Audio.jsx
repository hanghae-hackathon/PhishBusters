import React, { useEffect, useRef } from 'react';
import { saveAs } from 'file-saver';

function Audio() {
  const audioContextRef = useRef(null);
  const scriptProcessorRef = useRef(null);
  const savedAudioRef = useRef([]);

  const handlePlay = async () => {
    try {
      // Create AudioContext
      const audioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
      audioContextRef.current = audioContext;

      // Get user media (microphone)
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Create media stream source node
      const source = audioContext.createMediaStreamSource(stream);

      // Create ScriptProcessorNode for real-time recording
      const bufferSize = 4096;
      const scriptProcessorNode = audioContext.createScriptProcessor(bufferSize, 1, 1);
      scriptProcessorRef.current = scriptProcessorNode;

      // Process audio data in real-time
      scriptProcessorNode.onaudioprocess = (event) => {
        const inputBuffer = event.inputBuffer;
        // You can process and store the inputBuffer data here (e.g., save to file, analyze, etc.)
        savedAudioRef.current.push(inputBuffer.getChannelData(0)); // Save the audio data
      };

      // Connect the source to the script processor
      source.connect(scriptProcessorNode);

      // Connect the script processor to the AudioContext destination (speakers)
      scriptProcessorNode.connect(audioContext.destination);
    } catch (error) {
      console.error('Error initializing audio:', error);
    }

    // Create BufferSourceNode for playback
    const audioContext = audioContextRef.current;
    const buffer = audioContext.createBufferSource();

    // Create an empty buffer
    const bufferLength = audioContext.sampleRate * 1; // 1 second
    const audioBuffer = audioContext.createBuffer(1, bufferLength, audioContext.sampleRate);

    // Fill the buffer with audio data (e.g., sine wave)
    const channelData = audioBuffer.getChannelData(0);
    for (let i = 0; i < bufferLength; i++) {
      channelData[i] = Math.sin(2 * Math.PI * 440 * (i / audioContext.sampleRate)); // 440 Hz sine wave
    }

    // Set the buffer to BufferSourceNode
    buffer.buffer = audioBuffer;

    // Connect the BufferSourceNode to the AudioContext destination (speakers)
    buffer.connect(audioContext.destination);

    // Start playback
    buffer.start();
  };

  const handleOutput = () => {
    // Output saved audio

    const audioData = savedAudioRef.current;

    // saveAs(data, 'recorded_audio.wav');
    console.log(audioData, 'audioData');
  };

  useEffect(() => {
    // Cleanup function
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div>
      <button style={{ color: 'white' }} onClick={handlePlay}>
        Play
      </button>
      <button style={{ color: 'white' }} onClick={handleOutput}>
        Output
      </button>
    </div>
  );
}

export default Audio;
