import { Divider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import * as client from 'machete-api-redux-query-es6-client';
import { EmployerVM, TypedQueryConfig } from 'machete-api-redux-query-es6-client';
import React, { FunctionComponent, FormEvent, useState, ChangeEvent } from 'react';
import { useMutation } from 'redux-query-react';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

export const EmployerForm: FunctionComponent = () => {
  const [open, setOpen] = useState(false);
  const [employerVM, setEmployerVM] = useState<EmployerVM>({});
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    postToEmployer(employerVM);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmployerVM({...employerVM, ...{[e.target.id]: e.target.value} })    
  }

  const getEmployer = (state: any, id: number) => {
    return state.entities.employers[id];
  }
//  apiEmployersPost<T>(requestParameters: ApiEmployersPostRequest, requestConfig?: runtime.TypedQueryConfig<T, void>): QueryConfig<T>;

  const getErrors = (state: any) => {
    return state.errors.employers;
  }

  const mutateEmployer: TypedQueryConfig<{ employers: EmployerVM} , EmployerVM>  = {
    queryKey: 'employers',
    transform: (body: EmployerVM) => ({ employers: { [body.id || 0]: body } }),
    update: {
      employers: (oldValue: EmployerVM, newValue: EmployerVM): EmployerVM =>  ({ ...oldValue, ...newValue })
    }
  };

  const { responseBody, responseHeaders } = useSelector(getErrors) || [];


  const [{ isPending }, postToEmployer] = useMutation((newEmployer: EmployerVM) => 
    client.apiEmployersPost<{ employers: EmployerVM}>({
      employerVM: newEmployer
    }, mutateEmployer));

  if (responseBody) { 
    console.log(responseBody); 
    enqueueSnackbar(responseBody.Message, { variant: 'error'});
  }
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">{JSON.stringify(employerVM)}</DialogTitle>
        <DialogContent>
          <TextField id="name" label="Employer name" type="text" onChange={handleChange} />
          <TextField id="address1" label="Address" type="text"  onChange={handleChange} />
          <TextField id="address2" label="Address (2)" type="text"  onChange={handleChange}/>
          <TextField id="city" label="City" type="text" onChange={handleChange} />
          <TextField id="state" label="State" type="text"  onChange={handleChange}/>
          <TextField id="phone" label="Phone" type="phone"  onChange={handleChange}/>
          <TextField id="cellphone" label="Cellphone" type="phone"  onChange={handleChange}/>
          <TextField id="zipcode" label="Zip code" type="text"  onChange={handleChange}/>
          <TextField id="email" label="Email" type="email"  onChange={handleChange}/>
          <Divider />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" type="submit" value="Submit">
            Save
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}