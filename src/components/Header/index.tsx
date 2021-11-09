import { SignInButton } from '../SigInButton';
import style from './style.module.scss'

export function Header(){
    return (
        <header className={style.headerContainer}>
            <div className={style.headerContent}>
                <img src="/images/logo.svg" alt="ign.ews" />
                <nav>
                    <a href="" className={style.active}>Home</a>
                    <a href="">Posts</a>
                </nav>
                <SignInButton />
            </div>
        </header>
    );
}