import type { NextApiResponse } from 'next'

enum WebhookEvent {
  subscriptionCreated = 'subscription_created',
  subscriptionUpdated = 'subscription_updated',
  subscriptionPaymentSuccess = 'subscription_payment_success',
  subscriptionExpired = 'subscription_expired',
}

const handler = async (
  req: Request,
  res: NextApiResponse
) => {
  const crypto = require('crypto');
  const rawBody = await req.text()
  const secret = process.env.LEMONSQUEEZY_SIGNING_SECRET;
  const hmac = crypto.createHmac('sha256', secret);
  const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
  const signature = Buffer.from(req.headers.get('X-Signature') || '', 'utf8');
  
  if (!crypto.timingSafeEqual(digest, signature)) {
    throw new Error('Invalid signature.');
  }

  const data = JSON.parse(rawBody)
  console.log(data)
  const eventName = data && data['meta']['event_name']
  const obj = data && data['data']['attributes']
  const objId = data && data['data']['id']

  return new Response(JSON.stringify({ code: 200, message: "Success" }));
}

export { handler as POST } 