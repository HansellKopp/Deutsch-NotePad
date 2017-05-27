import React from 'react'
import { Collapse,
         Navbar,
         NavbarToggler,
         NavbarBrand,
         Nav,
         NavItem,
         NavLink
} from 'reactstrap'
import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom'

import storage from '../../utils/storage'
import Vocabulary from '../../sites/Vocabulary'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.clearAll = this.clearAll.bind(this)
    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    }
  }

  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  clearAll () {
    storage.set('phrases', [])
    storage.set('fromDest', ['de', 'es'])
    window.location.reload()
  }

  render () {
    return (
      <Router>
        <div>
          <Navbar color='primary' inverse toggleable>
            <NavbarToggler right onClick={this.toggle} />
            <NavbarBrand href='/'>Deutsch Notepad</NavbarBrand>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                <NavItem>
                  <NavLink tag={Link} to='/Vocabulary'>Vocabulary</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href='https://github.com/HansellKopp/Deutsch-Notepad'>Github</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href='#' onClick={this.clearAll}>Clear All</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          <div>
            <Route exact path='/' component={Vocabulary} />
            <Route exact path='/Vocabulary' component={Vocabulary} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
