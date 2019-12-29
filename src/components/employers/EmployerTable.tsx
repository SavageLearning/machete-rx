import MaterialTable from 'material-table';
import React, { FunctionComponent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRequest } from 'redux-query-react';
import * as client from 'machete-api-redux-query-es6-client';
import { TypedQueryConfig, EmployersList } from 'machete-api-redux-query-es6-client';

const getEmployers = (state: any) => { 
  return state.entities.employers; 
}

const employersRequest: TypedQueryConfig<{ employers: EmployersList[]}, EmployersList[]> = {
  transform: (body: any) => ({ employers: body}),
  update: {
    employers: (oldValue: EmployersList[], newValue: EmployersList[]): EmployersList[] =>  newValue
  }
}


export const EmployerTable: FunctionComponent = () => {
  const [{ isPending }] = useRequest(client.apiEmployersGet({}, employersRequest));
  const employers = useSelector(getEmployers) || [];
  const [selectedRow, setSelectedRow] = useState();
  const [showDialog, setShowDialog] = useState(false);

  return (
    <MaterialTable
        // other props
        title={'Employers'}
        data={employers}
        columns={[
          {title: 'Id', field: 'ID'},
          {title: 'Name', field: 'name'},
          {title: 'Address', field: 'address1'},
          {title: 'City', field: 'city'},
          {title: 'Phone', field: 'phone'},
          {title: 'Zipcode', field: 'zipcode'}
        ]}
    />
  );
}
