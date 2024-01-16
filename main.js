song1 = "music.mp3";
song2 = "music2.mp3";
song_1 = "";
song_2 = "";
scoreRightWrist = 0;
scoreLeftWrist = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet is Initialized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("RightWristX = " + rightWristX + "RightWristY = " + rightWristY);
    }
}
function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    song_1 = song1.isPlaying();
    console.log("Song one = " + song_1);

    song_2 = song2.isPlaying();
    console.log("Song 2 = " + song_2);

    if(scoreLeftWrist > 0.2)
    {
    circle(leftWristX, leftWristY, 20);
    song2.stop();

    if (song_1 == false)
    {
        song1.play();
    }
    else
    {
        document.getElementById("song_id").innerHTML = "Song 1 is playing.";
    }

    }

    if(scoreRightWrist > 0.2)
    {
    circle(rightWristX, rightWristY, 20);
    song1.stop();

    if (song_2 == false)
    {
        song2.play();
    }
    else
    {
        document.getElementById("song_id").innerHTML = "Song 2 is playing.";
    }

    }

}

