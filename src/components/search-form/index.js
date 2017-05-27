import React from 'react'

import {
  InputGroup,
  Input,
  InputGroupButton,
  Row
} from 'reactstrap'

import ButtonSelector from '../button-selector'

class Form extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      from: this.props.fromDest[0],
      dest: this.props.fromDest[1],
      searchValue: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onFromSelect = this.onFromSelect.bind(this)
    this.onDestSelect = this.onDestSelect.bind(this)
  }

  onChange (event) {
    this.setState(
      {
        searchValue: event.target.value
      },
      this.props.onChange({
        from: this.state.from,
        dest: this.state.dest,
        searchValue: event.target.value
      })
    )
  }

  onKeyDown (event) {
    if (event.key === 'Enter') {
      this.props.onSubmit(this.state)
    }
  }

  onSubmit (event) {
    this.props.onSubmit(this.state)
  }

  onFromSelect (from) {
    this.setState({ from })
  }

  onDestSelect (dest) {
    this.setState({ dest })
  }

  render () {
    return (
      <div>
        <Row>
          <ButtonSelector
            caption='From'
            onSelected={this.onFromSelect}
            value={this.state.from}
          />
          <ButtonSelector
            caption='Dest'
            onSelected={this.onDestSelect}
            value={this.state.dest}
          />
        </Row>
        <Row>
          <InputGroup>
            <Input
              onChange={this.onChange}
              onKeyDown={this.onKeyDown}
              value={this.state.searchValue}
              placeholder={this.props.placeholder}
            />
            <InputGroupButton
              color='success'
              onClick={this.onSubmitClick}
            >
              Submit
            </InputGroupButton>
          </InputGroup>
        </Row>
      </div>
    )
  }
}
Form.PropTypes = {
  title: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string,
  fromDest: React.PropTypes.array.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onFromChange: React.PropTypes.func.isRequired,
  onDestChange: React.PropTypes.func.isRequired
}

export default Form
