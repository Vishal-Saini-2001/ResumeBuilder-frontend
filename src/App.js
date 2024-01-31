import './App.css';
import Home from './routes/Home';
import Register from './routes/Register'
import Login from './routes/Login';
import Form from './routes/Form';
import Dashboard from './routes/Dashboard'
import ResumePreviews from './routes/ResumePreviews';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import ChooseTemplate from './routes/ChooseTemplate';


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>}></Route>
        <Route exact path='/form' element={<Form/>}></Route>
        <Route exact path='/register' element={<Register/>}></Route>
        <Route exact path='/login' element={<Login/>}></Route>
        <Route exact path='/resume_previews' element={<ResumePreviews/>}></Route>
        <Route exact path='/dashboard' element={<Dashboard/>}></Route>
        <Route exact path='/choose_template' element={<ChooseTemplate/>}></Route>
      </Routes>
    </BrowserRouter>
    
        
    
    </>
    
  );
}

export default App;
