import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { setSecondFormData } from '../../Redux/formSlice';
import { toast } from 'react-toastify';
import { companyInfoSchema } from '../../Utilis/validationSchema';

import {
  Grid,
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  Button,
  FormHelperText,
  InputLabel,
} from '@mui/material';

const CompanyInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const secondFormData = useSelector(
    (state) => state.form.secondForm
  );
  const formSuccessfully = () =>
    toast.success('Company Information submitted Successfully', {
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
    initialValues: secondFormData,
    validationSchema:companyInfoSchema,
    onSubmit: (values) => {
      dispatch(setSecondFormData(values));
      navigate('/plan-selection');
      formSuccessfully();
    },
  });

  return (
    <div className="form-Container">
      <h1>Company Information</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="Info-Form"
        style={{ width: '35%' }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl
              component="fieldset"
              fullWidth
              error={
                formik.touched.fields && Boolean(formik.errors.fields)
              }
            >
              <FormLabel component="legend">
                Your company is working on which field?
              </FormLabel>
              <Grid container>
                {['IT Field', 'Mechanical', 'Electrical'].map(
                  (field) => (
                    <Grid item xs={12} sm={4} key={field}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="fields"
                            value={field}
                            onChange={formik.handleChange}
                            checked={formik.values.fields.includes(
                              field
                            )}
                          />
                        }
                        label={field}
                      />
                    </Grid>
                  )
                )}
              </Grid>
              {formik.touched.fields && formik.errors.fields && (
                <FormHelperText>
                  {formik.errors.fields}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl
              fullWidth
              size="small"
              sx={{ maxWidth: '380px' }}
              error={
                formik.touched.employees &&
                Boolean(formik.errors.employees)
              }
            >
              <InputLabel>
                How many employees are in your company?
              </InputLabel>
              <Select
                name="employees"
                value={formik.values.employees}
                onChange={formik.handleChange}
                label="How many employees are in your company?"
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                <MenuItem value="1-10">1-10</MenuItem>
                <MenuItem value="10-20">10-20</MenuItem>
                <MenuItem value="20-30">20-30</MenuItem>
                <MenuItem value="40+">40+</MenuItem>
              </Select>
              {formik.touched.employees &&
                formik.errors.employees && (
                  <FormHelperText>
                    {formik.errors.employees}
                  </FormHelperText>
                )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl
              component="fieldset"
              error={
                formik.touched.wfhPolicy &&
                Boolean(formik.errors.wfhPolicy)
              }
            >
              <FormLabel component="legend">
                Does the company have a WFH policy?
              </FormLabel>
              <RadioGroup
                name="wfhPolicy"
                value={formik.values.wfhPolicy}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="no"
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
              {formik.touched.wfhPolicy &&
                formik.errors.wfhPolicy && (
                  <FormHelperText>
                    {formik.errors.wfhPolicy}
                  </FormHelperText>
                )}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Button
              color="secondary"
              variant="contained"
              fullWidth
              onClick={() => navigate('/')}
            >
              Previous
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CompanyInfo;
