import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom'
import Home from './pages/Home'
import NotFoundPage from './pages/404page'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="details/:id" element={<Home/>}/>
        <Route path="/not-found" element={<NotFoundPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </Router>
  )
}

export default App
