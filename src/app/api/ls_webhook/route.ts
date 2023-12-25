import type { NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../lib/authOptions"
import { savePomodoro } from "../../lib/DatabaseFunctions"

const handler = async (
  req: Request,
  res: NextApiResponse
) => {
  console.log("Webhook hit");
  console.log(req);
}

export { handler as POST } 