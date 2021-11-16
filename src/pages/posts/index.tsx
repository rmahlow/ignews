import { GetStaticProps } from 'next'
import { getPrismicClient } from '../../services/prismic'
import styles from './styles.module.scss'
import Prismic from '@prismicio/client'
import Head from 'next/head'
import { RichText } from 'prismic-dom'
import Link from 'next/link'


type Post = {
    slug: string;
    title: string;
    excerpt: string;
    updatedAt: string;
}

interface PostProps {
    posts: Post[]
}

export default function Posts({ posts }: PostProps) {

    return (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>

                    {posts.map(posts => (
                        <Link  href={`/posts/${posts.slug}`}>
                            <a key={posts.slug}>
                                <time>{posts.updatedAt}</time>
                                <strong>{posts.title}</strong>
                                <p>{posts.excerpt}</p>
                            </a>
                        </Link>
                    ))}
                </div>
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {

    const prismic = getPrismicClient();

    const response = await prismic.query(
        [
            Prismic.predicates.at("document.type", "publication")
        ],
        {
            fetch: ['publication.title', 'publication.content'],
            pageSize: 100
        }
    )

    const posts = response.results.map(post => {
        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-br', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    });

    return {
        props: { posts }
    }

}