import React, { Component } from 'react'
import {
  Badge,
  Table,
  Row
} from 'reactstrap'

import style from './style.css'

class DataList extends Component {
  render () {
    const items = this.props.rows
    return (
      <Row className={style.margin}>
        <Table striped bordered>
          <thead>
            <tr>
              <th><h5><Badge pill>{this.props.from}</Badge>{' '}</h5></th>
              <th><h5><Badge pill>{this.props.dest}</Badge>{' '}</h5></th>
            </tr>
          </thead>
          <tbody>
            { items.map((row, key) =>
              <tr key={key}>
                <td>
                  <div>
                    { row[this.props.from].map((item, id) =>
                      <p
                        className={id === 0 ? style.wordHead : style.wordBody}
                        key={id}>
                        {item}
                      </p>
                    )}
                  </div>
                </td>
                <td>
                  <div>
                    { row[this.props.dest].map((item, id) =>
                      <p
                        className={id === 0 ? style.wordHead : style.wordBody}
                        key={id}>
                        {item}
                      </p>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Row>
    )
  }
}
DataList.PropTypes = {
  rows: React.PropTypes.array.isRequired,
  from: React.PropTypes.array.isRequired,
  dest: React.PropTypes.array.isRequired,
  onClick: React.PropTypes.func
}

export default DataList
