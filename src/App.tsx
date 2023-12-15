import { useRef } from 'react'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import { LocomotiveScrollProvider } from 'react-locomotive-scroll'
// import './assets/scss/scroll.scss'
import './assets/scss/App.scss'
import Home from './components/Home'
import Question from './components/Question';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/question/:queId",
    element: <Question />,
  }
]);

function App() {
  const containerRef = useRef(null)

  return (
      <main data-scroll-container ref={containerRef} className="main">
        <RouterProvider router={router} />
      </main>
  )
}

export default App
