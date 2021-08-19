import React, { useEffect, useRef, useState } from "react";

const ControllerSVG = ({ state, toggleSettingsMenuState }) => {
  const [hasAnimationEnded, setHasAnimationEnded] = useState(false);
  const svgRef = useRef();

  useEffect(() => {
    const pathsArr = svgRef.current.getElementsByTagName("path");

    for (let i = 0; i < pathsArr.length; i++) {
      const path = pathsArr[i];
      const length = path.getTotalLength();

      // TODO: There's probably a better way to do this
      if (
        !path.classList.contains("fade-in-path") &&
        !path.classList.contains("no-draw")
      ) {
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;

        path.addEventListener("animationend", () => {
          path.style.strokeDasharray = 0;
          path.style.strokeDashoffset = 0;
          path.classList.remove("draw");

          if (!hasAnimationEnded) {
            setHasAnimationEnded(true);
          }
        });
      }

      path.classList.add("draw");
    }
  }, []);

  const handleLogoClick = () => {
    toggleSettingsMenuState();
  };

  // TODO: This should be configurable somewhere maybe
  const joystickOffsetCoefficient = 4;

  const { controllerColors } = state;

  const pressedKey = (key) => {
    return state.keys[key].pressed && hasAnimationEnded;
  };

  return (
    <svg
      width="600"
      height="420"
      viewBox="46.642255 55.702302 115.30908 90.287966"
      ref={svgRef}
      style={{
        stroke: controllerColors.stroke,
        strokeWidth: 0.25,
        strokeLinecap: "round",
        fill: "none",
      }}
    >
      <g id="body">
        <path
          d="m 150.72682,145.95701 c -0.3638,-0.0533 -0.36616,0.0473 -1.11361,-0.37457 -0.16718,-0.0944 0,0 -1.21946,-0.95087 -0.60133,-0.46889 -5.0653,-4.19902 -7.70016,-7.45795 -1.11772,-1.38245 -3.13412,-3.96617 -4.4809,-5.74161 -1.34678,-1.77544 -3.10306,-3.82612 -3.90283,-4.55707 -1.62782,-1.48774 -4.03129,-2.72832 -6.13617,-3.16727 -1.85935,-0.38774 -41.439661,-0.40806 -43.473677,-0.0223 -1.868366,0.35433 -4.269002,1.50237 -5.970011,2.855 -0.752779,0.59861 -2.530075,2.6109 -3.949544,4.47176 -6.244589,8.18639 -8.577822,10.78067 -12.035528,13.38209 -2.565362,1.93006 -3.417033,1.99771 -6.0157,0.47781 -2.68076,-1.56791 -3.76437,-2.52783 -5.129463,-4.54398 -1.852061,-2.73537 -2.609177,-5.36503 -2.785067,-9.67325 -0.16174,-3.96166 0.144819,-6.95695 1.268988,-12.39886 1.569283,-7.59663 4.625798,-17.56747 8.598102,-28.048387 4.338916,-11.448219 5.776751,-14.255007 8.34404,-16.288337 1.29781,-1.027885 5.110008,-2.904614 7.686471,-3.784018 5.265381,-1.797192 8.551125,-2.000317 32.241599,-1.993175 23.04109,0.007 27.12948,0.319629 32.47479,2.483692 5.36059,2.170252 8.14804,4.467784 9.8232,8.096704 5.45821,11.824166 11.57333,30.346701 13.69655,41.486471 0.89974,4.72065 1.14399,11.37694 0.52451,14.29404 -0.49482,2.3301 -1.66117,4.92499 -3.01629,6.71063 -0.94104,1.24001 -3.52349,2.92795 -4.15482,3.28338 -1.82914,1.02975 -1.55493,0.94162 -1.82914,1.02975 -1.15529,0.37129 0,0 -1.15529,0.37129 z"
          style={{ fill: controllerColors.body, stroke: "none" }}
        />
      </g>
      <g
        id="joysticks"
        style={{
          fill: controllerColors.joysticks.base,
          stroke: controllerColors.joysticks.stroke,
        }}
      >
        <g id="leftJoystick">
          <path
            id="leftJoystickOuter"
            d="m 81.870653,87.708344 a 7.2788329,7.2788329 0 0 1 -7.278833,7.278832 7.2788329,7.2788329 0 0 1 -7.278833,-7.278832 7.2788329,7.2788329 0 0 1 7.278833,-7.278833 7.2788329,7.2788329 0 0 1 7.278833,7.278833 z"
          />
          <path
            style={{
              transform: hasAnimationEnded
                ? `translate(${
                    joystickOffsetCoefficient * state.axes.LX_AXIS
                  }px, ${joystickOffsetCoefficient * state.axes.LY_AXIS}px)`
                : "",
              fill: pressedKey(10)
                ? controllerColors.joysticks.pressed
                : controllerColors.joysticks.body,
            }}
            id="leftJoystickInner"
            d="m 78.905005,87.70829 a 4.3137112,4.3137112 0 0 1 -4.313712,4.313711 4.3137112,4.3137112 0 0 1 -4.313711,-4.313711 4.3137112,4.3137112 0 0 1 4.313711,-4.313711 4.3137112,4.3137112 0 0 1 4.313712,4.313711 z"
          />
        </g>
        <g id="rightJoystick" transform="translate(44.799523,17.699999)">
          <path
            id="rightJoystickOuter"
            d="m 81.870653,87.708344 a 7.2788329,7.2788329 0 0 1 -7.278833,7.278832 7.2788329,7.2788329 0 0 1 -7.278833,-7.278832 7.2788329,7.2788329 0 0 1 7.278833,-7.278833 7.2788329,7.2788329 0 0 1 7.278833,7.278833 z"
          />
          <path
            style={{
              transform: hasAnimationEnded
                ? `translate(${
                    joystickOffsetCoefficient * state.axes.RX_AXIS
                  }px, ${joystickOffsetCoefficient * state.axes.RY_AXIS}px)`
                : "",
              fill: pressedKey(11)
                ? controllerColors.joysticks.pressed
                : controllerColors.joysticks.body,
            }}
            id="rightJoystickInner"
            d="m 78.905005,87.70829 a 4.3137112,4.3137112 0 0 1 -4.313712,4.313711 4.3137112,4.3137112 0 0 1 -4.313711,-4.313711 4.3137112,4.3137112 0 0 1 4.313711,-4.313711 4.3137112,4.3137112 0 0 1 4.313712,4.313711 z"
          />
        </g>
      </g>
      <g
        id="dpad"
        style={{
          fill: controllerColors.dpad.base,
          stroke: controllerColors.dpad.stroke,
        }}
      >
        <path
          id="pad"
          d="m 98.399319,106.66044 a 9.2450142,9.2450142 0 0 1 -9.245014,9.24501 9.2450142,9.2450142 0 0 1 -9.245015,-9.24501 9.2450142,9.2450142 0 0 1 9.245015,-9.245016 9.2450142,9.2450142 0 0 1 9.245014,9.245016 z"
        />
        <path
          id="up"
          d="m 86.39476,98.333319 h 5.532473 v 5.532471 H 86.39476 Z"
          style={{
            fill: pressedKey(12) ? controllerColors.dpad.pressed : "",
          }}
        />
        <path
          id="left"
          d="m 80.876019,103.88377 h 5.532473 v 5.53248 h -5.532473 z"
          style={{
            fill: pressedKey(14) ? controllerColors.dpad.pressed : "",
          }}
        />
        <path
          id="right"
          d="m 91.936019,103.88377 h 5.532473 v 5.53248 h -5.532473 z"
          style={{
            fill: pressedKey(15) ? controllerColors.dpad.pressed : "",
          }}
        />
        <path
          id="down"
          d="m 86.39476,109.43332 h 5.532473 v 5.53248 H 86.39476 Z"
          style={{
            fill: pressedKey(13) ? controllerColors.dpad.pressed : "",
          }}
        />
      </g>
      <g id="middleButtons">
        <g id="menu">
          <path
            id="menuButton"
            d="m 115.32637,87.758911 a 2.5949686,2.5949686 0 0 1 -2.59497,2.594969 2.5949686,2.5949686 0 0 1 -2.59497,-2.594969 2.5949686,2.5949686 0 0 1 2.59497,-2.594968 2.5949686,2.5949686 0 0 1 2.59497,2.594968 z"
            style={{
              fill: pressedKey(9) ? controllerColors.pressed : "",
            }}
          />
          <path
            className="fade-in-path"
            d="m 111.47653,88.646163 h 2.51393"
            id="path1545"
            style={{
              stroke: pressedKey(9) ? controllerColors.pressedInverse : "",
            }}
          />
          <path
            className="fade-in-path"
            d="m 111.47653,87.746163 h 2.51393"
            id="path1543"
            style={{
              stroke: pressedKey(9) ? controllerColors.pressedInverse : "",
            }}
          />
          <path
            className="fade-in-path"
            d="m 111.47653,86.846163 h 2.51393"
            id="path1538"
            style={{
              stroke: pressedKey(9) ? controllerColors.pressedInverse : "",
            }}
          />
        </g>
        <g id="view">
          <path
            id="viewButton"
            d="m 98.483999,87.758911 a 2.5949686,2.5949686 0 0 1 -2.594969,2.594969 2.5949686,2.5949686 0 0 1 -2.594968,-2.594969 2.5949686,2.5949686 0 0 1 2.594968,-2.594968 2.5949686,2.5949686 0 0 1 2.594969,2.594968 z"
            style={{
              fill: pressedKey(8) ? controllerColors.pressed : "",
            }}
          />
          <path
            className="fade-in-path"
            d="m 94.898422,87.998643 -0.501131,-3e-6 v -1.336349 h 1.987818 v 0.534537"
            id="path1531"
            style={{
              stroke: pressedKey(8) ? controllerColors.pressedInverse : "",
            }}
          />
          <path
            className="fade-in-path"
            id="rect1528"
            d="m 95.3485,87.6475 h 1.987817 v 1.336348 H 95.3485 Z"
            style={{
              stroke: pressedKey(8) ? controllerColors.pressedInverse : "",
            }}
          />
        </g>
      </g>
      <g
        id="mainButtons"
        style={{
          fill: controllerColors.mainButtons.background,
          stroke: controllerColors.mainButtons.stroke,
        }}
      >
        <g id="y">
          <path
            id="path1551"
            d="m 138.21379,80.236343 a 4.1840644,4.1840644 0 0 1 -4.18407,4.184065 4.1840644,4.1840644 0 0 1 -4.18406,-4.184065 4.1840644,4.1840644 0 0 1 4.18406,-4.184064 4.1840644,4.1840644 0 0 1 4.18407,4.184064 z"
            style={{
              fill: pressedKey(3) ? controllerColors.mainButtons.pressed : "",
            }}
          />
          <g aria-label="Y" id="text878">
            <path
              className="fade-in-path button-text y-button"
              d="m 136.21774,77.728556 -1.80524,2.880102 v 2.249649 h -0.68213 v -2.177302 l -1.81212,-2.952449 h 0.75448 l 1.40215,2.294435 1.41594,-2.294435 z"
              id="path882"
              style={{
                fill: controllerColors.mainButtons.pressed,
                stroke: controllerColors.mainButtons.pressed,
              }}
            />
          </g>
        </g>
        <g id="a" transform="translate(0,15.599947)">
          <path
            id="circle1556"
            d="m 138.21379,80.236343 a 4.1840644,4.1840644 0 0 1 -4.18407,4.184065 4.1840644,4.1840644 0 0 1 -4.18406,-4.184065 4.1840644,4.1840644 0 0 1 4.18406,-4.184064 4.1840644,4.1840644 0 0 1 4.18407,4.184064 z"
            style={{
              fill: pressedKey(0) ? controllerColors.mainButtons.pressed : "",
            }}
          />
          <g aria-label="A" id="text887">
            <path
              className="fade-in-path button-text a-button"
              d="m 136.36224,82.66436 h -0.72691 l -0.50299,-1.429716 h -2.21864 l -0.50299,1.429716 h -0.69246 l 1.86724,-5.12975 h 0.90951 z m -1.44005,-2.015382 -0.89917,-2.518367 -0.90262,2.518367 z"
              id="path891"
              style={{
                fill: controllerColors.mainButtons.pressed,
                stroke: controllerColors.mainButtons.pressed,
              }}
            />
          </g>
        </g>
        <g id="x" transform="translate(-7.8004337,7.799947)">
          <path
            id="circle1568"
            d="m 138.21379,80.236343 a 4.1840644,4.1840644 0 0 1 -4.18407,4.184065 4.1840644,4.1840644 0 0 1 -4.18406,-4.184065 4.1840644,4.1840644 0 0 1 4.18406,-4.184064 4.1840644,4.1840644 0 0 1 4.18407,4.184064 z"
            style={{
              fill: pressedKey(2) ? controllerColors.mainButtons.pressed : "",
            }}
          />
          <g aria-label="X" id="text896">
            <path
              className="fade-in-path button-text x-button"
              d="m 136.23607,77.707606 -1.77078,2.535592 1.76734,2.594159 h -0.78893 l -1.39871,-2.111845 -1.43316,2.111845 h -0.74414 l 1.78801,-2.563153 -1.74667,-2.566598 h 0.78548 l 1.38149,2.084284 1.41249,-2.084284 z"
              id="path900"
              style={{
                fill: controllerColors.mainButtons.pressed,
                stroke: controllerColors.mainButtons.pressed,
              }}
            />
          </g>
        </g>
        <g id="b" transform="translate(7.8995663,7.799947)">
          <path
            id="circle1572"
            d="m 138.21379,80.236343 a 4.1840644,4.1840644 0 0 1 -4.18407,4.184065 4.1840644,4.1840644 0 0 1 -4.18406,-4.184065 4.1840644,4.1840644 0 0 1 4.18406,-4.184064 4.1840644,4.1840644 0 0 1 4.18407,4.184064 z"
            style={{
              fill: pressedKey(1) ? controllerColors.mainButtons.pressed : "",
            }}
          />
          <g aria-label="B" id="text905">
            <path
              className="fade-in-path button-text b-button"
              d="m 136.18253,81.259502 q 0,0.382406 -0.1447,0.675239 -0.14469,0.292833 -0.38929,0.482314 -0.28939,0.227376 -0.63734,0.323839 -0.34451,0.09646 -0.8785,0.09646 h -1.81902 v -5.129751 h 1.51929 q 0.56155,0 0.84061,0.04134 0.27905,0.04134 0.53399,0.172255 0.28249,0.148139 0.40996,0.382406 0.12747,0.230822 0.12747,0.554661 0,0.36518 -0.18603,0.623562 -0.18604,0.254938 -0.4961,0.409967 v 0.02756 q 0.52021,0.106798 0.81994,0.458198 0.29972,0.347955 0.29972,0.881945 z m -1.14722,-2.311661 q 0,-0.186035 -0.062,-0.313504 -0.062,-0.127468 -0.19982,-0.206706 -0.16192,-0.09302 -0.39274,-0.113688 -0.23082,-0.02411 -0.57188,-0.02411 h -0.81305 v 1.481392 h 0.88195 q 0.32039,0 0.50987,-0.03101 0.18948,-0.03445 0.3514,-0.137804 0.16192,-0.103353 0.22738,-0.265273 0.0689,-0.165364 0.0689,-0.389296 z m 0.43753,2.339222 q 0,-0.310059 -0.093,-0.492649 -0.093,-0.182591 -0.33762,-0.310059 -0.16536,-0.08613 -0.40308,-0.110243 -0.23426,-0.02756 -0.57188,-0.02756 h -1.07143 v 1.908584 h 0.90262 q 0.44786,0 0.7338,-0.04479 0.28595,-0.04823 0.46854,-0.172255 0.19292,-0.134359 0.2825,-0.306614 0.0896,-0.172255 0.0896,-0.444417 z"
              id="path909"
              style={{
                fill: controllerColors.mainButtons.pressed,
                stroke: controllerColors.mainButtons.pressed,
              }}
            />
          </g>
        </g>
      </g>
      <g id="xboxLogo">
        <path
          className={`fade-in-path no-draw ${
            hasAnimationEnded ? "no-transition" : ""
          }`}
          id="path978"
          d="m 108.88332,76.017342 a 4.560286,4.560286 0 0 1 -4.56028,4.560286 4.560286,4.560286 0 0 1 -4.56029,-4.560286 4.560286,4.560286 0 0 1 4.56029,-4.560286 4.560286,4.560286 0 0 1 4.56028,4.560286 z"
          style={{ fill: controllerColors.logo.background }}
        />
        <path
          className={`fade-in-path no-draw ${
            hasAnimationEnded ? "no-transition" : ""
          }`}
          id="circle1023"
          d="M 207.4707 26.074219 A 17.235727 17.235727 0 0 0 206.32031 27.044922 C 209.32552 28.53194 211.98488 30.095595 214.33594 31.720703 C 207.57647 37.697486 205.47647 46.766161 204.85156 50.851562 A 17.235727 17.235727 0 0 0 205.37305 51.4375 C 208.22116 45.795494 211.91935 40.013061 218.24609 34.699219 C 224.44503 39.905399 228.12563 45.560762 230.95117 51.09375 A 17.235727 17.235727 0 0 0 231.55469 50.367188 C 230.84702 46.094603 228.67839 37.485915 222.1582 31.720703 C 224.42755 30.15208 226.97924 28.639972 229.85547 27.199219 A 17.235727 17.235727 0 0 0 228.56836 26.095703 C 224.46938 26.348549 221.06787 27.402614 218.24609 28.960938 C 215.32127 27.346004 211.7728 26.274422 207.4707 26.074219 z "
          transform="matrix(0.26458333,0,0,0.26458333,46.642255,65.509555)"
          style={{
            strokeWidth: 0,
            fill: controllerColors.logo.foreground,
            stroke: controllerColors.logo.foreground,
          }}
        />
        {/* Kinda hacky */}
        <circle
          onClick={handleLogoClick}
          style={{
            cursor: "pointer",
            stroke: "none",
            fill: "rgba(0, 0, 0)",
          }}
          className="test"
          id="path898"
          cx="104.3274"
          cy="76.022446"
          r="4.5599999"
        />
      </g>
      <g id="topButtonsTriggers">
        <g id="ltContainer">
          <path
            d="m 63.807807,59.00565 3.717632,10.094679 c 0,0 3.148506,-2.308858 7.06343,-3.071057 L 70.871238,55.934593 c 0,0 -3.311469,0.494702 -7.063431,3.071057"
            id="ltStroke"
            className="no-draw"
            style={{
              stroke: controllerColors.topTriggers.lt.stroke,
              strokeWidth: 0.2,
              fill: controllerColors.topTriggers.lt.fill,
            }}
          />
          <path
            d="m 63.807807,59.00565 3.717632,10.094679 c 0,0 3.148506,-2.308858 7.06343,-3.071057 L 70.871238,55.934593 c 0,0 -3.311469,0.494702 -7.063431,3.071057"
            id="ltFill"
            className="no-draw"
            style={{
              stroke: controllerColors.topTriggers.lt.stroke,
              strokeWidth: 0.2,
              opacity: hasAnimationEnded && state.keys[6].value,
              fill:
                hasAnimationEnded &&
                state.keys[6].value &&
                controllerColors.pressed,
            }}
          />
        </g>
        <g id="rtContainer">
          <path
            d="m 144.84217,59.00565 -3.71764,10.094679 c 0,0 -3.1485,-2.308858 -7.06342,-3.071057 l 3.71763,-10.094679 c 0,0 3.31147,0.494702 7.06343,3.071057"
            id="rtStroke"
            className="no-draw"
            style={{
              stroke: controllerColors.topTriggers.rt.stroke,
              strokeWidth: 0.2,
              fill: controllerColors.topTriggers.rt.fill,
            }}
          />
          <path
            d="m 144.84217,59.00565 -3.71764,10.094679 c 0,0 -3.1485,-2.308858 -7.06342,-3.071057 l 3.71763,-10.094679 c 0,0 3.31147,0.494702 7.06343,3.071057"
            id="rtFill"
            className="no-draw"
            style={{
              stroke: controllerColors.topTriggers.rt.stroke,
              strokeWidth: 0.2,
              opacity: hasAnimationEnded && state.keys[7].value,
              fill:
                hasAnimationEnded &&
                state.keys[7].value &&
                controllerColors.pressed,
            }}
          />
        </g>
        <path
          d="m 63.842546,74.546259 c 0,-0.55232 1.741755,-3.059152 3.108502,-4.277314 2.82532,-2.518167 7.77562,-4.313393 12.884322,-4.672499 2.97756,-0.209302 4.312142,0.581026 4.312142,0.581026 0,0 0.603362,0.195943 1.377465,0.798711 0.456718,0.335487 1.047499,0.916807 0.950919,1.013387 -0.09658,0.09658 -1.898719,0.06753 -4.045583,0.180446 -4.229801,0.222463 -6.671834,0.651699 -9.81895,1.72588 -2.605437,0.889294 -6.393139,2.75968 -7.725372,3.814828 -0.573895,0.454534 -1.043445,0.968335 -1.043445,0.835535 z"
          id="lb"
          style={{
            stroke: "none",
            fill: pressedKey(4)
              ? controllerColors.pressed
              : controllerColors.topButtons.lb,
          }}
        />
        <path
          d="m 143.72315,73.810219 c -0.56611,-0.514105 -2.27216,-1.58274 -3.87289,-2.374746 -4.24438,-2.100028 -7.39805,-2.895973 -13.81764,-3.242664 -2.01833,-0.109 -4.21409,-0.107816 -4.27811,-0.171837 -0.064,-0.06402 0.58217,-0.701053 0.58217,-0.701053 1.30007,-0.991507 2.49731,-1.35095 2.49731,-1.35095 0,0 1.43045,-0.60696 4.18811,-0.376979 5.63347,0.469812 9.89884,2.092888 13.0368,4.960808 1.37124,1.253237 3.10076,3.968664 2.83946,4.22996 -0.0711,0.07108 -0.60911,-0.458435 -1.17521,-0.972539 z"
          id="rb"
          style={{
            stroke: "none",
            fill: pressedKey(5)
              ? controllerColors.pressed
              : controllerColors.topButtons.rb,
          }}
        />
      </g>
    </svg>
  );
};

export default ControllerSVG;
