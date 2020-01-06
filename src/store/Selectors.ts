
export const getEmployersList = (state: any) => { 
  return state.entities.employersList; 
}

export const getEmployer = (state: any, id: number) => {
  return state.entities.employers[id];
}

export const getEmployersErrors = (state: any) => {
  return state.errors.employers;
}