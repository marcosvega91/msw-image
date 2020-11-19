import React from 'react';
import {setupWorker, rest} from 'msw'
import ReactDOM from 'react-dom';
import App from './App';
import funnyApp from './funnyApp.png'
import funnyIndex from './funnyIndex.jpg'

const worker = setupWorker(
  rest.get('https://i.insider.com/5c8045a4d2ce7802a110ce79', async (_, res, ctx) => {
    const image = await fetch(funnyApp).then((res) =>
      res.arrayBuffer(),
    )
    return res(
      ctx.set('Content-Length', image.byteLength.toString()),
      ctx.set('Content-Type', 'image/png'),
      ctx.body(image),
    )
  }),
  rest.get('https://i.ytimg.com/vi/Zo_Y-n__Cbc/maxresdefault.jpg', async (_, res, ctx) => {
    const image = await fetch(funnyIndex).then((res) =>
      res.arrayBuffer(),
    )
    return res(
      ctx.set('Content-Length', image.byteLength.toString()),
      ctx.set('Content-Type', 'image/jpeg'),
      ctx.body(image),
    )
  })  
)

worker.start().then(() =>{
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
})


