# Controller Overlay

A simple application to display a controller overlay, for streaming or recording use.

## Specs
- Size
  - .zip 139 MB
  - .rar 117 MB
  - uncompressed 389 MB (size on disk ~490MB)
- Memory (RAM)
  - Up to ~50 MB
- CPU 
  - Negligible

## Features

- Draws a controller overlay on application launch
- Displays controller button presses and joystick movement
- Allows for customizable background color, defaults to green (#00FF00) for chroma keying
- 4 color theme presets (Black, White, Blue, Red)

## Future Features

- Selection between DualShock layout and Xbox layout
- Completely customizeable color theme
- Better application icon

## Technology

The core of the application is made with React, with `create-react-app`, and wrapped in Electron, with the final build made with Electron Packager as a standalone executable.

## Install

This project has been developed on [WSL2](https://docs.microsoft.com/en-us/windows/wsl/install-win10), and all commands are for WSL2. Builds currently target Windows x64 release.

Install system libraries
```
$ sudo apt update
$ sudo apt install libnss3-dev libgdk-pixbuf2.0-dev libgtk-3-dev libxss-dev

```

Install dependencies for the Electron wrapper

```
$ rm -rf node_modules/
$ npm install --platform=win32
```

Install dependencies for React app

```
$ npm install --prefix frontend
```

Run Electron app in development mode

```
$ npm run dev
```

Run React app in development mode (opens browser)

```
$ npm start --prefix frontend
```

## Build

To create a build targetting Windows x64
```
$ npm run build
```

## Contribution

This project is a personal project and not expected to gain a lot of traction, however if there are developers willing to contribute by opening pull requests, I will gladly set up proper contribution guidelines and review pull requests.

## Alternatives

A pretty popular existing solution is https://gamepadviewer.com/, however this application goes for a more minimalistic design as well as being a downloadable standalone application.
