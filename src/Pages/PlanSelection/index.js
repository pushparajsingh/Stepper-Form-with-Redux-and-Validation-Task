import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { setThirdFormData } from '../../Redux/formSlice';
import { toast } from 'react-toastify';
import {
  Grid,
  TextField,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Typography,
  InputAdornment,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { planSelectSchema } from '../../Utilis/validationSchema';

const PlanSelection = ({ StepperForm }) => {
  const dispatch = useDispatch();
  const thirdFormData = useSelector((state) => state.form.thirdForm);
  const [numUsers, setNumUsers] = useState(
    thirdFormData.numUsers || 1
  );
  const formSuccessfully = () =>
    toast.success('Plan Selection submitted Successfully', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  const plans = {
    monthly: { gold: 50, titanium: 80 },
    yearly: { gold: 500, titanium: 800 },
  };

  const formik = useFormik({
    initialValues: thirdFormData,
    validationSchema: planSelectSchema,
    onSubmit: (values) => {
      const price =
        plans[values.planType.split('_')[0]][
          values.planType.split('_')[1]
        ] * numUsers;
      dispatch(setThirdFormData({ ...values, numUsers, price }));
      formSuccessfully();
    },
  });

  useEffect(() => {
    if (formik.values.planType) {
      const price =
        plans[formik.values.planType.split('_')[0]][
          formik.values.planType.split('_')[1]
        ] * numUsers;
      formik.setFieldValue('price', price);
    }
  }, [numUsers, formik.values.planType]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="form-Container">
        <h1>Plan Selection</h1>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    error={
                      formik.touched.startDate &&
                      Boolean(formik.errors.startDate)
                    }
                  >
                    <FormLabel>Start Plan Date</FormLabel>
                    <DatePicker
                      value={formik.values.startDate}
                      onChange={(date) =>
                        formik.setFieldValue('startDate', date)
                      }
                      renderInput={(props) => (
                        <TextField {...props} />
                      )}
                    />
                    {formik.touched.startDate &&
                      formik.errors.startDate && (
                        <FormHelperText>
                          {formik.errors.startDate}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    component="fieldset"
                    fullWidth
                    error={
                      formik.touched.planType &&
                      Boolean(formik.errors.planType)
                    }
                  >
                    <FormLabel component="legend">
                      Select Plan
                    </FormLabel>
                    <RadioGroup
                      name="planType"
                      value={formik.values.planType}
                      onChange={formik.handleChange}
                    >
                      {[
                        'monthly_gold',
                        'monthly_titanium',
                        'yearly_gold',
                        'yearly_titanium',
                      ].map((plan) => (
                        <FormControlLabel
                          key={plan}
                          value={plan}
                          control={<Radio />}
                          label={`${
                            plan
                              .split('_')[0]
                              .charAt(0)
                              .toUpperCase() +
                            plan.split('_')[0].slice(1)
                          } ${
                            plan
                              .split('_')[1]
                              .charAt(0)
                              .toUpperCase() +
                            plan.split('_')[1].slice(1)
                          } - $${
                            plans[plan.split('_')[0]][
                              plan.split('_')[1]
                            ]
                          }`}
                        />
                      ))}
                    </RadioGroup>
                    {formik.touched.planType &&
                      formik.errors.planType && (
                        <FormHelperText>
                          {formik.errors.planType}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Number of Users"
                    type="number"
                    name="numUsers"
                    value={numUsers}
                    InputProps={{ inputProps: { min: 1 } }}
                    onChange={(e) => setNumUsers(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              display="flex"
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12}>
                <Typography variant="h4">Order Summary</Typography>
                <Typography>
                  Plan: {formik.values.planType}
                </Typography>
                <Typography>Number of Users: {numUsers}</Typography>
                <Typography>
                  Total Price: ${formik.values.price}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <div className="buttonGroup">
            <div>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => StepperForm('CompanyInfo')}
              >
                Previous
              </Button>
              <Button
                color="primary"
                variant="contained"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </LocalizationProvider>
  );
};

export default PlanSelection;
