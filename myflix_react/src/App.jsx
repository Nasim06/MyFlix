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
import MyList from './pages/MyList'

// router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Landing />} />
      <Route path="Movies" element={<Movies />} />
      <Route path="Profile" element={<Profile />} />
      <Route path="MyList" element={<MyList />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
