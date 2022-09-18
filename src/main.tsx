import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './store/index';
import Routers from '@/router';
import I18nLayout from '@/layouts/I18nLayout';
import App from './App'
import './index.less'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nLayout>
        <Routers />
      </I18nLayout>
    </Provider>
  </React.StrictMode>
)
