var object=[];

var img="";
var status="";
function preload(){
img = loadImage("dog_cat.jpg");
song = loadSound("song.wav");
}
function setup(){
canvas = createCanvas(640, 420);
canvas.center();
objectDetector= ml5.objectDetector("cocossd", modelLoaded);
document.getElementById("status").innerHTML="Status : Detecting Objects";
}
function modelLoaded(){
console.log("cocossd Model Loaded");
status= true;
objectDetector.detect(img, gotResults);
}
function gotResults(error, results){
if(error){
    console.log(error);
}
else{
    console.log(results);
    object=results;
}
}
function draw(){
    
image(img, 0, 0, 640, 420);
if(status!=""){
    for(var i = 0 ; i < object.length; i++){
        

        fill("#FF0000");
        textSize(20);
        var percent= floor(object[i].confidence*100);
        text(object[i].label+" "+percent+"%", object[i].x+10, object[i].y+15);
        noFill();
        stroke("#FF0000");
        rect(object[i].x, object[i].y, object[i].width, object[i].height);
        if(object="person"){
            document.getElementById("status").innerHTML="Status : Baby Detected";
            song.stop();
        }
        else{
            document.getElementById("status").innerHTML="Status : Baby Not Detected";
            song.play();
        }
    }
}
}