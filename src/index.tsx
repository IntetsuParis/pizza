import ReactDOM from 'react-dom/client';
import { store } from './redux/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <BrowserRouter basename='git'>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);
