import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import QueryProvider  from './src/app/providers/QueryProvider';
import LoginPage      from './src/features/auth/components/LoginPage';
import AdminDashboard from './src/features/dashboard/pages/AdminDashboard';
import MemberApp      from './src/features/member-app/MemberApp';
import TrainerApp     from './src/features/trainer-app/TrainerApp';

type AppState =
  | { status: 'unauthenticated' }
  | { status: 'admin' }
  | { status: 'member';  userId: number }
  | { status: 'trainer'; userId: number };

export default function App() {
  const [appState, setAppState] = useState<AppState>({ status: 'unauthenticated' });

  const handleLoginSuccess = (role: string, userId: number) => {
    if (role === 'client')       setAppState({ status: 'member',  userId });
    else if (role === 'trainer') setAppState({ status: 'trainer', userId });
    else                         setAppState({ status: 'admin' });
  };

  return (
    <SafeAreaProvider>
      <QueryProvider>
        {appState.status === 'unauthenticated' && (
          <LoginPage onLoginSuccess={handleLoginSuccess} />
        )}
        {appState.status === 'admin' && (
          <AdminDashboard />
        )}
        {appState.status === 'member' && (
          <MemberApp
            userId={appState.userId}
            onLogout={() => setAppState({ status: 'unauthenticated' })}
          />
        )}
        {appState.status === 'trainer' && (
          <TrainerApp
            trainerId={appState.userId}
            onLogout={() => setAppState({ status: 'unauthenticated' })}
          />
        )}
      </QueryProvider>
    </SafeAreaProvider>
  );
}
