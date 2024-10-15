import { Map } from './Map/Map';
import { Sidebar } from './Sidebar/Sidebar';
import './App.css';
import { AquaViaContextProvider } from './Context/AquaViaContext';

function App() {
  return (
    <AquaViaContextProvider>
      <Sidebar />
      <Map />
    </AquaViaContextProvider>
  )
}

export default App

/*

<Button onClick={toggleDrawer(true)} className='drawer__button'> </Button>
<Drawer open={open} onClose={toggleDrawer(false)}>
  {DrawerList}
</Drawer>
*/