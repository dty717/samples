/*
*  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
*
*  Use of this source code is governed by a BSD-style license
*  that can be found in the LICENSE file in the root of the source
*  tree.
*/

// This code is adapted from
// https://rawgit.com/Miguelao/demos/master/mediarecorder.html

'use strict';

/* globals MediaRecorder */

const mediaSource = new MediaSource();
mediaSource.addEventListener('sourceopen', handleSourceOpen, false);
let mediaRecorder;
let recordedBlobs;
let sourceBuffer;

const errorMsgElement = document.querySelector('span#errorMsg');
const recordedVideo = document.querySelector('video#recorded');
const recordButton = document.querySelector('button#record');
recordButton.addEventListener('click', () => {
  if (recordButton.textContent === 'Start Recording') {
    startRecording();
  } else {
    stopRecording();
    recordButton.textContent = 'Start Recording';
    playButton.disabled = false;
    downloadButton.disabled = false;
  }
});

const playButton = document.querySelector('button#play');
playButton.addEventListener('click', () => {
  play(recordedBlobs)
});
function play(blob){
  const superBuffer = new Blob(blob, {type: 'video/webm'});
  recordedVideo.src = null;
  recordedVideo.srcObject = null;
  recordedVideo.src = window.URL.createObjectURL(superBuffer);
  recordedVideo.controls = true;
  recordedVideo.play();
}
var idVideo=0;
const downloadButton = document.querySelector('button#download');
downloadButton.addEventListener('click', () => {
  const blob = new Blob(recordedBlobs, {type: 'video/webm'});
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'test.webm';
  document.body.appendChild(a);
  //a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    ws.send('filename:'+(idVideo++)+"test.webm");
    ws.send(blob);
    ws.send('end');
    console.log("upload ok");
  }, 100);
});

function handleSourceOpen(event) {
  sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
}
var containerBlobs=[];
var one=false;

function handleDataAvailable(event) {
  if (event.data && event.data.size > 0) {
    if(recordedBlobs.length<170){
        recordedBlobs.push(event.data);
    }else{
        //no safe I think, but it work in chrome.
        // containerBlobs=recordedBlobs;
        // recordedBlobs=null;
        // recordedBlobs=[];
        if(ws==undefined||(ws.readyState!=1))    
            return;
        if(one){
            return
        }
        recordedBlobs.push(event.data);
        if(recordedBlobs.length<1600){
             return;
        }
        one=true
        const blob = new Blob(recordedBlobs, {type: 'video/webm'});
        setTimeout(() => {
            play(blob)
            
            return;
            ws.send('filename:'+(idVideo++)+"test.webm");
            ws.send(blob);
            ws.send('end');
            containerBlobs=[];
        }, 10);
    }
  }
}

function startRecording() {

  recordedBlobs = [];
  let options = {mimeType: 'video/webm;codecs=vp9'};
  if (!MediaRecorder.isTypeSupported(options.mimeType)) {
    //console.error(`${options.mimeType} is not Supported`);
    errorMsgElement.innerHTML = `${options.mimeType} is not Supported`;
    options = {mimeType: 'video/webm;codecs=vp8'};
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      //console.error(`${options.mimeType} is not Supported`);
      errorMsgElement.innerHTML = `${options.mimeType} is not Supported`;
      options = {mimeType: 'video/webm'};
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        //console.error(`${options.mimeType} is not Supported`);
        errorMsgElement.innerHTML = `${options.mimeType} is not Supported`;
        options = {mimeType: ''};
      }
    }
  }

  try {
    mediaRecorder = new MediaRecorder(window.stream, options);
  } catch (e) {
    //console.error('Exception while creating MediaRecorder:', e);
    errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
    return;
  }
    
  //console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
  recordButton.textContent = 'Stop Recording';
  playButton.disabled = true;
  downloadButton.disabled = true;
  mediaRecorder.onstop = (event) => {
    console.log('Recorder stopped: ', event);
  };
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start(0); // collect 10ms of data
  //console.log('MediaRecorder started', mediaRecorder);
}

function stopRecording() {
  mediaRecorder.stop();
}

function handleSuccess(stream) {
  recordButton.disabled = false;
  //console.log('getUserMedia() got stream:', stream);
  window.stream = stream;
  const gumVideo = document.querySelector('video#gum');
  gumVideo.srcObject = stream;
}

async function initCamera(constraints) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
  } catch (e) {
    //console.error('navigator.getUserMedia error:', e);
    errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
  }
}

document.querySelector('button#start').addEventListener('click', async () => {
  const hasEchoCancellation = document.querySelector('#echoCancellation').checked;
  const constraints = {
    audio: {
      echoCancellation: {exact: hasEchoCancellation}
    },
    video: {
      width: 1280, height: 720
    }
  };
  await initCamera(constraints);
});


document.querySelector('button#test').addEventListener('click', async () => {
    startRecording();
    setTimeout(1000,stopRecording);
    const blob = new Blob(recordedBlobs, {type: 'video/webm'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      //console.log(url)
      return;
      a.download = 'test.webm';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        ws.send('filename:'+file.name);
        ws.send(blob);
        ws.send('end');
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 100);
});

var ws;

function connectChatServer() {
    ws = new WebSocket(
            "ws://localhost:8888/receive/fileserver");

    ws.binaryType = "arraybuffer";
    ws.onopen = function() {
        alert("Connected.")
    };

    ws.onmessage = function(evt) {
        alert(evt.msg);
    };

    ws.onclose = function() {
        alert("Connection is closed...");
    };
    ws.onerror = function(e) {
        alert(e.msg);
    }

}

function sendFile() {
    var file = document.getElementById('filename').files[0];
    ws.send('filename:'+file.name);
    var reader = new FileReader();
    var rawData = new ArrayBuffer();            
    //alert(file.name);

    reader.loadend = function() {

    }
    reader.onload = function(e) {
        rawData = e.target.result;
        ws.send(rawData);
        alert("the File has been transferred.")
        ws.send('end');
    }
    reader.readAsArrayBuffer(file);
}


