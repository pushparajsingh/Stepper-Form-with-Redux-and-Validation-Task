import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CompanyInfo from '../Pages/CompanyInformation';
import PersonalInfo from '../Pages/PersonalInformation';
import PlanSelection from '../Pages/PlanSelection';
import Layout from '../Componets/Layout';

const PublicRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<PersonalInfo />} />
        <Route path="/CompanyInfo" element={<CompanyInfo />} />
        <Route path="/plan-selection" element={<PlanSelection />} />
      </Routes>
    </Layout>
  );
};

export default PublicRoutes;
