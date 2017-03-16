import React from 'react'

import NavBar from './NavBar'

const MainLayout = ({ children }) => (
  <div>
    <NavBar />
    {children}
  </div>
)

MainLayout.propTypes = {
  children: React.PropTypes.node
}

export default MainLayout
