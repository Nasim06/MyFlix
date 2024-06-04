import './css/App.css';
import '@mantine/core/styles.css';
import  {MantineProvider} from '@mantine/core';
import Landing from './pages/Landing';

function App() {
  return (
    <MantineProvider theme={{ colorScheme: 'dark' }}>
      <div className="App" style={{color:'light'}}>
        <img src='../assets/MyFlixLogo.PNG' alt='Logo' className='Logo'/>
        <Landing />
      </div>
    </MantineProvider>
  );
}

export default App;
