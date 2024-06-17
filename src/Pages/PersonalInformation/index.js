import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { setFirstFormData } from '../../Redux/formSlice';
import { toast } from 'react-toastify';
import { PISchema } from '../../Utilis/validationSchema';
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';

const PersonalInformation = ({ StepperForm }) => {
  const dispatch = useDispatch();
  const firstFormData = useSelector((state) => state.form.firstForm);
  const formSuccessfully = () =>
    toast.success('Personal Information submitted Successfully', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  const formik = useFormik({
    initialValues: firstFormData,
    validationSchema: PISchema,
    onSubmit: (values) => {
      dispatch(setFirstFormData(values));
      StepperForm('CompanyInfo');
      formSuccessfully();
    },
  });

  return (
    <div className="form-Container">
      <h1>Personal Information</h1>
      <form onSubmit={formik.handleSubmit} className="Info-Form">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              label="First Name"
              name="firstName"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              error={
                formik.touched.firstName &&
                Boolean(formik.errors.firstName)
              }
              helperText={
                formik.touched.firstName && formik.errors.firstName
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              label="Last Name"
              name="lastName"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              error={
                formik.touched.lastName &&
                Boolean(formik.errors.lastName)
              }
              helperText={
                formik.touched.lastName && formik.errors.lastName
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              error={
                formik.touched.email && Boolean(formik.errors.email)
              }
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Company Name"
              name="companyName"
              onChange={formik.handleChange}
              value={formik.values.companyName}
              error={
                formik.touched.companyName &&
                Boolean(formik.errors.companyName)
              }
              helperText={
                formik.touched.companyName &&
                formik.errors.companyName
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Company Website"
              name="companyWebsite"
              onChange={formik.handleChange}
              value={formik.values.companyWebsite}
              error={
                formik.touched.companyWebsite &&
                Boolean(formik.errors.companyWebsite)
              }
              helperText={
                formik.touched.companyWebsite &&
                formik.errors.companyWebsite
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl
              fullWidth
              size="small"
              error={
                formik.touched.state && Boolean(formik.errors.state)
              }
            >
              <InputLabel>State</InputLabel>
              <Select
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
                label="State"
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                <MenuItem value="Madhya Pradesh">
                  Madhya Pradesh
                </MenuItem>
                <MenuItem value="Chhattisgarh">Chhattisgarh</MenuItem>
                <MenuItem value="Bihar">Bihar </MenuItem>
              </Select>
              {formik.touched.state && formik.errors.state && (
                <FormHelperText>{formik.errors.state}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              label="Zip Code"
              name="zipCode"
              onChange={formik.handleChange}
              value={formik.values.zipCode}
              error={
                formik.touched.zipCode &&
                Boolean(formik.errors.zipCode)
              }
              helperText={
                formik.touched.zipCode && formik.errors.zipCode
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" variant="contained" type="submit">
              Submit & Next
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default PersonalInformation;
