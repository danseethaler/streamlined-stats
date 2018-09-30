import {flatten} from 'lodash';
import numberAlternates from '../../services/numberAlternates';

export const getJerseyVoiceAlternatives = (jerseys: number[]): string[] =>
  flatten(jerseys.map(jersey => numberAlternates[jersey] || []));

export const recordAudio = () =>
  new Promise(async resolve => {
    const stream = await navigator.mediaDevices.getUserMedia({audio: true});
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks = [];

    mediaRecorder.addEventListener('dataavailable', event => {
      audioChunks.push(event.data);
    });

    const start = () => {
      audioChunks.splice(0, audioChunks.length);
      mediaRecorder.start();
    };

    const stop = () =>
      new Promise(resolveStop => {
        const stopHandler = () => {
          mediaRecorder.removeEventListener('stop', stopHandler);

          const audioBlob = new Blob(audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);
          resolveStop(audioUrl);
        };

        mediaRecorder.addEventListener('stop', stopHandler);

        mediaRecorder.stop();
      });

    resolve({start, stop});
  });
