// import styles from '../styles/home.module.scss'
import Head from 'next/head'
import { SubscribeButtom } from '../components/SubscribeButtom'
import styles from './home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Teste</title>
      </Head>

      <main className={styles.contentContainer}> 
        <section className={styles.hero}> 
          <span>👏 Hey, Welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get acces to all the publications <br />
            <span>for $9.90 month</span>
          </p>
          <SubscribeButtom />
        </section>
        <img src="/images/avatar.svg" alt="" />
      </main>
    </>
  )
}
