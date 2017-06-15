import React, { Component } from 'react'
import { UncontrolledAlert } from 'reactstrap'

import queryString from 'query-string'

import storage from '../../utils/storage'
import DataView from '../../components/data-list'
import SearchFrom from '../../components/search-form'

class Vocabulary extends Component {
  constructor () {
    super()
    const fromDest = storage.get('fromDest')
    const from = fromDest !== null ? fromDest[0] : 'de'
    const dest = fromDest !== null ? fromDest[1] : 'es'
    this.state = {
      from,
      dest,
      rows: this.getData(from, dest),
      message: ''
    }
    this.onChange = this.onChange.bind(this)
    this.getData = this.getData.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.searchItem = this.searchItem.bind(this)
    this.addItem = this.addItem.bind(this)
    this.onFromChange = this.onFromChange.bind(this)
    this.onDestChange = this.onDestChange.bind(this)
  }

  onChange (filter) {
    this.setState({
      rows: this.getData(this.state.from, this.state.dest, filter),
      message: ''
    })
  }

  getData (from, dest, filter = null) {
    let rows = storage.get('data')
    if (!rows) {
      return []
    }
    rows = rows.filter(
        x => x[from] !== undefined && x[dest] !== undefined
    )
    if (filter) {
      rows = rows.filter(
        x => x[from][0].toLowerCase().startsWith(filter.toLowerCase())
      )
    }
    return rows
  }

  onSubmit (filter) {
    this.searchItem(filter)
  }

  searchItem (filter) {
    if (filter) {
      const param = queryString.stringify({
        'from': this.state.from,
        'dest': this.state.dest,
        'phrase': filter
      })
      var init = { method: 'GET',
        headers: new window.Headers(),
        mode: 'cors',
        cache: 'default'
      }
      window.fetch(`/api?${param}`, init)
        .then(response => {
          if (!response.ok) {
            this.setState({ message: `${filter} not found` })
            return null
          }
          return response.json()
        })
        .then(data => this.addItem(data, filter))
        .catch(ex => console.log('parsing failed', ex))
    }
  }

  addItem (row, filter) {
    if (!row) {
      return
    }
    const newRows = this.getData(this.state.from, this.state.dest)
    const rows = [row, ...newRows].sort(
      (a, b) => a[this.state.from] > b[this.state.from]
    )
    storage.set('data', rows)
    storage.set('fromDest', [this.state.from, this.state.dest])
    this.onChange(filter)
  }

  onFromChange (from) {
    const fromDest = [from, this.state.dest]
    this.setState(
      {
        from,
        rows: this.getData(from, this.state.dest)
      }
    )
    storage.set('fromDest', fromDest)
  }

  onDestChange (dest) {
    const fromDest = [this.state.from, dest]
    this.setState(
      {
        dest,
        rows: this.getData(this.state.from, dest)
      }
    )
    storage.set('fromDest', fromDest)
  }

  render () {
    console.log(this.state)
    return (
      <div>
        { this.state.message &&
          <UncontrolledAlert color='danger'>
            {this.state.message}
          </UncontrolledAlert>
        }
        <SearchFrom
          title='phrase'
          placeholder='phrase'
          from={this.state.from}
          dest={this.state.dest}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          onFromChange={this.onFromChange}
          onDestChange={this.onDestChange}
        />
        <DataView
          rows={this.state.rows}
          from={this.state.from}
          dest={this.state.dest}
        />
      </div>
    )
  }
}

export default Vocabulary
