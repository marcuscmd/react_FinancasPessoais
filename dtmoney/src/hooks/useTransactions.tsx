import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface Transaction {
    id: number,
    titulo: string,
    valor: number,
    type: string,
    categoria: string,
    createdAt: string
}
interface TransactionsProviderProps {
    children: ReactNode;
}

// interface TransactionInput { // interface para a funcção que envia dados para o mirage
//     titulo: string,
//     valor: number,
//     type: string,
//     categoria: string,
// }

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);


export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('/transactions')
            .then(response => setTransactions(response.data.transactions));
    }, []);

    async function createTransaction(transactionInput: TransactionInput) {
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date()
        });
        const { transaction } = response.data;

        setTransactions([
            ...transactions,
            transaction
        ]);
    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    );
};


export function useTransactions(){
    const context = useContext(TransactionsContext);

    return context;
}