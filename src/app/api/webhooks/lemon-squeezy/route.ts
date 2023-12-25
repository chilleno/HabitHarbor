import type { NextApiResponse } from 'next'


const handler = async (
  req: Request,
  res: NextApiResponse
) => {
  console.log("Webhook hit")

  const crypto = require('crypto');
  //get secret from env
  const secret = process.env.LEMON_SQUEEZY_SECRET;
  const hmac = crypto.createHmac('sha256', secret);
  const digest = Buffer.from(hmac.update(req.body).digest('hex'), 'utf8');
  const signature = Buffer.from(req.headers.get('X-Signature') || '', 'utf8');

  if (!crypto.timingSafeEqual(digest, signature)) {
    throw new Error('Invalid signature.');
  }
  const data = req.body
  const eventName = data && data['meta']['event_name']
  const obj = data && data['data']['attributes']
  const objId = data && data['data']['id']
  console.log(eventName)
  console.log(obj)
  console.log(objId)

  return new Response(JSON.stringify({ code: 200, message: "Success" }));
}

export { handler as POST } 