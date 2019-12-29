import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { useRequest } from 'redux-query-react';
import * as client from 'machete-api-redux-query-es6-client';
import { TypedQueryConfig, EmployersList } from 'machete-api-redux-query-es6-client';

const getEmployers = (state: any) => { 
  return state.entities.employers; 
}

const employersRequest: TypedQueryConfig<{ employers: EmployersList[]}, EmployersList[]> = {
  transform: (body) => ({ employers: body}),
  update: {
    employers: (oldValue: EmployersList[], newValue: EmployersList[]): EmployersList[] =>  newValue
  }
}

export const EmployersView: FunctionComponent = () => {
  const [{ isPending }] = useRequest(client.apiEmployersGet({}, employersRequest));
  const employers = useSelector(getEmployers) || [];

  return (<div>
    {isPending && "PENDING"}
    {!isPending && JSON.stringify(employers)}
  </div>);
}
