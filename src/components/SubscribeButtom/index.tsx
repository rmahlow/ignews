import styles from './styles.module.scss'

interface SubscribeButtomProps{
    priceId:string
}

export function SubscribeButtom({priceId}:SubscribeButtomProps){
    return(
        <button type="button" className={styles.subscribeButtom}>
            Subscribe now
        </button>
    )
}