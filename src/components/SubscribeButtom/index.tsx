import { useSession,signIn } from 'next-auth/client'
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss'

interface SubscribeButtomProps{
    priceId:string
}

export function SubscribeButtom({priceId}:SubscribeButtomProps){
const [session] = useSession();

   async function handleSubstribe(){
        if(!session){
            signIn('github');
            return;
        }

        try {
            const response = await api.post("/subscribe");
            const {sessionId } = response.data;

            const stripe = await getStripeJs();

            await stripe.redirectToCheckout({sessionId})
        }catch(err){
            alert(err.message)
        }
        
    }

    return(
        <button type="button" 
        className={styles.subscribeButtom}
        onClick={handleSubstribe}>
            Subscribe now
        </button>
    )
}