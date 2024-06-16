import * as Yup from 'yup';

export const PISchema = Yup.object({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Required'),
  companyName: Yup.string().required('Required'),
  companyWebsite: Yup.string()
    .url('Invalid URL')
    .required('Required'),
  state: Yup.string().required('Required'),
  zipCode: Yup.string().required('Required'),
});

export const planSelectSchema = Yup.object({
  startDate: Yup.date().required('Required'),
  planType: Yup.string().required('Required'),
});

export const companyInfoSchema = Yup.object({
  fields: Yup.array()
    .min(1, 'At least one field must be selected')
    .required('Required'),
  employees: Yup.string().required('Required'),
  wfhPolicy: Yup.string().required('Required'),
});
