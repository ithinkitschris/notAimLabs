import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { ReactP5Wrapper } from "react-p5-wrapper";
import sketch from "./sketches/sketch.js";
const socket = new WebSocket("ws://localhost:3001");

function App() {
  const [asciiData, setAsciiData] = useState({ text: "" });
  const [haptic, setHaptic] = useState(0);
  const [socketConnected, setSocketConnected] = React.useState(false);

  socket.onopen = () => {
    console.log("WebSocket connection opened");
    setSocketConnected(true);
    socket.send("Hello from the client!");

  };

  socket.onmessage = (event) => {
    console.log("Received WebSocket data:", event.data);
    setAsciiData({ text: event.data });
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  socket.onclose = () => {
    console.log("WebSocket connection closed");
  };

  // useEffect(() => {

  //   if (socketConnected) {
  //     socket.send(haptic);
  //     console.log(haptic);
  //   }
    
  //   // return () => {
  //   //   socket.close();
  //   // };

  // }, [haptic, socketConnected]);

  function sendHapticData(){
    socket.send("test");
    // socket.send("Test");
  }
  

  return (
    <div className="App">
      {/* <h1>React and p5.js Integration</h1> */}
      <ReactP5Wrapper
        sketch={sketch} 
        setHaptic={setHaptic}
        sendHapticData={sendHapticData}
        // ascii={asciiData}
      />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;