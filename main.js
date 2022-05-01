
objects = [];
status = "";
r = random(255);
g= random(255);
b=random(255);


function setup() {
  canvas = createCanvas(640, 420);
  canvas.center();
cam = createCapture(VIDEO);
cam.hide();

  objectDetector = ml5.objectDetector('cocossd', modelLoaded);

  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!");

status = true;

 

}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  else{
    console.log(results);

    objects = results;
  }
  
}


function draw() {
  image(cam, 0, 0, 640, 420);

      if(status != "")
      {
        objectDetector.detect(cam, gotResult);
        for (i = 0; i < objects.length; i++) {

          document.getElementById("status").innerHTML = "Status : Object Detected";
          r = random(255);
          g= random(255);
          b=random(255);
          fill(r,g,b);
          
          percent = floor(objects[i].confidence * 100);
          
         text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+15);
     
          noFill();
          
          stroke(r,b,g);
          
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            
        }
      }
      if (objects == "person"){
document.getElementById("Baby-status").innerHTML = "Baby Found"
alarm_sound.stop()      
}
      else{
document.getElementById("Baby-status").innerHTML = "Baby NOT Found"
alarm_sound.play()
      }
}
 function preload(){
   alarm_sound = loadSound("alarm.mp3")
 }