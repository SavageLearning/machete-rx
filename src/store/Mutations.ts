import { TypedQueryConfig, EmployerVM } from "machete-api-redux-query-es6-client";

export const mutateEmployer: TypedQueryConfig<{ employers:  EmployerVM}, EmployerVM>  = {
  queryKey: 'employers',
  //transform: (body: EmployerVM) => ({ employers: { [body.id || 0]: body } }),
  update: {
    employers: (oldValue: EmployerVM, newValue: EmployerVM): EmployerVM =>  ({ ...oldValue, ...newValue })
  }
};