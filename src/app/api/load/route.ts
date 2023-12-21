import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../lib/authOptions"
import { loadPomodoro, loadTaskLists, loadHabits } from "../../lib/DatabaseFunctions"

const handler = async (
  req: Request,
  res: NextApiResponse
) => {
  const session = await getServerSession(authOptions)
  if (session) {
    //signed in
    const user = session.user;

    const loadPomodoroResponse = await loadPomodoro(user)
    const loadTaskListsResponse = await loadTaskLists(user)
    const loadHabitsResponse = await loadHabits(user)

    if (loadPomodoroResponse.status === 200 && loadTaskListsResponse.status === 200 && loadHabitsResponse.status === 200) {
      return new Response(JSON.stringify({ code: 200, message: "Success", pomodoro: loadPomodoroResponse.data, taskLists: loadTaskListsResponse.data, habits: loadHabitsResponse.data }));
    } else {
      return new Response(JSON.stringify({ code: 420, message: "Please try again in a while" }));
    }
  } else {
    return new Response("No session");
  }
}

export { handler as GET } 