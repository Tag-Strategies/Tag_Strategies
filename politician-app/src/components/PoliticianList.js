import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import fetchPoliticians from '../api/politicianApi.js'

function PoliticianList(props){
  return (
    <div>
      <BootstrapTable data={props.politicians}>
        <TableHeaderColumn isKey={true} dataField='name'>Name</TableHeaderColumn>
        <TableHeaderColumn isKey={false} dataField='pk'>PK</TableHeaderColumn>
      </BootstrapTable>
    </div>
  )
}

export default PoliticianList