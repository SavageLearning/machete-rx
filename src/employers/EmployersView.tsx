import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { useRequest } from 'redux-query-react';
import * as client from 'machete-api-redux-query-es6-client';
import { Employer, TypedQueryConfig } from 'machete-api-redux-query-es6-client';
import { Update, UpdateStrategy, TransformStrategy } from 'redux-query';
// interface IProps {}
// import * as storyQueryConfigs from '../query-configs/stories';

const myUpdateStrategy: UpdateStrategy<Employer[]> =  (prevValue: any, newValue: any) => {
  console.log(prevValue, newValue);
  return newValue; 
}
const myUpdate = { 'employers': myUpdateStrategy } as Update<{ employers: Employer[] }>;

const myTransform: TransformStrategy<{ employers: Employer[] }, void> =  (body: any) => { 
  const { data } = body;
  const  employers = data as Employer[];
  console.log(body);
  return { employers }; 
}

const request: TypedQueryConfig<{ employers: Employer[] }, any> = {
  transform: myTransform,
  update: myUpdate

}

export const EmployersView: FunctionComponent = () => {
  // const [{ isPending }] = useRequest(storyQueryConfigs.itemRequest(props.itemId));
  // const item = useSelector(state => storySelectors.getItem(state, props.itemId));

  const [{ isPending }] = useRequest<{ employers: Employer[] }>(client.apiEmployerGet(request));
  const itemm = useSelector((state: { entities: { employers: Employer[]}}) => {
    console.log(state);
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
