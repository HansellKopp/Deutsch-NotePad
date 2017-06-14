import React from 'react'

import {
  InputGroup,
  Input,
  Row,
  Button
} from 'reactstrap'

import ButtonSelector from '../button-selector'

import style from './style.css'

class Form extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchValue: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.onFromSelect = this.onFromSelect.bind(this)
    this.onDestSelect = this.onDestSelect.bind(this)
  }

  onChange (event) {
    this.props.onChange(event.target.value)
    this.setState({searchValue: event.target.value})
  }

  onKeyDown (event) {
    if (event.key === 'Enter') {
      this.props.onSubmit(this.state.searchValue)
    }
  }

  onFromSelect (from) {
    this.props.onFromChange(from)
  }

  onDestSelect (dest) {
    this.props.onDestChange(dest)
  }

  render () {
    return (
      <div>
        <Row className={style.margin}>
          <InputGroup>
            <ButtonSelector
              onSelected={this.onFromSelect}
              value={this.props.from}
            />
            <ButtonSelector
              onSelected={this.onDestSelect}
              value={this.props.dest}
            />
            <Input
              onChange={this.onChange}
              onKeyDown={this.onKeyDown}
              value={this.state.searchValue}
              placeholder={this.props.placeholder}
            />
            <Button
              outline
              color='success'
              onClick={() => this.props.onSubmit(this.state.searchValue)}
            >
              Search
            </Button>
          </InputGroup>
        </Row>
      </div>
    )
  }
}
Form.PropTypes = {
  title: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string,
  from: React.PropTypes.string.isRequired,
  dest: React.PropTypes.string.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onFromChange: React.PropTypes.func.isRequired,
  onDestChange: React.PropTypes.func.isRequired
}

export default Form
