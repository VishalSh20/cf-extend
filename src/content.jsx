import './index.css'

import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import ContentPage from '@/content/content'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'


const root = document.createElement('div');
root.id = '__cf_reimagine_content_container'
document.body.append(root);

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
    <ContentPage />
    </Provider>
  </StrictMode>
);