import Routes from './routes/Routes'
import { PrimeReactProvider } from 'primereact/api';

function App() {
  return (
    <PrimeReactProvider>
      <Routes/>
    </PrimeReactProvider>
  )
}

export default App
