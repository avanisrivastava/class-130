song="";
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
scoreleftwrist=0;
function preload(){
song=loadSound("music.mp3");
}

function setup(){
canvas=createCanvas(600,500);
canvas.position(500,200);
video=createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);
}

function modelLoaded(){
  console.log("posenet is initialized");
}

function gotPoses(results){
  if(results.length>0){
    console.log(results);
    scoreleftwrist=results[0].pose.keypoints[9].score;
    console.log("scoreleftwrist= "+scoreleftwrist);
    leftwristx=results[0].pose.leftWrist.x;
    leftwristy=results[0].pose.leftWrist.y;
    console.log("leftwristx ="+leftwristx);
    console.log("leftwristy ="+leftwristy);

    rightwristx=results[0].pose.rightWrist.x;
    rightwristy=results[0].pose.rightWrist.y;
    console.log("rightwristx ="+rightwristx);
    console.log("rightwristy ="+rightwristy);
  }
}

function draw(){
  image(video,0,0,600,500);  

  fill('red');
  stroke('red');
  circle(rightwristx,rightwristy,20);
  if(rightwristy>0 && rightwristy<=100){
    document.getElementById("speed").innerHTML="speed=0.5";
    song.rate(0.5);
  }

  else if(rightwristy>100 && rightwristy<=200){
    document.getElementById("speed").innerHTML="speed=1";
    song.rate(1);
  }

  else if(rightwristy>200 && rightwristy<=300){
    document.getElementById("speed").innerHTML="speed=1.5";
    song.rate(1.5);
  }

  else if(rightwristy>300 && rightwristy<=400){
    document.getElementById("speed").innerHTML="speed=2";
    song.rate(2);
  }

  else if(rightwristy>400 && rightwristy<=500){
    document.getElementById("speed").innerHTML="speed=2.5";
    song.rate(2.5);
  }
  if(scoreleftwrist>0.2){
  circle(leftwristx,leftwristy,20);
  
  InNumberleftwristy=Number(leftwristy);
  remove_decimals=floor(InNumberleftwristy);
  volume=remove_decimals/500;
  document.getElementById("volume").innerHTML="volume: "+volume;
song.setVolume(volume);}

}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}