import { TypedQueryConfig, EmployersList } from "machete-api-redux-query-es6-client";

export const employersRequest: TypedQueryConfig<{ employersList: EmployersList[]}, EmployersList[]> = {
  queryKey: "employersList",
  transform: (body: any) => ({ employersList: body}),
  update: {
    employersList: (oldValue: EmployersList[], newValue: EmployersList[]): EmployersList[] =>  newValue
  }
}