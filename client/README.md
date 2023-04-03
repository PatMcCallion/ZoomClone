This is a single page application, built using ReactJs, MaterialUI, and Socket.io to mimic an in-browser video chat application. 

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## To run server and client

In the project directory, open two separate terminals:

### For client side
### `cd client`
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### For server side - in other open terminal
### `cd client`
### `nodemon server.js` (warning: must have nodemon installed or this will not function properly)

This monitors the project directory and automatically restarts the node application when it detects any changes. This means that you do not have to stop and restart the server-side files in order for any changes to take effect.

## To mimic a call from a user
#### (Your browser will prompt you to allow usage of your webcam and microphone, please allow these!)

### 1. Enter your name in the "name" bar - it will update your name both above your webcam feed and within the peer connection
### 2. Click the "copy ID to clipboard" button, this will copy your unique peer connection ID code to your computer's clipboard
### 3. Paste your unique peer connection ID code into the ID to call space
### 4. Press Call and wait for the ringtone and alert message to pop-up
### 5. Accept the call and begin your video call (with yourself, since your used your own ID code)