import { useRef } from 'react'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import { LocomotiveScrollProvider } from 'react-locomotive-scroll'
import Home from './components/Home'
import Question from './components/Question';
import Result from './components/Result';
import QuizForm from './components/QuizForm';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/question/:queId",
    element: <Question />,
  },
  {
    path: "/result",
    element: <Result />,
  },
  {
    path: "/form",
    element: <QuizForm />,
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
