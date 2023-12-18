import { AuthOptions } from "next-auth"
import { SupabaseAdapter } from "@auth/supabase-adapter"
import GoogleProvider from "next-auth/providers/google";
import { Adapter } from "next-auth/adapters";
import { createClient } from "@supabase/supabase-js"

export const authOptions: AuthOptions = {
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
    callbacks: {
      session: async ({ session, token, user }) => {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          { db: { schema: 'next_auth' } }
        );
  
        const { data, status, error } = await supabase
          .from('users')
          .select('profile_id')
          .eq('id', user.id)
          .single();
        
        if (session?.user) {
          session.user.id = user.id as string;
          session.user.profile_id = data?.profile_id as string;
        }
        return session;
      },
    }
  }

