import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import MainLayout from './MainLayout'
import BodyContainer from './BodyContainer'

const App = () => (
  <Router>
    <MainLayout>
      <Route path='/' exact component={BodyContainer} />
      <Route path='/:pageUsername' component={BodyContainer} />
    </MainLayout>
  </Router>
)

export default App
