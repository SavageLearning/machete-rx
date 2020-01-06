import { Divider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import * as client from 'machete-api-redux-query-es6-client';
import { EmployerVM, EmployerVMFromJSON } from 'machete-api-redux-query-es6-client';
import React, { FunctionComponent, useState, ChangeEvent } from 'react';
import { useMutation } from 'redux-query-react';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { getEmployersErrors } from '../../store/Selectors';
import { mutateEmployer } from '../../store/Mutations';
import { useForm } from 'react-hook-form';

export const EmployerForm: FunctionComponent = () => {
  const [open, setOpen] = useState(false);
  const [employerVM, setEmployerVM] = useState<EmployerVM>();
  const { enqueueSnackbar } = useSnackbar();
  const { responseBody } = useSelector(getEmployersErrors) || [];

  const [{ status }, postToEmployer] = useMutation((newEmployer: EmployerVM) => 
    client.apiEmployersIdPut<{ employers: EmployerVM}>({
      id: employerVM?.id || 0,
      employerVM: newEmployer
    }, mutateEmployer));

  const { register, handleSubmit, errors } = useForm<EmployerVM>();
  const onSubmit = (data: EmployerVM) => { 
    postToEmployer(data);
   }


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleSubmit = (e: FormEvent) => {
  //   e.preventDefault();
  //   postToEmployer(employerVM);
  // }

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setEmployerVM({...employerVM, ...{[e.target.id]: e.target.value} })    
  // }

  if (responseBody) { 
    if (status === 500) {
      enqueueSnackbar(responseBody.Message, { variant: 'error'});
    }
    if (status === 400) {
      enqueueSnackbar(JSON.stringify(responseBody), { variant: 'warning'});
    }

  }
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="form-dialog-title">{`Title!`}</DialogTitle>
        <DialogContent>
          <TextField name="name" label="Employer name" type="text" 
            inputRef={register({ required: true })}
            helperText={errors.name && "Employer name required"}
          />
          <TextField name="address1" label="Address" type="text" 
            inputRef={register({ required: true })}
            helperText={errors.address1 && "Address required"}
          />
          <TextField name="address2" label="Address (2)" type="text" 
            inputRef={register({})}
          />
          <TextField name="city" label="City" type="text" 
            inputRef={register({ required: true })}
            helperText={errors.city && "City required"}
          />
          <TextField name="state" label="State" type="text" 
            inputRef={register({ required: true })}
            helperText={errors.state && "State required"}
          />
          <TextField name="phone" label="Phone" type="phone" 
            inputRef={register({ required: true })}
            helperText={errors.phone && "Phone required in ###-###-#### format"}
          />
          <TextField name="cellphone" label="Cellphone" type="phone" 
            inputRef={register({})}
          />
          <TextField name="zipcode" label="Zip code" type="text" 
            inputRef={register({ required: true })}
            helperText={errors.zipcode && "Zipcode required"}
          />
          <TextField name="email" label="Email" type="email" 
            inputRef={register({})}
          />
          <Divider />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" type="submit" value="Submit">
            Save
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}