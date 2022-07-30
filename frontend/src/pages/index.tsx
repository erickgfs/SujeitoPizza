import Head from 'next/head';
import Image from 'next/image';

import styles from '../../styles/home.module.scss';

import logoImg from '../../public/logo.svg';

import { Input } from '../components/ui/Input';

export default function Home() {
  return (
    <>
      <Head>
        <title>SijeitoPizza - Faça seu login</title>
      </Head>
      <div className={styles.container}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria"/>

        <div>
          <form>
            <Input placeholder='Digite seu mail' type="text"/>
            <Input placeholder='Sua senha' type="password"/>
          </form>
        </div>
      </div>
    </>
  )
}
