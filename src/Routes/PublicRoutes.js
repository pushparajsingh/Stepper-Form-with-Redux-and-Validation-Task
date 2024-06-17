import React, { useState } from 'react';
import CompanyInfo from '../Pages/CompanyInformation';
import PersonalInfo from '../Pages/PersonalInformation';
import PlanSelection from '../Pages/PlanSelection';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import Layout from '../Componets/Layout';
import { useSelector } from 'react-redux';

const PublicRoutes = () => {
  const [route, setRoute] = useState('PersonalInfo');
  const { firstForm, secondForm, thirdForm } = useSelector(
    (state) => state.form
  );
  const firstToggle =
    Object.values(firstForm).filter((i) => i == '').length == 0;
  const SecondToggle =
    Object.values(secondForm).filter((i) => i == '').length == 0;
  const thirdToggle =
    Object.values(thirdForm).filter((i) => i == '').length == 0;

  const StepperForm = (navigateValue) => {
    setRoute(navigateValue);
  };
  return (
    <Layout>
      <div className="grop-progressCircle">
        <div className="progressCircle">
          {firstToggle ? (
            <CheckCircleIcon color="success" />
          ) : route == 'PersonalInfo' ? (
            <RadioButtonCheckedIcon color="primary" />
          ) : (
            ''
          )}
          <h5
            style={{ color: route == 'PersonalInfo' ? 'black' : '' }}
          >
            First Step
          </h5>
        </div>
        <div className="progressCircle">
          {SecondToggle ? (
            <CheckCircleIcon color="success" />
          ) : firstToggle ? (
            <RadioButtonCheckedIcon color="primary" />
          ) : (
            ''
          )}
          <h5
            style={{ color: route == 'CompanyInfo' ? 'black' : '' }}
          >
            Second Step
          </h5>
        </div>
        <div className="progressCircle">
          {thirdToggle ? (
            <CheckCircleIcon color="success" />
          ) : firstToggle && SecondToggle ? (
            <RadioButtonCheckedIcon color="primary" />
          ) : (
            ''
          )}
          <h5
            style={{
              color: route == '/PlanSelection' ? 'black' : '',
            }}
          >
            Third Step
          </h5>
        </div>
        <hr />
      </div>
      {route == 'PersonalInfo' ? (
        <PersonalInfo StepperForm={StepperForm} />
      ) : route == 'CompanyInfo' ? (
        <CompanyInfo StepperForm={StepperForm} />
      ) : (
        <PlanSelection StepperForm={StepperForm} />
      )}
    </Layout>
  );
};

export default PublicRoutes;
