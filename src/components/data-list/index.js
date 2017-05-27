import React, { Component } from 'react'
import {
  Badge,
  Table,
  Row
} from 'reactstrap'

class DataList extends Component {
  render () {
    return (
      <Row>
        <Table striped bordered>
          <thead>
            <tr>
              <th><h3><Badge pill>{this.props.fromDest[0]}</Badge>{' '}</h3></th>
              <th><h3><Badge pill>{this.props.fromDest[1]}</Badge>{' '}</h3></th>
            </tr>
          </thead>
          <tbody>
            { this.props.rows.map((row, key) =>
              <tr key={key}>
                <td>
                  <div>
                    <h5>{row.from.text}</h5>
                    <p>{row.from.meaning}</p>
                  </div>
                </td>
                <td>
                  <div>
                    <h5>{row.dest.text}</h5>
                    <p>{row.dest.meaning}</p>
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
  fromDest: React.PropTypes.array.isRequired,
  onClick: React.PropTypes.func
}

export default DataList
