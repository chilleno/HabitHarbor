import type { NextApiResponse } from 'next'

const handler = async (
  req: Request,
  res: NextApiResponse
) => {
  console.log("Webhook hit")
  //log body
  console.log(req.body)
}

export { handler as POST } 