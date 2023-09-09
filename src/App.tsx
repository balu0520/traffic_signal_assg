import { useMachine } from "@xstate/react";
import { signalMachine } from "./machines/signalMachine";
import "./App.css"
import {BsFillRewindFill,BsFillFastForwardFill} from 'react-icons/bs'
import {FaPlay,FaPause} from 'react-icons/fa'


function App() {
  const [state, send] = useMachine(signalMachine)
  const activeA = state.value === "RedLarge" || state.value === "RedSmall" || state.context.activeState === "RedLarge" || state.context.activeState === "RedSmall" ? "activeA" : "inactiveA"
  const activeB = state.value === "Yellow" || state.context.activeState === "Yellow" ? "activeB" : "inactiveB"
  const activeC = state.value === "Green" || state.context.activeState === "Green" ? "activeC" : "inactiveC"


  return (
    <div className="App">
      <div className="container">
        <div className="lights-container">
          <button className={`btn ${activeA}`}></button>
          <button className={`btn ${activeB}`}></button>
          <button className={`btn ${activeC}`}></button>
        </div>
        <div className="animated-container">
          {(state.context.activeState === "RedLarge") && (
            <div className="countdown-container">
              <img src="https://images.emojiterra.com/google/android-11/512px/1f6b6.png" className="animated-image" />
              <p className="context-value">{state.context.countDownValue}</p>
            </div>
          )}
          {(state.context.activeState === "RedSmall") && (
            <div style={{display:"flex",alignItems:"flex-end"}}>
              <img src="https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/270b.png" className="animated-image blink-image" />
              <p className="context-value">{state.context.countDownValue}</p>
            </div>
          )}
          {(state.context.activeState === "Green") && (
            <div style={{display:"flex",alignItems:"flex-end"}}>
              <img src="https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/270b.png" className="animated-image" />
              <p className="context-value"></p>
            </div>
          )}
          {(state.context.activeState === "Yellow") && (
            <div style={{display:"flex",alignItems:"flex-end"}}>
              <img src="https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/270b.png" className="animated-image" />
              <p className="context-value"></p>
            </div>
          )}
        </div>
      </div>
      <div className="controls-container">
        <button onClick={() => send({ type: "prevState" })} className="control-btn"><button className="control-btn-container"><BsFillRewindFill size={25} color="#ffffff" className="rewind-btn"/></button></button>
        {(!state.matches("PausedState") && !state.context.IsPaused) && <button onClick={() => send({ type: "pause" })} className="control-btn"><button className="control-btn-container"><FaPause size={25} color="#ffffff"/></button></button>}
        {(state.matches("PausedState") || state.context.IsPaused) && <button onClick={() => send({ type: "resume" })} className="control-btn"><button className="control-btn-container"><FaPlay size={25} color="#ffffff"/></button></button>}
        <button onClick={() => send({ type: "nextState" })} className="control-btn"><button className="control-btn-container"><BsFillFastForwardFill size={25} color="#ffffff"/></button></button>
      </div>
    </div>
  );
}

export default App;

