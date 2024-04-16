//@ts-nocheck
import NextAuth  from "next-auth"
import type {NextAuthOptions} from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import clientPromise from "../lib";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],

  secret: process.env.JWT_SECRET,
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    session: async (session, user) => {
  
      // session.user.id = user.id
      return Promise.resolve(session)
     
    },
    jwt: async (token, user, account, profile, isNewUser) => {
    console.log(token)
      if (user) {
        token.id = user.id
      }
      return Promise.resolve(token)
    },
  },
}
const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}