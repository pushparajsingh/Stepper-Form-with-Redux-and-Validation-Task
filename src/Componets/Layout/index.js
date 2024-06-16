import React from 'react';
import Header from './Header';

const Index = ({ children }) => {
  return (
    <>
      <Header />
      <>{children}</>
    </>
  );
};

export default Index;
