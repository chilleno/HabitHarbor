import type { NextApiResponse } from 'next'

const handler = async (
  req: Request,
  res: NextApiResponse
) => {
  console.log("Webhook hit");
}

export { handler as POST } 