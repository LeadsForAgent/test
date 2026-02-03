
let audioCtx: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

/**
 * Playful, romantic success sound (harp-like arpeggio)
 */
export const playRomanticSuccess = () => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + i * 0.1);

    gain.gain.setValueAtTime(0, now + i * 0.1);
    gain.gain.linearRampToValueAtTime(0.1, now + i * 0.1 + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 1.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + i * 0.1);
    osc.stop(now + i * 0.1 + 1.5);
  });
};

/**
 * Synthesized "Crowd Boo" effect using filtered noise and low oscillators
 */
export const playCrowdBoo = () => {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  const duration = 1.2;

  // 1. Noise component for the "shhh/roar" of a crowd
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = buffer;

  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = 'lowpass';
  noiseFilter.frequency.setValueAtTime(800, now);
  noiseFilter.frequency.exponentialRampToValueAtTime(200, now + duration);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0, now);
  noiseGain.gain.linearRampToValueAtTime(0.08, now + 0.2);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  noiseSource.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ctx.destination);

  // 2. Low "Booo" vocal component
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(120, now);
  osc.frequency.exponentialRampToValueAtTime(80, now + duration);

  const oscFilter = ctx.createBiquadFilter();
  oscFilter.type = 'lowpass';
  oscFilter.frequency.value = 300;
  oscFilter.Q.value = 5;

  oscGain.gain.setValueAtTime(0, now);
  oscGain.gain.linearRampToValueAtTime(0.1, now + 0.3);
  oscGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  osc.connect(oscFilter);
  oscFilter.connect(oscGain);
  oscGain.connect(ctx.destination);

  noiseSource.start(now);
  osc.start(now);
  osc.stop(now + duration);
};

// Keep legacy export names if needed for compatibility, but updated functionality
export const playChime = playRomanticSuccess;
export const playBoo = playCrowdBoo;
