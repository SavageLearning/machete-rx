import MaterialTable from 'material-table';
import React, { FunctionComponent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRequest } from 'redux-query-react';
import * as client from 'machete-api-redux-query-es6-client';
import { EmployerForm } from './EmployerForm';
import { employersRequest } from '../../store/Requests';
import { getEmployersList } from '../../store/Selectors';

export const EmployersTable: FunctionComponent = () => {
  const [{ isPending }] = useRequest(client.apiEmployersGet({}, employersRequest));
  const employersList = useSelector(getEmployersList) || [];
  const [selectedRow, setSelectedRow] = useState();
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div>

      <MaterialTable
          // other props
          title={'Employers'}
          data={employersList}
          columns={[
            {title: 'Id', field: 'ID'},
            {title: 'Name', field: 'name'},
            {title: 'Address', field: 'address1'},
            {title: 'City', field: 'city'},
            {title: 'Phone', field: 'phone'},
            {title: 'Zipcode', field: 'zipcode'}
          ]}
          actions={[
            {
              icon: 'edit',
              tooltip: 'Edit employer',
              onClick: (event, rowData) => alert("You saved " + rowData.name)
            }
          ]}
      />
      <EmployerForm/>
    </div>

  );
}
