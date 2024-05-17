import React, { useContext } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import entradaImg from '../../assets/entrada.svg';
import saidaImg from '../../assets/saida.svg';
import totalImg from '../../assets/total.svg';

import { Container } from "./styles";

export function Summary() {

    const { transactions } = useTransactions();

    // const totalDepositos = transactions.reduce((acc, transaction) => {
    //     if (transaction.type === "deposito") {
    //         return acc + transaction.valor
    //     }
    //     return acc;
    // }, 0);

    const summary = transactions.reduce((acc, transaction) => {
        if (transaction.type === "deposito") {
            acc.depositos += transaction.valor;
            acc.total += transaction.valor;
        }
        else {
            acc.deposito += transaction.valor;
            acc.total -= transaction.valor;
        }

        return acc;
    }, {
        depositos: 0,
        deposito: 0,
        total: 0,
    })

    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={entradaImg} alt="Entradas" />
                </header>
                <strong>{new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(summary.depositos)}</strong>
            </div>
            <div>
                <header>
                    <p>Saídas</p>
                    <img src={saidaImg} alt="Saidas" />
                </header>
                <strong>- {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(summary.deposito)}</strong>
            </div>
            <div className="highlight">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total" />
                </header>
                <strong>{new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(summary.total)}</strong>
            </div>
        </Container>
    );
}