import React from 'react';
import ReactDOM from 'react-dom/client';
import { Model, createServer } from 'miragejs';
import { App } from './App';
import { transitions } from 'polished';
import { TransactionsTable } from './components/TransactionsTable';

createServer({

  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          titulo: 'Desenvolvimento web site',
          type: 'deposito',
          categoria: 'Dev',
          valor: 3000,
          createdAt: new Date('2021-02-14 09:00:00'),
        },
        {
          id: 2,
          titulo: 'Supermercado',
          type: 'saida',
          categoria: 'Compras',
          valor: 300,
          createdAt: new Date('2021-04-04 09:00:00'),
        },
        {
          id: 3,
          titulo: 'Contas mensais',
          type: 'saida',
          categoria: 'Boletos',
          valor: 1000,
          createdAt: new Date('2021-04-30 11:00:00'),
        },
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data);
    })
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
