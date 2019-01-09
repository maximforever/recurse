console.log("hey!");

// midi stuff

if (navigator.requestMIDIAccess) {
    console.log('This browser supports WebMIDI!');
} else {
    console.log('WebMIDI is not supported in this browser.');
}


// key code - frequency
var freqs = {
  "65": 261.63,   // C
  "83": 293.66,   // D
  "68": 329.63,   // E
  "70": 349.23,   // F
  "71": 392.00,   // G
  "72": 440.00,   // A
  "74": 493.88,   // B
  "75": 523.25,   // C

  "87": 277.18,   // Db
  "69": 311.13,   // Eb,
  "84": 369.99,   // Gb
  "89": 415.30,   // Ab
  "85": 466.16    // Bb,
}

var notes = {
  "65": "C",   
  "83": "D",   
  "68": "E",   
  "70": "F",   
  "71": "G",   
  "72": "A",   
  "74": "B",   
  "75": "C",   

  "87": "Db",   
  "69": "Eb",   
  "84": "Gb",
  "89": "Ab",     
  "85": "Bb",     
}

// initialize function that runs on page launch

function init(){

  // enable key listeners

  enableKeyboardKeys();
  enableSliders();

}

init();

attackTime = 0;
releaseTime = 0;


function enableKeyboardKeys(){
    document.querySelector("body").addEventListener("keydown", function(e){
      if(typeof(freqs[e.keyCode]) != "undefined"){
          console.log(notes[e.keyCode]);

          playFrequency(freqs[e.keyCode], 1);
      }
      
    });

    document.querySelector("body").addEventListener("keyup", function(e){
      if(typeof(freqs[e.keyCode]) != "undefined"){
          console.log(notes[e.keyCode]);

          playFrequency(freqs[e.keyCode], 0);
      }
      
    });
}

function enableSliders(){

    document.querySelector("#attack").addEventListener("change", function(e){
        attackTime = Number(e.target.value);
        document.querySelector("#attack-value").innerText = e.target.value;
    });

    document.querySelector("#release").addEventListener("change", function(e){
        releaseTime = Number(e.target.value);
        document.querySelector("#release-value").innerText = e.target.value;
    });
}

/* WebAudio API */

// for legacy browsers
const AudioContext = window.AudioContext || window.webkitAudioContext;


// create a new audio context
const audioCtx = new AudioContext();

// Try making an oscillator
const osc = audioCtx.createOscillator();
osc.type = 'sin';
osc.start();
const gainNode = audioCtx.createGain();

// connect the oscillator to gain node, and the gain node to the audio context
osc.connect(gainNode);
gainNode.connect(audioCtx.destination);
gainNode.gain.value = 0;




function playFrequency(freq, velocity){
  
  console.log(audioCtx.currentTime);

  if(velocity == 0){
    //gainNode.gain.value = 0;
    console.log(releaseTime);
    gainNode.gain.value = 1;
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + releaseTime);
    //gainNode.gain.value = 0;
  } else {
    console.log(attackTime);
    console.log(audioCtx.currentTime + attackTime);
    gainNode.gain.value = 0;
    gainNode.gain.linearRampToValueAtTime(1.0, audioCtx.currentTime + attackTime);
    //gainNode.gain.value = 1;
  }

  osc.frequency.setValueAtTime(freq, audioCtx.currentTime); 
  //gainNode.gain.value = velocity/127;


}

/*
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
}*/