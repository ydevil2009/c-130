leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
song = "";
song2 = "";
scoreLeftWrist  = 0;
scoreRightWrist  = 0;

function preload(){
    song = loadSound("music.mp3");
    song2 = loadSound("peter_pan.mp3");
}
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modeLoaded);
    poseNet.on('pose', gotPoses);
}
function draw(){
    image(video,0, 0, 600, 500);

    fill('#FF0000');
    stroke('FF0000');

    circle(rightWristX,rightWristY,20);

    song_status = song.isPlaying();

    if(scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        song2.stop();

        if(song_status == false){
            song.play();
            document.getElementById("Song_Name").innerHTML = "Song = " + Song_Name;
        }
       
    }

    song2_status = song2.isPlaying();

    if(scoreRightWrist > 0.2){
        circle(rightWristX,rightWristY,20);
        song.stop();

        if(song2_status == false){
            song2.play();
            document.getElementById("Song_Name").innerHTML = "Song = " + Song_Name;
        }
       
    }

}
function gotPoses(results) {
   if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +" leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +" rightWristY = " + rightWristY);
    }
}
function modeLoaded() {
    console.log("PoseNet is Initialized");
}