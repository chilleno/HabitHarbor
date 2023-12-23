import type { NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../lib/authOptions"
import { saveHabits } from "../../lib/DatabaseFunctions"

const handler = async (
  req: Request,
  res: NextApiResponse
) => {
  const session = await getServerSession(authOptions)
  if (session) {
    //signed in
    const body = await req.json();
    const { habits } = body;
    const user = session.user;
    const saveHabitsResponse = await saveHabits(habits, user)

    if (saveHabitsResponse) {
      return new Response(JSON.stringify({ code: 200, message: "Success" }));
    }else{
      return new Response(JSON.stringify({ code: 420, message: "Something went wrong, try again in a while" }));
    }
  } else {
    return new Response("No session");
  }
}

export { handler as POST } 