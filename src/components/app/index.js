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

const Dummy = () => (<div />)

class App extends React.Component {
  constructor (props) {
    super(props)
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
  render () {
    return (
      <Router>
        <div>
          <Navbar className='container' color='primary' inverse toggleable>
            <NavbarToggler left onClick={this.toggle} />
            <NavbarBrand href='/'>Deutsch Notepad</NavbarBrand>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                <NavItem>
                  <NavLink tag={Link} to='/Grammar'>Grammar</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to='/Verbs'>Verbs</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to='/Vocabulary'>Vocabulary</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to='/Update'>Update</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href='https://github.com/HansellKopp/Deutsch-Notepad'>Github</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          <div className='container'>
            <Route exact path='/Grammar' component={Dummy} />
            <Route exact path='/Verbs' component={Dummy} />
            <Route exact path='/Vocabulary' component={Dummy} />
            <Route exact path='/Update' component={Dummy} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
