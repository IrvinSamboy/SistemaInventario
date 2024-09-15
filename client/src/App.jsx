import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Signin from './Pages/Signin'
import DashBoard from './Pages/DashBoard'
import VerifyAuthentication from './RoutesProtection/VerifyAuthentication'
function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route element={<VerifyAuthentication />}>
            <Route path='/' element={<DashBoard />} />
            <Route path='/signin' element={<Signin />} />
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
