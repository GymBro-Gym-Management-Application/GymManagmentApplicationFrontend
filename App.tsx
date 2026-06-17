import React from 'react';
import QueryProvider from './src/app/providers/QueryProvider';
import AddTrainerPage from './src/features/trainers/pages/AddTrainerPage';
import LoginPage from './src/features/common/LoginPage';

export default function App() {
  return (
    <QueryProvider>
      <LoginPage/>
    </QueryProvider>
  );
}
