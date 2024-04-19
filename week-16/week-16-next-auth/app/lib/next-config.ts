import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
export const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        username: { label: "email", type: "text", placeholder: "email" },
        password: {
          label: "password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials: any) {
        console.log(credentials);
        return {
          id: "user1",
          name: "lxsh",
          email: "thelakshayvaishanv",
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || " ",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: ({ user, token }: any) => {
      console.log(token);
      token.userId = token.sub;
      return token;
    },

    session: ({ session, token, user }: any) => {
      // session.accessToken = token.accessToken;
      if (session && session.user) {
        console.log("session callback");
        session.user.id = token.userId;
      }

      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
