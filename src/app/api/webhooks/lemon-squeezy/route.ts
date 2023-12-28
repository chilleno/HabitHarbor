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

  const response = JSON.parse(rawBody)
  const data = response && response['data']
  const eventName = response && response['meta']['event_name']
  const obj = response && response['data']['attributes']
  const objId = response && response['data']['id']
  
  console.log(data)
  return new Response(JSON.stringify({ code: 200, message: "Success" }));
}

export { handler as POST } 