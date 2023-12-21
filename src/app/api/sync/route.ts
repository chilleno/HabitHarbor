import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../lib/authOptions"
import { savePomodoro, saveTaskLists, saveHabits } from "../../lib/DatabaseFunctions"

const handler = async (
  req: Request,
  res: NextApiResponse
) => {
  const session = await getServerSession(authOptions)
  if (session) {
    //signed in
    const body = await req.json();
    const { pomodoro, taskLists, habits } = body;
    const user = session.user;

    const savePomodoroResponse = await savePomodoro(pomodoro, user)
    const saveTaskListsResponse = await saveTaskLists(taskLists, user)
    const saveHabitsResponse = await saveHabits(habits, user)

    if (savePomodoroResponse && saveTaskListsResponse && saveHabitsResponse) {
      return new Response(JSON.stringify({ code: 200, message: "Success" }));
    }

    return new Response("Hello World");
  } else {
    return new Response("No session");
  }
}

export { handler as POST } 