import React from 'react'
import ReactDom from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'
import App from './App'

const root = ReactDom.createRoot(document.getElementById('root'))
import { StateContextProvider } from './context'

root.render(
  <ThirdwebProvider desiredChainId={ChainId.Goerli}>
    <BrowserRouter>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </BrowserRouter>
  </ThirdwebProvider>,
)
