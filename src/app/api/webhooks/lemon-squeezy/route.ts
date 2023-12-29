import type { NextApiResponse } from 'next'
import { createInvoice, updateProfileSubscription } from './DatabaseFunctions'

enum WebhookEvent {
  orderCreated = 'order_created',
  orderRefounded = 'order_refounded',
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
  const customData = response && response['meta']['custom_data']
  const obj = response && response['data']['attributes']
  const objId = response && response['data']['id']
  console.log(response);

  if (eventName === WebhookEvent.orderCreated) {
    const subscription: OrderObject = data;
    console.log('order created');
    console.log(subscription);
  }

  if (eventName === WebhookEvent.orderRefounded) {
    const subscription: OrderObject = data;
    console.log('order refounded');
    console.log(subscription);
  }

  if (eventName === WebhookEvent.subscriptionCreated) {
    const subscription: SubscriptionObject = data;
    const updated = await updateProfileSubscription(subscription, customData.user_id);
    console.log('subscription created');
    console.log(subscription);
    if (updated === true) {
      return { status: 200, message: "success" };
    } else {
      return { status: 420, messsage: "something went wrong" };
    }
  }

  if (eventName === WebhookEvent.subscriptionUpdated) {
    const subscription: SubscriptionObject = data;
    const updated = await updateProfileSubscription(subscription, customData.user_id);
    console.log('subscription created');
    console.log(subscription);
    if (updated === true) {
      return { status: 200, message: "success" };
    } else {
      return { status: 420, messsage: "something went wrong" };
    }
  }

  if (eventName === WebhookEvent.subscriptionExpired) {
    const subscription: SubscriptionObject = data;
    const updated = await updateProfileSubscription(subscription, customData.user_id);
    console.log('subscription created');
    console.log(subscription);
    if (updated === true) {
      return { status: 200, message: "success" };
    } else {
      return { status: 420, messsage: "something went wrong" };
    }
  }

  if (eventName === WebhookEvent.subscriptionPaymentSuccess) {
    const subscriptionInvoice: SubscriptionInvoiceObject = data;
    const newInvoiceResponse = await createInvoice(subscriptionInvoice, customData.user_id);

    if (newInvoiceResponse.status === 200) {
      console.log('subscription payment success')
      console.log(newInvoiceResponse);

      return new Response(JSON.stringify({ code: 200, message: "subscription payment success" }));

    } else if (newInvoiceResponse.status === 420) {
      console.log('Something went wront on request')
      console.log(newInvoiceResponse);
      return new Response(JSON.stringify({ code: 420, message: "Something went wrong on request" }));
    }
  }

  return new Response(JSON.stringify({ code: 200, message: "Success" }));
}

export { handler as POST } 