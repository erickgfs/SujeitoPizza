import { useState } from 'react';
import Modal from 'react-modal';

import { canSSRAuth } from '../../utils/canSSRAuth';
import { setupAPIClient } from '../../services/api';
import styles from './styles.module.scss';
import Head from 'next/head';

import { Header } from '../../components/Header';
import { ModalOrder } from '../../components/ModalOrder';
import { FiRefreshCcw } from 'react-icons/fi';

type OrderProps = {
    id: string;
    table: string | number;
    status: boolean;
    draft: boolean;
    name:string | null;
}

export type OrderItemProps = {
    id: string;
    amount: number;
    order_id: string;
    product_id: string;
    product: {
        id: string;
        name: string;
        description: string;
        price: string;
        banner: string;
    }
    order: {
        id: string;
        table: string | number;
        status: string;
        name:string | null;
    }
}

interface HomeProps {
    orders: OrderProps[];
}



export default function Dashboard({ orders }: HomeProps) {
    const [orderList, setOrderList] = useState(orders || []);
    const [modalItem, setModalItem] = useState<OrderItemProps[]>();
    const [modalVisible, setModalVisible] = useState(false);

    function handleCloseModal() {
        setModalVisible(false);
    }

    async function handleOpenModalView(id: string) {
        const apiClient = setupAPIClient();

        const response = await apiClient.get("/order/detail", {
            params:{
                order_id:id,
            }
        });

        setModalItem(response.data);
        setModalVisible(true);
    };

    Modal.setAppElement('#__next');

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
                { modalVisible && (
                    <ModalOrder 
                        isOpen={modalVisible}
                        onRequestClose={handleCloseModal}
                        order={modalItem}
                    />
                )}
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
