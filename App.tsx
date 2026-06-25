import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import QueryProvider from './src/app/providers/QueryProvider';
import LoginPage from './src/features/auth/components/LoginPage';
import AdminDashboard from './src/features/dashboard/pages/AdminDashboard';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <SafeAreaProvider>
      <QueryProvider>
        {isAuthenticated
          ? <AdminDashboard />
          : <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />}
      </QueryProvider>
    </SafeAreaProvider>
  );
}
