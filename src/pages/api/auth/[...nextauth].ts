import { fauna } from './../../../services/fauna';
import { query as q } from 'faunadb'
import NextAuth from "next-auth"
import Providers from "next-auth/providers"



export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            scope: "read:user"
        }),
    ],
    // jwt:{
    //     signingKey:"a3dcb4d229de6fde0db5686dee47145d"
    // },
    callbacks: {
        async signIn(user, account, profile) {
            const { email } = user;

            try {
                await fauna.query(
                    q.Create(
                        q.Collection('users'),
                        { data: { email } }
                    )
                )

                return true;
            } catch {
                return false;

            }


        }
    }
})