export default function sketch(p5) {
  
  let xCoord;
  let xSpeed = 5;
  let ySpeed = 5;
  let yCoord;
  let score;
  let play;
  let circleDiameter = 100;
  let lastTime = 0;
  let serial;
  let setHaptic;
  let sendHapticData;

  p5.setup = function () {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(0);
    xCoord = p5.random(p5.windowWidth);
    yCoord = p5.random(p5.windowHeight);
    
    // // Setup serial communication with Arduino
    // serial = new p5.SerialPort();
    // serial.open('/dev/tty.usbserial-130');
    
    score = 0;
    play = 0;
  };

  p5.draw = function () {
    if (play == 0) {
      p5.background(0);
      p5.fill(200);
      p5.stroke(200);
      p5.strokeWeight(2);
      p5.circle(xCoord, yCoord, circleDiameter);
      
      p5.fill(255);
      p5.textSize(25);
      p5.text(`${score}`, p5.windowWidth / 2, p5.windowHeight / 2);

      // Update coordinates
      xCoord += xSpeed;
      yCoord += ySpeed;

      // Bounce logic
      if (xCoord > (p5.width - circleDiameter / 2) || xCoord <= circleDiameter / 2) {
        xSpeed *= -1;
      }
      if (yCoord > (p5.height - circleDiameter / 2) || yCoord <= circleDiameter / 2) {
        ySpeed *= -1;
      }
    }
  };

  p5.updateWithProps = (props) => {
    if (props.setHaptic) {
      setHaptic = props.setHaptic;
      sendHapticData = props.sendHapticData;
    }
  };

  p5.mousePressed = function () {
    if (play == 0) {
      let d = p5.dist(p5.mouseX, p5.mouseY, xCoord, yCoord);
      let currentTime = p5.millis();

      if (currentTime - lastTime <= 800 && d < 50) {
        xCoord = p5.random(50, p5.width - 50);
        yCoord = p5.random(50, p5.height - 50);
        xSpeed = p5.random(-10, 10);
        ySpeed = p5.random(-10, 10);
        sendHapticData();
        // setHaptic(255);
        console.log("Mouse pressed");
        // serial.write(255);  // Send data to Arduino
        score += 10;
        lastTime = currentTime;
      } else if (d < circleDiameter / 2) {
        xCoord = p5.random(50, p5.width - 50);
        yCoord = p5.random(50, p5.height - 50);
        xSpeed = p5.random(-5, 5);
        ySpeed = p5.random(-5, 5);
        sendHapticData();
        // setHaptic(255);
        console.log("Mouse pressed 2");
        // serial.write(255);  // Send data to Arduino
        score += 1;
        lastTime = currentTime;
      } else {
        score = 0;
      }
    }
  };
}
