import { useEffect, useState } from "react";
import LineChartComponent from "../components/LineChartSocket";

/**
 * 1. postMessage payload = {<Field>: ...}
 */
const Homepage = () => {
  const [worker, setWorker] = useState(null);
  const [res, setRes] = useState([]);

  const hanldeStartConnection = () => {
    // Send the message to the worker [postMessage]
    worker.postMessage({
      connectionStatus: "init",
    });
  };

  const handleStopConnection = () => {
    worker.postMessage({
      connectionStatus: "stop",
    });
  };

  useEffect(() => {
    const myWorker = new Worker(
      new URL("../workers/main.worker.js", import.meta.url)
    ); //NEW SYNTAX
    setWorker(myWorker);

    return () => {
      myWorker.terminate();
    };
  }, []);

  useEffect(() => {
    if (worker) {
      worker.onmessage = function (e) {
        if(typeof e.data === "string"){
          setRes((prevRes) => [...prevRes, {stockPrice: e.data}]);
        }
      };
    }
  }, [worker]);

  return (
    <>
      <h3>WebWorker Websocket example</h3>
      <button
        id="start-connection"
        onClick={hanldeStartConnection}
        disabled={!worker || res?.disableStartButton}
      >
        Start Connection
      </button>
      <button
        id="stop-connection"
        onClick={handleStopConnection}
        // disabled={!res?.disableStartButton}
      >
        Stop Connection
      </button>
      <LineChartComponent data={res}/>
    </>
  );
};

export default Homepage;
