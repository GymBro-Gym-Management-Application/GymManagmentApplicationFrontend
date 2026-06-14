import React from 'react';
import QueryProvider from './src/app/providers/QueryProvider';
import AddTrainerPage from './src/features/trainers/pages/AddTrainerPage';

export default function App() {
  return (
    <QueryProvider>
      <AddTrainerPage />
    </QueryProvider>
  );
}
