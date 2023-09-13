import './App.css';
import Cards from './components/Cards.jsx';
import Nav from './components/Nav';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import About from './components/About';
import Detail from './components/Detail'
import Form from './components/Form';
import Favorites from './components/Favorites';

const URL = 'http://localhost:3001/rickandmorty/login/';


function App() {
   const location = useLocation()

   const [characters, setCharacters] = useState([])

   const [access, setAccess] = useState(false)

   const navigate = useNavigate()

   
   const login = async (userData) => {
      try {
         const { email, password } = userData;
         const { data } = await axios(URL + `?email=${email}&password=${password}`)
         const { access } = data;
            
            setAccess(access);
            access && navigate('/home'); 

      } catch (error) {
         console.log(error.message)
      }
      
   }

   useEffect(() => {
      !access && navigate('/')
   }, [access, navigate])

   const onSearch = async (id) => {
      try {
         const { data } = await axios(`http://localhost:3001/rickandmorty/character/${id}`)
         
         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
         }
         
      } catch (error) {
         window.alert('¡No hay personajes con este ID!');
      }
      
   }
   const onClose = (id) => {
      let charactersFiltered = characters.filter(character => character.id !== Number(id))
      setCharacters(charactersFiltered)
   }

   return (
      <div className='App'>
         {
            location.pathname !== "/" && <Nav onSearch={onSearch} />
         }
         
         <Routes>
            <Route path='/' element={<Form login={login}/>} />
            <Route path='/home' element={<Cards characters={characters} onClose={onClose}/>}></Route>
            <Route path='/about' element={<About/>}></Route>
            <Route path='/detail/:id' element={<Detail/>}></Route>
            <Route path='/favorites' element={<Favorites/>}></Route>
         </Routes>
      </div>
   );
}

export default App;

