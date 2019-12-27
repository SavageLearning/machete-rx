import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { useRequest } from 'redux-query-react';
import * as client from 'machete-api-redux-query-es6-client';
import { Employer, TypedQueryConfig } from 'machete-api-redux-query-es6-client';

const getEmployers = (state: any) => { 
  return state.entities.employers; 
}

const employersRequest: TypedQueryConfig<{employers: Employer[]}, any> = {
  transform: (body: any) => ({ employers: body }),
  update: {
    employers: (oldValue: Employer[], newValue: Employer[]): Employer[] =>  newValue
  }
}

export const EmployersView: FunctionComponent = () => {
  const [{ isPending }] = useRequest(client.apiEmployerGet(employersRequest));
  const employers = useSelector(getEmployers) || [];

  return (<div>
    {isPending && "PENDING"}
    {!isPending && JSON.stringify(employers)}
  </div>);
}
