import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import Modal from 'react-modal';

import { GlobalStyle } from "./styles/global";
import { useState } from "react";
import { TransactionModal } from "./components/TransactionModal";
import { TransactionsProvider } from "./hooks/useTransactions";

Modal.setAppElement('#root');

export function App() {
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  function handleOpenTransactionModal() {
    setIsTransactionModalOpen(true);
  }

  function handleCloseTransactionModal() {
    setIsTransactionModalOpen(false);
  }
  return (
    <TransactionsProvider>
      <Header onOpenTransactionModal={handleOpenTransactionModal}/>

      <Dashboard />

      <TransactionModal 
        isOpen={isTransactionModalOpen}
        onRequestClose={handleCloseTransactionModal}
      />


      <GlobalStyle />
    </TransactionsProvider>
  );
}
