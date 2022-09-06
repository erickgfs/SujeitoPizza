import { useState } from 'react';

import { canSSRAuth } from '../../utils/canSSRAuth';
import { setupAPIClient } from '../../services/api';
import styles from './styles.module.scss';
import Head from 'next/head';

import { Header } from '../../components/Header';
import { FiRefreshCcw } from 'react-icons/fi';

type OrderProps = {
    id: string;
    table: string | number;
    status: boolean;
    draft: boolean;
    name:string | null;
}

interface HomeProps {
    orders: OrderProps[];
}

export default function Dashboard({ orders }: HomeProps) {
    const [orderList, setOrderList] = useState(orders || []);

    function handleOpenModalView(id: string) {
        alert('id Clicado: ' + id)
    };

    return (
        <>
            <Head>
                <title>
                    Painel - Sujeito Pizzaria
                </title>
            </Head>
            <div>
                <Header />

                <main className={styles.container}>
                    <div className={styles.containerHeader}>
                        <h1>Últimos pedidos</h1>
                        <button>
                            <FiRefreshCcw size={25} color='#3fffa3' />
                        </button>
                    </div>

                    <article className={styles.listOrders}>

                        {orderList.map((order, index) => {
                            return(
                                <section key={order.id} className={styles.orderItem}>
                                    <button onClick={() => handleOpenModalView(order.id) }>
                                        <div className={styles.tag}></div>
                                        <span>Mesa {order.table}</span>
                                    </button>
                                </section>
                            );
                        })};
                    </article>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get('/orders');

    console.log(response.data);

    return {
        props:{
            orders: response.data
        }
    }
})
