import type { NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../lib/authOptions"
import { savePomodoro } from "../../lib/DatabaseFunctions"

const handler = async (
  req: Request,
  res: NextApiResponse
) => {
  const session = await getServerSession(authOptions)
  if (session) {
    //signed in
    const body = await req.json();
    const { pomodoro } = body;
    const user = session.user;
    const savePomodoroResponse = await savePomodoro(pomodoro, user)

    if (savePomodoroResponse) {
      return new Response(JSON.stringify({ code: 200, message: "Success" }));
    }else{
      return new Response(JSON.stringify({ code: 420, message: "Something went wrong, try again in a while" }));
    }
  } else {
    return new Response("No session");
  }
}

export { handler as POST } 