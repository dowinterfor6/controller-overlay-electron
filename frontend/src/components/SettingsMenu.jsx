import React from "react";
import { presets } from "../presets/presets";

const SettingsMenu = ({ state, actions }) => {
  const { showSettingsMenu: show } = state;
  const {
    setBackgroundColor,
    toggleSettingsMenuState,
    setControllerColorPreset,
  } = actions;

  const handleColorSelect = (e) => {
    setBackgroundColor(e.currentTarget.value);
  };

  const handleCloseSettings = () => {
    toggleSettingsMenuState();
  };

  const handlePresetChange = (e) => {
    const preset = e.currentTarget.value.toLowerCase();
    setControllerColorPreset(preset);
  };

  const presetNames = Object.keys(presets);

  return (
    <div
      className="settings-menu-cover"
      style={{ display: show ? "flex" : "none" }}
    >
      <section className="settings-menu">
        <div className="close-icon-container" onClick={handleCloseSettings}>
          <svg
            width="25px"
            height="25px"
            viewBox="61.138598 79.281455 86.365669 86.365662"
            id="svg907"
          >
            <g id="layer1">
              <path
                id="path1476"
                d="M 147.41072,79.374999 61.232142,165.55357 m 0,-86.178571 86.178578,86.178571"
              />
            </g>
          </svg>
        </div>
        <h1>Settings</h1>
        <div className="background-selector">
          <input
            type="color"
            onChange={handleColorSelect}
            defaultValue={state.backgroundColor}
          />
          <label>
            <h2>Background</h2>
          </label>
        </div>
        <div className="theme-selector">
          <select
            onChange={handlePresetChange}
            defaultValue={state.controllerColors.displayName}
          >
            {presetNames.map((preset, i) => (
              <option key={i}>
                {`${preset.substr(0, 1).toUpperCase()}${preset.substr(1)}`}
              </option>
            ))}
          </select>
          <label>
            <h2>Theme</h2>
          </label>
        </div>
      </section>
    </div>
  );
};

export default SettingsMenu;
