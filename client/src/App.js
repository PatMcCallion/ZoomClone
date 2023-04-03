import './App.css';
import { Typography, AppBar } from '@mui/material';
import VideoPlayer from './components/VideoPlayer';
import Notifications from './components/Notifications';
import Options from './components/Options';


function App() {
  return (
    <div>
      <AppBar position='static'>
        <Typography variant='h3' align='center'>Web Browser Video Chat</Typography>
      </AppBar>
      <VideoPlayer />
      <Options>
        <Notifications />
      </Options>
    </div >
  );
}

export default App;
