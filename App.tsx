import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import QueryProvider from './src/app/providers/QueryProvider';
import AdminDashboard from './src/features/dashboard/pages/AdminDashboard';

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryProvider>
        <AdminDashboard />
      </QueryProvider>
    </SafeAreaProvider>
  );
}
