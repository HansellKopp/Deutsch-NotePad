import React from 'react'
import {
  Badge,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'

const languages = ['de', 'es', 'en', 'it', 'fr', 'ko', 'jp']

class ButtonSelector extends React.Component {
  constructor (props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.onSelected = this.onSelected.bind(this)
    this.state = {
      dropdownOpen: false
    }
  }

  toggle () {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  onSelected (event) {
    this.props.onSelected(event.target.innerText)
  }

  render () {
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          {this.props.caption}{': '}<Badge pill>{this.props.value}</Badge>
        </DropdownToggle>
        <DropdownMenu>
          {
            languages.map((item, key) =>
              <DropdownItem onClick={this.onSelected} key={key}>
                {item}
              </DropdownItem>
          )}
        </DropdownMenu>
      </ButtonDropdown>
    )
  }
}

ButtonSelector.PropTypes = {
  value: React.PropTypes.string.isRequired,
  onSelected: React.PropTypes.func,
  caption: React.PropTypes.string.isRequired
}

export default ButtonSelector
