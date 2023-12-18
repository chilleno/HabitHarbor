import type { DefaultUser, DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user?: DefaultUser & {
      id: string;
      profile_id: string;
    };
  }
}