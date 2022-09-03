import { useState, ChangeEvent, FormEvent } from "react";
import { setupAPIClient } from "../../services/api";


import styles from "./styles.module.scss";

import Head from "next/head";
import { FiUpload } from "react-icons/fi"

import { canSSRAuth } from "../../utils/canSSRAuth";

import { Header } from "../../components/Header";
import { toast } from "react-toastify";

type ItemProps = {
    id: string;
    name: string;
}

interface CategoryProps {
    categoryList: ItemProps[];
}

export default function Product({ categoryList }: CategoryProps) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [imageAvatar, setImageAvatar] = useState(null);
    const [categories, setCategories] = useState(categoryList || []);
    const [categorySelected, setCategorySelected] = useState(0);

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        try {
            const data = new FormData();

            if ( name === "" || price === "" || description === "" || imageAvatar === null) {
                toast.warning("Preencha todos os campos!");
                return;
            }

            data.append('name', name);
            data.append('price', price);
            data.append('description', description);
            data.append('category_id', categories[categorySelected].id);
            data.append('file', imageAvatar);

            const apiClient = setupAPIClient();

            await apiClient.post("/product", data);

            toast.success("Produto cadastrado com sucesso!");
            
        } catch(err) {
            console.log(err);
            toast.error("Ops erro ao cadastrar!");
        }

        setName("");
        setPrice("");
        setDescription("");
        setImageAvatar(null);
        setAvatarUrl("");
    }

    function handleFile(event: ChangeEvent<HTMLInputElement>) {

        if(!event.target.files) {
            return;
        }

        const image = event.target.files[0];

        if(!image) {
            return;
        }

        if(image.type === 'image/png' || image.type === 'image/jpeg') {
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(image));
        }
    }

    function handleChangeCategory(event) {
        console.log(categories[event.target.value]);
        setCategorySelected(event.target.value);
    }

    return (
        <>
            <Head>
                <title>
                    Novo poduto - Sujeito Pizzaria
                </title>
            </Head>
            <div>
                <Header />

                <main className={styles.container}>
                    <h1>Novo produto</h1>

                    <form className={styles.form} onSubmit={handleRegister}>

                        <label className={styles.labelAvatar}>
                            <span>
                                <FiUpload size={30} color="#FFF"/>
                            </span>
                            <input type="file" accept="image/png, image/jpeg" onChange={handleFile}/>

                            {avatarUrl && (
                                <img
                                    className={styles.preview}
                                    src={avatarUrl}
                                    alt="Foto do produto"
                                    width={250}
                                    height={250}
                                />
                            )}

                        </label>

                        <select value={categorySelected} onChange={handleChangeCategory}>
                            {categories.map((category, index) => {
                                return(
                                    <option key={category.id} value={index}>
                                        { category.name }
                                    </option>
                                );
                            })}
                        </select>
                        <input
                            type="text"
                            placeholder="Nome do produto"
                            className={styles.input}
                            value={name}
                            onChange={((e) => {setName(e.target.value)})}
                        />
                        <input
                            type="text"
                            placeholder="Preço do produto"
                            className={styles.input}
                            value={price}
                            onChange={((e) => {setPrice(e.target.value)})}
                        />
                        <textarea 
                            placeholder="Descreva seu produto..." 
                            className={styles.input}
                            value={description}
                            onChange={((e) => {setDescription(e.target.value)})}
                        />
                        <button className={styles.buttonAdd} type="submit">
                            Cadastrar
                        </button>
                    </form>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get('/category');

    // console.log(response);

    return {
        props: {
            categoryList:response.data
        }
    }
})