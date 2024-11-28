import './App.css';

import MyDiagram from './Components/Diagram/MyDiagram';
import ProbabilityPanel from './Components/ProbabilityPanel/ProbabilityPanel';
import Footer from './Components/Fotter'
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container className='app'>
      <Container className='content'>
        <MyDiagram />
        <ProbabilityPanel />
      </Container>

      <Footer/>
    </Container>
  );
}

export default App;
