import React, { useEffect, useReducer, useState } from "react";
import ControllerSVG from "./components/ControllerSVG";
import SettingsMenu from "./components/SettingsMenu";
import "./index.scss";
import { presets } from "./presets/presets";
import { BACKGROUND_COLOR_KEY, PRESET_KEY } from "./util/constants";

const keyMap = {
  0: { name: "A" },
  1: { name: "B" },
  2: { name: "X" },
  3: { name: "Y" },
  4: { name: "LB" },
  5: { name: "RB" },
  6: { name: "LT" },
  7: { name: "RT" },
  8: { name: "View" },
  9: { name: "Menu" },
  10: { name: "LStick" },
  11: { name: "RStick" },
  12: { name: "Up" },
  13: { name: "Down" },
  14: { name: "Left" },
  15: { name: "Right" },
  16: { name: "???" },
};

const LX_AXIS = "LX_AXIS";
const LY_AXIS = "LY_AXIS";
const RX_AXIS = "RX_AXIS";
const RY_AXIS = "RY_AXIS";

const axesMap = {
  0: LX_AXIS,
  1: LY_AXIS,
  2: RX_AXIS,
  3: RY_AXIS,
};

const App = () => {
  const SET_KEYPRESS = "SET_KEYPRESS";
  const SET_AXIS = "SET_AXIS";
  const TOGGLE_SETTINGS_MENU = "TOGGLE_SETTINGS_MENU";
  const SET_BACKGROUND_COLOR = "SET_BACKGROUND_COLOR";
  const SET_CONTROLLER_COLOR_PRESET = "SET_CONTROLLER_COLOR_PRESET";

  const setKeypressState = (key, data) =>
    dispatch({ type: SET_KEYPRESS, payload: { key, data } });

  const setAxisState = (idx, val) =>
    dispatch({ type: SET_AXIS, payload: { idx, val } });

  const toggleSettingsMenuState = () =>
    dispatch({ type: TOGGLE_SETTINGS_MENU });

  const setBackgroundColor = (hexColor) =>
    dispatch({ type: SET_BACKGROUND_COLOR, payload: hexColor });

  const setControllerColorPreset = (color) =>
    dispatch({ type: SET_CONTROLLER_COLOR_PRESET, payload: color });

  const reducer = (state, { type, payload }) => {
    let nextState = Object.assign({}, state);

    switch (type) {
      case SET_KEYPRESS:
        const { key, data } = payload;
        const { pressed, touched, value } = data;

        nextState.keys[key] = {
          name: nextState.keys[key].name,
          pressed,
          touched,
          value,
        };
        return nextState;
      case SET_AXIS:
        const { idx, val } = payload;

        const axis = axesMap[idx];

        nextState.axes[axis] = val;
        return nextState;
      case TOGGLE_SETTINGS_MENU:
        nextState.showSettingsMenu = !nextState.showSettingsMenu;
        return nextState;
      case SET_BACKGROUND_COLOR:
        nextState.backgroundColor = payload;
        localStorage.setItem(BACKGROUND_COLOR_KEY, nextState.backgroundColor);
        return nextState;
      case SET_CONTROLLER_COLOR_PRESET:
        nextState.controllerColors = presets[payload];
        localStorage.setItem(PRESET_KEY, payload);
        return nextState;
      default:
        console.error("You dun goofed");
        return nextState;
    }
  };

  const initialState = {
    keys: { ...keyMap },
    axes: { LX_AXIS: 0, LY_AXIS: 0, RX_AXIS: 0, RY_AXIS: 0 },
    showSettingsMenu: false,
    backgroundColor: localStorage.getItem(BACKGROUND_COLOR_KEY) ?? "#00FF00",
    controllerColors:
      presets[localStorage.getItem(PRESET_KEY)] ?? presets.black,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [activeGamepadIndex, setActiveGamepadIndex] = useState();

  useEffect(() => {
    if (typeof activeGamepadIndex !== "number") return;

    requestAnimationFrame(update);
  }, [activeGamepadIndex]);

  window.addEventListener("gamepadconnected", (e) => {
    console.log("asfd");
    setActiveGamepadIndex(e.gamepad.index);
  });

  window.addEventListener("gamepaddisconnected", (e) => {
    setActiveGamepadIndex(null);
  });

  // TODO: This needs refactoring/optimizing, still runs while disconnected
  const update = () => {
    const activeGamePad = navigator.getGamepads()[activeGamepadIndex];

    if (activeGamePad) {
      for (let i = 0; i < activeGamePad.buttons.length; i++) {
        const currButtonInput = activeGamePad.buttons[i];
        const { pressed, value, touched } = state.keys[i];

        // TODO: It works
        if (
          currButtonInput.pressed == pressed &&
          currButtonInput.value == value &&
          currButtonInput.touched == touched
        )
          continue;

        setKeypressState(i, activeGamePad.buttons[i]);
      }

      for (let i = 0; i < activeGamePad.axes.length; i++) {
        const currAxisInput = activeGamePad.axes[i];
        const currAxis = axesMap[i];

        if (state.axes[currAxis] === currAxisInput) continue;

        setAxisState(i, currAxisInput);
      }
    }

    requestAnimationFrame(update);
  };

  const settingsActions = {
    setBackgroundColor,
    toggleSettingsMenuState,
    setControllerColorPreset,
  };

  return (
    <section
      className="main-container"
      style={{ background: state.backgroundColor }}
    >
      <ControllerSVG
        state={state}
        toggleSettingsMenuState={toggleSettingsMenuState}
      />
      <SettingsMenu state={state} actions={settingsActions} />
    </section>
  );
};

export default App;
