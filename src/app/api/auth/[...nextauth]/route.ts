import NextAuth from "next-auth"
import { SupabaseAdapter } from "@auth/supabase-adapter"
import GoogleProvider from "next-auth/providers/google";
import { Adapter } from "next-auth/adapters";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    })
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  }) as Adapter,
})

export { handler as GET, handler as POST }