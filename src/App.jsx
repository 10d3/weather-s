import './App.css'
import {useState} from 'react'
import Search from '../components/search/Search'
import Navbar from '../components/navbar/Navbar'

export default function App() {

  
  const [darkMode, setDarkMode] = useState("light");
  
  return (
    <main data-theme={darkMode}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Search/>
    </main>
  )
}
