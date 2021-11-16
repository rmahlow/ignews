import { SignInButton } from '../SigInButton';
import style from './style.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router';
import { ActiveLink } from '../ActiveLink/index'

export function Header() {

    const { asPath } = useRouter();

    return (
        <header className={style.headerContainer}>
            <div className={style.headerContent}>
                <img src="/images/logo.svg" alt="ig.news" />
                <nav>
                    <ActiveLink href="/" activeClassName={style.active}>
                        <a>Home</a>
                    </ActiveLink>
                    <ActiveLink href="/posts" prefetch={true} activeClassName={style.active}>
                        <a>Posts</a>
                    </ActiveLink>
                </nav>
                <SignInButton />
            </div>
        </header>
    );
}