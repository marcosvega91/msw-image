import React from 'react';
import {setupWorker, rest} from 'msw'
import ReactDOM from 'react-dom';
import App from './App';
import funny from './funny.png'

const worker = setupWorker(rest.get('https://i.insider.com/5c8045a4d2ce7802a110ce79', async (_, res, ctx) => {
  const image = await fetch(funny).then((res) =>
    res.arrayBuffer(),
  )
  return res(
    ctx.set('Content-Length', image.byteLength.toString()),
    ctx.set('Content-Type', 'image/jpeg'),
    ctx.body(image),
  )
}))

worker.start().then(() =>{
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
})


