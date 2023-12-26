import type { NextApiResponse } from 'next'


const handler = async (
  req: Request,
  res: NextApiResponse
) => {
  console.log("Webhook hit")
  const crypto = require('crypto');
  //get secret from env
  console.log("1");
  const secret = process.env.LEMONSQUEEZY_SIGNING_SECRET;
  console.log("2");
  const hmac = crypto.createHmac('sha256', secret);
  console.log("3");
  const digest = Buffer.from(hmac.update(req.body).digest('hex'), 'utf8');
  console.log("4");
  const signature = Buffer.from(req.headers.get('X-Signature') || '', 'utf8');
  console.log("5");
  
  if (!crypto.timingSafeEqual(digest, signature)) {
    console.log("6");
    throw new Error('Invalid signature.');
  }

  console.log('Valid signature.');
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