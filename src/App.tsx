import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import { AddQuestions } from './components/AddQuestions/AddQuestions';
import { QuestionsForm } from './components/QuestionsForm/QuestionsForm';
import { ButtonGroup, Button } from '@mui/material';

function App() {
  return (
    <div className="App">
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Link to="/form">
          <Button variant='contained'>Add Questions</Button>
        </Link>
        <Link to="/view">
          <Button variant='contained'>Edit Questions</Button>
        </Link>
      </ButtonGroup>
      <Routes>
        <Route path="/" element={<AddQuestions />} />
        <Route path="/form" element={<AddQuestions />} />
        <Route path="/view" element={<QuestionsForm />} />
        <Route path="*" element={<div><h3>Page not found!</h3></div>} />
      </Routes>
    </div>
  );
}

export default App;
