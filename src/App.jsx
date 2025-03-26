import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CertificateGenerator from './CertificateGen'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CertificateGenerator />
    </>
  )
}

export default App
