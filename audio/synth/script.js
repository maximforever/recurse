console.log("hey!");

// midi stuff

if (navigator.requestMIDIAccess) {
    console.log('This browser supports WebMIDI!');
} else {
    console.log('WebMIDI is not supported in this browser.');
}


var noteData = {
  "65": {
      freq: 261.63,
      note: "C",
      playing: false
    },   
  "83": {
      freq: 293.66,
      note: "D",
      playing: false
    },   
  "68": {
      freq: 329.63,
      note: "E",
      playing: false
    },   
  "70": {
      freq: 349.23,
      note: "F",
      playing: false
    },   
  "71": {
      freq: 392.00,
      note: "G",
      playing: false
    },   
  "72": {
      freq: 440.00,
      note: "A",
      playing: false
    },   
  "74": {
      freq: 493.88,
      note: "B",
      playing: false
    },   
  "75": {
      freq: 523.25,
      note: "C",
      playing: false
    },   

  "87": {
      freq: 277.18,
      note: "Db",
      playing: false
    },   
  "69": {
      freq: 311.13,
      note: "Eb",
      playing: false
    },   
  "84": {
      freq: 369.99,
      note: "Gb",
      playing: false
    },   
  "89": {
      freq: 415.30,
      note: "Ab",
      playing: false
    },   
  "85": {
      freq: 466.16,
      note: "Bb",
      playing: false
    }    
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

      // ensure that our keydown doesn't keep triggering the same note again and again
      if(typeof(noteData[e.keyCode]) != "undefined" && !noteData[e.keyCode].playing){
          console.log("play " + noteData[e.keyCode].note);
          noteData[e.keyCode].playing = true;

          // simulating a velocity of 127 - the loudest MIDI value
          playFrequency(noteData[e.keyCode].freq, 127);
      }
    });

    document.querySelector("body").addEventListener("keyup", function(e){
      if(typeof(noteData[e.keyCode]) != "undefined"){
          console.log("stop " + noteData[e.keyCode].note);
          noteData[e.keyCode].playing = false;
          if(notesBeingPlayed() == 0){
            gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + releaseTime);
          }
          
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
const gainNode = audioCtx.createGain();
osc.type = 'sawtooth';
osc.start();


// connect the oscillator to gain node, and the gain node to the audio context
osc.connect(gainNode);
gainNode.connect(audioCtx.destination);
gainNode.gain.value = 0;




function playFrequency(freq, velocity){
  
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);


  if(notesBeingPlayed() == 0){ 
    gainNode.gain.value = 0
  }

  if(velocity > 0){
    gainNode.gain.linearRampToValueAtTime(velocity/127, audioCtx.currentTime + attackTime);
  }

}

function notesBeingPlayed(){

  var notesPressed = 0;

  for(key in noteData){

    if(noteData[key].playing){
      notesPressed++;
    }
  }

  console.log("Notes still pressed: " + notesPressed);
  return notesPressed;

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