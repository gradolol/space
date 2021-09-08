import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AllLaunches } from './pages/AllLaunches'
import { SingleLaunch } from './pages/SingleLaunch'
import Container from '@material-ui/core/Container'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Background } from './components/background/Background'

function App() {
  return (
    <Container maxWidth='xl'>
      <Router>
        <Switch>
          <Route exact path='/'>
            <AllLaunches />
          </Route>
          <Route path='/launch/:flightNumber'>
            <SingleLaunch />
          </Route>
          <Route path='*'>Not Found</Route>
        </Switch>
      </Router>
      <Background />
      <ToastContainer autoClose={2000} />
    </Container>
  )
}

export default App
