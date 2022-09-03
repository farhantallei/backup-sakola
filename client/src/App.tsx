import { Login } from '@app/pages/auth';
import { Course, Dashboard } from '@app/pages/restricted';
import { AuthRoute, RestrictedRoute } from '@app/routes';
import { addClassName } from '@app/utils';
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
    <Routes>
      <Route element={<AuthRoute />}>
        <Route path="/" element={<Login />} />
      </Route>
      <Route element={<RestrictedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pelajaran/:courseId" element={<Course />} />
        <Route path="*" element={<h1>Not found</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
