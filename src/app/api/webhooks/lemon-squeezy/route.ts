import type { NextApiResponse } from 'next'

const handler = async (
  req: Request,
  res: NextApiResponse
) => {
  console.log("Webhook hit")
  //log body
  console.log(req.body)
  return new Response(JSON.stringify({ code: 200, message: "Success" }));
}

export { handler as POST } 