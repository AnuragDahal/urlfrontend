import Home from '@/pages/Home'
import "@/index.css"
import { Route, Routes } from 'react-router-dom'
import Redirect from './pages/Redirect'
const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />,
      <Route path="/:uniqueString" element={<Redirect />} />
    </Routes>
    </>
  )
}

export default App