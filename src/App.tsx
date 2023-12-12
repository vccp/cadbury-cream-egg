import { useRef } from 'react'
// import { LocomotiveScrollProvider } from 'react-locomotive-scroll'
// import './assets/scss/scroll.scss'
import './assets/scss/App.scss'
import Home from './components/Home'

function App() {
  const containerRef = useRef(null)

  return (
    // <LocomotiveScrollProvider
    //   options={
    //     {
    //       smooth: true
    //     }
    //   }
    //   watch={
    //     []
    //   }
    //   containerRef={containerRef}
    // >
      <main data-scroll-container ref={containerRef} className="main">
        <Home />
      </main>
    // </LocomotiveScrollProvider>
  )
}

export default App
