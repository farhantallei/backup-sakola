import { Login } from '@app/pages/auth';
import { Course, Draft, Home } from '@app/pages/restricted';
import { AuthRoute, RestrictedRoute } from '@app/routes';
import { addClassName } from '@app/utils';
import NavigationProgressProvider from '@progress';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
  useEffect(() => {
    const doc = document.documentElement;
    const body = document.body;
    const root = document.getElementById('root')!;

    addClassName(doc, 'bg-white');
    addClassName(body, 'text-cyan-900');
    addClassName(root, 'flex flex-col');
  }, []);

  return (
    <NavigationProgressProvider>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path="/" element={<Login />} />
        </Route>
        <Route element={<RestrictedRoute />}>
          <Route path="/beranda" element={<Home />} />
          <Route path="/draf" element={<Draft />} />
          <Route path="/pelajaran/:courseId" element={<Course />} />
          <Route path="*" element={<h1>Not found</h1>} />
        </Route>
      </Routes>
    </NavigationProgressProvider>
  );
}

export default App;
