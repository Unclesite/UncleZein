// Web Audio API Procedural Soundscape Generator
class SoundscapeEngine {
  private ctx: AudioContext | null = null;
  private currentMode: 'ocean' | 'wind' | 'fire' | null = null;
  private isPlaying: boolean = false;
  private activeNodes: (AudioNode | number)[] = [];

  private initCtx() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play(mode: 'ocean' | 'wind' | 'fire') {
    this.initCtx();
    if (!this.ctx) return;

    if (this.isPlaying && this.currentMode === mode) {
      this.stop();
      return;
    }

    this.stop();
    this.currentMode = mode;
    this.isPlaying = true;

    if (mode === 'ocean') {
      this.playOcean();
    } else if (mode === 'wind') {
      this.playWind();
    } else if (mode === 'fire') {
      this.playFire();
    }
  }

  private playOcean() {
    if (!this.ctx) return;
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(250, this.ctx.currentTime);

    // LFO for wave swelling
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime); // 8-second wave cycle

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(180, this.ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(this.ctx.destination);

    whiteNoise.start();
    lfo.start();

    this.activeNodes.push(whiteNoise, lfo, masterGain, filter);
  }

  private playWind() {
    if (!this.ctx) return;
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(400, this.ctx.currentTime);
    filter.Q.setValueAtTime(3.0, this.ctx.currentTime);

    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.2, this.ctx.currentTime);

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(220, this.ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.07, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(this.ctx.destination);

    whiteNoise.start();
    lfo.start();

    this.activeNodes.push(whiteNoise, lfo, masterGain, filter);
  }

  private playFire() {
    if (!this.ctx) return;
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.5;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, this.ctx.currentTime);

    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.06, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(this.ctx.destination);

    noise.start();
    this.activeNodes.push(noise, masterGain, filter);
  }

  public stop() {
    this.activeNodes.forEach((node) => {
      if (typeof node === 'object' && 'stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
        try {
          (node as AudioScheduledSourceNode).stop();
        } catch {
          // ignore
        }
      }
      if (typeof node === 'object' && 'disconnect' in node && typeof (node as AudioNode).disconnect === 'function') {
        try {
          (node as AudioNode).disconnect();
        } catch {
          // ignore
        }
      }
    });
    this.activeNodes = [];
    this.isPlaying = false;
    this.currentMode = null;
  }

  public getStatus() {
    return { isPlaying: this.isPlaying, currentMode: this.currentMode };
  }
}

export const soundscape = new SoundscapeEngine();
