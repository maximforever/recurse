// midi stuff

if (navigator.requestMIDIAccess) {
    console.log('This browser supports WebMIDI!');
} else {
    console.log('WebMIDI is not supported in this browser.');
}

navigator.requestMIDIAccess()
    .then(onMIDISuccess, onMIDIFailure);

// function onMIDISuccess(midiAccess) {
//     console.log(midiAccess);

//     var inputs = midiAccess.inputs;
//     var outputs = midiAccess.outputs;
  
//     console.log(midiAccess.inputs);
//     console.log(midiAccess.outputs);
  
// }

function onMIDIFailure() {
    console.log('Could not access your MIDI devices.');
}



// for legacy browsers
const AudioContext = window.AudioContext || window.webkitAudioContext;

const audioCtx = new AudioContext();

// Try making an oscillator
const osc = audioCtx.createOscillator();
osc.type = 'sin';
osc.start();
const gainNode = audioCtx.createGain();

// connect the gain node to the oscillator & the audio context
osc.connect(gainNode);
gainNode.connect(audioCtx.destination);



function playFrequency(freq, velocity){
  
  //osc.connect(audioCtx.destination);
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime); 
  gainNode.gain.value = velocity/127;
}


function onMIDISuccess(midiAccess) {

  console.log(midiAccess.inputs);
  console.log(midiAccess.outputs);

  for (var input of midiAccess.inputs.values())
      input.onmidimessage = getMIDIMessage;
}

function getMIDIMessage(midiMessage) {
    // console.log(midiMessage.data);
    let code = midiMessage.data[1];
    let freq = codeToFrequency(code);
  // CALL FUNCTION TO PLAY SOUND ... or do whatever with it :)
  
    
    playFrequency(freq, midiMessage.data[2]);
}

function codeToFrequency(code) {
    let semitoneRatio = 2 ** (1/12);
    let baselineFrequency = 27.5;
    let baselineCode = 21; // MIDI code for lowest note on keyboard
    let stepsAboveBaseline = code - baselineCode;
    
    return baselineFrequency * (semitoneRatio ** stepsAboveBaseline);
}