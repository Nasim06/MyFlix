import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider 
} from 'react-router-dom'

// layouts and pages
import RootLayout from './layouts/RootLayout'
import Landing from './pages/Landing'
import Movies from './pages/Movies'
import Profile from './pages/Profile'
import MyLists from './pages/MyLists'
import SignIn from './pages/SignIn'
import Register from './pages/Register'
import { useState } from 'react'
import SignedInContext from './utils/SignedInContext'

// router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Landing />} />
      <Route path="Movies" element={<Movies />} />
      <Route path="MyLists" element={<MyLists />} />
      <Route path="Profile" element={<Profile />} />
      <Route path="SignIn" element={<SignIn />} />
      <Route path="Register" element={<Register />} />
    </Route>
  )
)

function App() {

  const [signedIn, setSignedIn] = useState(false);
  const handleSignIn = (isLoggedIn) => {
    setSignedIn(isLoggedIn);
  };

  return (
    <SignedInContext.Provider value={{ signedIn, setSignedIn: handleSignIn }}>
      <RouterProvider router={router} />
    </SignedInContext.Provider>
  )
}

export default App
