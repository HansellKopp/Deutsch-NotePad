import React, { Component } from 'react'
import {
  UncontrolledAlert,
  Container,
  Row
} from 'reactstrap'

import fetchJsonp from 'fetch-jsonp'
import queryString from 'query-string'

import storage from '../../utils/storage'
import DataView from '../../components/data-list'
import SearchFrom from '../../components/search-form'

class Vocabulary extends Component {
  constructor () {
    super()
    this.state = {
      rows: [],
      fromDest: ['de', 'es'],
      message: ''
    }
    this.onChange = this.onChange.bind(this)
    this.getData = this.getData.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.searchItem = this.searchItem.bind(this)
    this.addItem = this.addItem.bind(this)
    this.onSelected = this.onSelected.bind(this)
  }

  componentWillMount () {
    this.getData()
  }

  onChange (filter) {
    this.getData(filter)
  }

  getData (filter = null) {
    let rows = storage.get('phrases')
    if (rows) {
      if (filter) {
        rows = rows.filter(
          x =>
            x.from.text.toLowerCase().startsWith(filter.searchValue.toLowerCase()) ||
            x.dest.text.toLowerCase().startsWith(filter.searchValue.toLowerCase())
        )
      }
      this.setState({ rows })
    }
  }

  onSubmit (filter) {
    this.searchItem(filter)
  }

  searchItem (filter) {
    if (filter) {
      const param = queryString.stringify({
        'from': filter.from,
        'dest': filter.dest,
        'format': 'json',
        'pretty': 'true',
        'phrase': filter.searchValue
      })
      fetchJsonp(`https://glosbe.com/gapi/translate?${param}`)
        .then(response => response.json())
        .then(data => this.addItem(filter, data.tuc))
        .catch(ex => console.log('parsing failed', ex))
    }
  }

  addItem (filter, data) {
    if (data.length > 0) {
      const phrase = this.getPhrase(data, filter.dest)
      const meaningsFrom = this.getMeaning(data, filter.from)
      const meaningsDest = this.getMeaning(data, filter.dest)
      const row = {
        'from': {
          'language': filter.from,
          'text': filter.searchValue,
          'meaning': meaningsFrom
        },
        'dest': {
          'language': filter.dest,
          'text': phrase,
          'meaning': meaningsDest
        }
      }
      this.getData()
      const rows = [row, ...this.state.rows]
      this.setState({
        rows,
        message: ''
      })
      storage.set('phrases', rows)
      storage.set('fromDest', [filter.from, filter.dest])
    } else {
      this.setState({
        message: `sorry ${filter.searchValue} not found!`
      })
    }
  }

  getPhrase (data, language) {
    let phrase = null
    const item = data.find(data => data.phrase.language === language)
    if (item) {
      phrase = item.phrase.text
    }
    return phrase
  }

  getMeaning (data, language) {
    let meaning = null
    if (data[0].meanings) {
      const item = data[0].meanings.find(item => item.language === language)
      if (item) {
        meaning = item.text
      }
    }
    return meaning
  }

  onSelected (event) {
  }

  render () {
    return (
      <Container>
        <SearchFrom
          title='phrase'
          placeholder='phrase'
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          fromDest={this.state.fromDest}
        />
        { this.state.message &&
          <Row>
            <UncontrolledAlert color='danger'>
              {this.state.message}
            </UncontrolledAlert>
          </Row>
        }
        <DataView
          rows={this.state.rows}
          fromDest={this.state.fromDest}
        />
      </Container>
    )
  }
}

export default Vocabulary
