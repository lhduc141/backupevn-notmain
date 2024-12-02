import { Loadable, LoadingPage } from 'components';
import ErrorBoundary from 'pages/500';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from 'routes';

function App() {
  const router = createBrowserRouter(routes);

  return (
    <LoadingPage>
      <ErrorBoundary>
        <Loadable>
          <RouterProvider router={router} />
        </Loadable>
      </ErrorBoundary>
    </LoadingPage>
  );
}

export default App;
