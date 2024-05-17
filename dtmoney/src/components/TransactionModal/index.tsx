import Modal from 'react-modal';
import { Container, ContainerTipo, RadioBox } from './styles';
import closeImg from '../../assets/fechar.svg';
import depositarImg from '../../assets/entrada.svg';
import retirarImg from '../../assets/saida.svg';
import { FormEvent, useState, useContext } from 'react';
import { api } from '../../services/api';
import { useTransactions } from '../../hooks/useTransactions';

interface TransactionModal {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function TransactionModal({ isOpen, onRequestClose }: TransactionModal) {

    const { createTransaction } = useTransactions();


    const [titulo, setTitulo] = useState('');
    const [valor, setValor] = useState(0);
    const [type, setType] = useState('deposito');
    const [categoria, setCategoria] = useState('');

    async function hendleCreationTrasaction(event: FormEvent) {
        event.preventDefault();

        await createTransaction({
            titulo,
            valor,
            categoria,
            type
        });

        setTitulo('');
        setCategoria('');
        setValor(0);
        setType('deposito');


        onRequestClose(); //Fecha o modal assim que realizar a transação;
    }

    return (
        <Modal isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button type="button" onClick={onRequestClose} className="react-modal-close">
                <img src={closeImg} alt="Fechar Modal" />
            </button>
            <Container onSubmit={hendleCreationTrasaction}>
                <h2>Cadastar Transação</h2>

                <input placeholder="Titulo"
                    value={titulo}
                    onChange={event => setTitulo(event.target.value)} />

                <input type="number"
                    placeholder="Valor"
                    value={valor}
                    onChange={event => setValor(Number(event.target.value))} />

                <ContainerTipo>
                    <RadioBox
                        type="button"
                        onClick={() => { setType('deposito'); }}
                        isActive={type === 'deposito'}
                        activeColor='green'
                    >
                        <img src={depositarImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox
                        type="button"
                        onClick={() => { setType('saida'); }}
                        isActive={type === 'saida'}
                        activeColor='red'
                    >
                        <img src={retirarImg} alt="Saida" />
                        <span>Saida</span>
                    </RadioBox>
                </ContainerTipo>

                <input placeholder="Categoria"
                    value={categoria}
                    onChange={event => setCategoria(event.target.value)} />
                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    );
}