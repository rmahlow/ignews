import { fauna } from './../../../services/fauna';
import { query as q } from 'faunadb'
import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import { session } from 'next-auth/client';



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

        async session(session) {

            try {
                const userActiveSubscription = await fauna.query(
                    q.Get(
                        q.Intersection(
                            [
                                q.Match(
                                    q.Index("subscription_by_user_ref"),
                                    q.Select(
                                        "ref",
                                        q.Get(
                                            q.Match(
                                                q.Index("user_by_email"),
                                                q.Casefold(session.user.email)
                                            )
                                        )
                                    )
                                ),
                                q.Match(
                                    q.Index("subscription_by_status"),
                                    "active"
                                )
                            ]
                        )
                    )
                )

                return {
                    ...session,
                    activeSubscription: userActiveSubscription

                };
            } catch (err) {
                return {
                    ...session,
                    activeSubscription: null

                };
            }

        },

        async signIn(user, account, profile) {
            const { email } = user;

            try {
                await fauna.query(
                    q.If(
                        q.Not(
                            q.Exists(
                                q.Match(
                                    q.Index("user_by_email"),
                                    q.Casefold(user.email)
                                )
                            )
                        ),
                        q.Create(
                            q.Collection('users'),
                            { data: { email } }
                        ),
                        q.Get(
                            q.Match(
                                q.Index("user_by_email"),
                                q.Casefold(user.email)
                            )
                        )
                    )
                )

                return true;
            } catch {
                return false;

            }


        }
    }
})