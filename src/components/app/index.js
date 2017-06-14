import React from 'react'
import { Collapse,
         Navbar,
         NavbarToggler,
         NavbarBrand,
         Nav,
         NavItem,
         NavLink
} from 'reactstrap'

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
    storage.clear('data')
    storage.clear('fromDest')
    window.location.reload()
  }

  render () {
    return (
      <div>
        <Navbar color='primary' inverse toggleable>
          <NavbarToggler onClick={this.toggle} />
          <NavbarBrand href='/'>DeutschPad</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto' navbar>
              <NavItem>
                <NavLink href='https://github.com/HansellKopp/Deutsch-Notepad'>Github</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='#' onClick={this.clearAll}>Clear All</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Vocabulary />
      </div>
    )
  }
}

export default App
