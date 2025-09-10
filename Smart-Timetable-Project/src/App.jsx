import { useState } from 'react'
import './App.css'
import TopBar from './top-bar.jsx' 
import Carousel from './body.jsx'
import Landing from './Landing.jsx'
<body>
  
</body>

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <TopBar />
    <Landing />
    <Carousel />
    </>
  )
}

export default App
