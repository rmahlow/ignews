// import styles from '../styles/home.module.scss'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { SubscribeButtom } from '../components/SubscribeButtom'
import { stripe } from '../services/stripe'
import styles from './home.module.scss'


interface HomeProps{
  product:{
    priceId:string;
    amount:number
  }
}
export default function Home(props:HomeProps) {
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
            <span>for {props.product.amount} month</span>
          </p>
          <SubscribeButtom priceId={props.product.priceId} />
        </section>
        <img src="/images/avatar.svg" alt="" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const price = await stripe.prices.retrieve("price_1Ju5E7G4EF7jXN0hWxhIp1PP")

  const product = {
    priceId: price.id,
    amount:  new Intl.NumberFormat('en-US',{
      style:'currency',
      currency:"USD"
    }).format((price.unit_amount / 100))

  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24 //24 horas
  }

}
