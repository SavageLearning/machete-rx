import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { useRequest } from 'redux-query-react';
import * as client from 'machete-api-redux-query-es6-client';
import { Employer, TypedQueryConfig } from 'machete-api-redux-query-es6-client';
import { Update, UpdateStrategy } from 'redux-query';
// interface IProps {}
// import * as storyQueryConfigs from '../query-configs/stories';

const myUpdateStrategy: UpdateStrategy<Employer> =  (prevValue: any, newValue: any) => {
  console.log(prevValue, newValue);
  return newValue; 
}
const myUpdate = { Employer: myUpdateStrategy } as Update<Employer>;

const request: TypedQueryConfig<Employer, any> = {
  transform: body => { 
    const { data } = body;
    const { employers } = data;
    console.log(body);
    return employers as Employer; 
  },
  update: myUpdate

};


export const EmployersView: FunctionComponent = () => {
  // const [{ isPending }] = useRequest(storyQueryConfigs.itemRequest(props.itemId));
  const [{ isPending }] = useRequest<Employer>(client.apiEmployerGet(request));
  // const item = useSelector(state => storySelectors.getItem(state, props.itemId));
  const itemm = useSelector((state: { entities: { employers: Employer[]}}) => {
    return state.entities.employers || [];
  });

  const foo = (item: Employer[]) => {
    return JSON.stringify(item[0])
  }

  return (<div>
    {isPending && "PENDING"}
    {!isPending && foo(itemm)}
  </div>);
}
