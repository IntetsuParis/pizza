import ReactDOM from 'react-dom/client';
import { store } from './redux/store';
import App from './App';
import { Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <BrowserRouter basename="https://intetsuparis.github.io/git/">
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </Provider>
  </BrowserRouter>,
);
