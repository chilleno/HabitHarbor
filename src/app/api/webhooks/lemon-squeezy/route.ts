import type { NextApiResponse } from 'next'
import { createInvoice, updateProfileSubscription, updateProfileOrder } from './DatabaseFunctions'

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

  if (eventName === WebhookEvent.orderCreated) {
    const order: OrderObject = data;
    if (order.attributes.first_order_item.variant_id === 191246) {
      if (order.attributes.status === 'paid') {
        const updated = await updateProfileOrder(order, customData.user_id);
        console.log('order created');
        console.log(order);
        if (updated === true) {
          const newInvoice: SubscriptionInvoiceObject = {
            type: "founder_invoice",
            id: objId,
            attributes: {
              store_id: order.attributes.store_id,
              subscription_id: objId,
              customer_id: order.attributes.customer_id,
              user_name: order.attributes.user_name,
              user_email: order.attributes.user_email,
              billing_reason: 'founder habbit harbor',
              card_brand: 'not informed',
              card_last_four: 'not informed',
              currency: order.attributes.currency,
              currency_rate: order.attributes.currency_rate,
              status: order.attributes.status,
              status_formatted: order.attributes.status_formatted,
              refunded: false,
              refunded_at: null,
              subtotal: order.attributes.total,
              discount_total: order.attributes.discount_total,
              tax: order.attributes.tax,
              total: order.attributes.total,
              subtotal_usd: order.attributes.total_usd,
              discount_total_usd: order.attributes.discount_total_usd,
              tax_usd: order.attributes.tax_usd,
              total_usd: order.attributes.total_usd,
              subtotal_formatted: order.attributes.total_formatted,
              discount_total_formatted: order.attributes.discount_total_formatted,
              tax_formatted: order.attributes.tax_formatted,
              total_formatted: order.attributes.total_formatted,
              urls: order.attributes.urls,
              created_at: order.attributes.created_at,
              updated_at: order.attributes.updated_at,
              test_mode: order.attributes.test_mode,
            },
          }
          const newInvoiceResponse = await createInvoice(newInvoice, customData.user_id);

          if (newInvoiceResponse.status === 200) {
            console.log('subscription payment success')
            console.log(newInvoiceResponse);

            return new Response(JSON.stringify({ code: 200, message: "subscription payment success" }));

          } else if (newInvoiceResponse.status === 420) {
            console.log('Something went wront on request')
            console.log(newInvoiceResponse);
            return new Response(JSON.stringify({ code: 420, message: "Something went wrong on request" }));
          }
        } else {
          return new Response(JSON.stringify({ code: 420, message: "Something went wrong on request" }));
        }
      } else {
        return new Response(JSON.stringify({ code: 200, message: "request ok" }));
      }
    }
  }

  if (eventName === WebhookEvent.orderRefounded) {
    const order: OrderObject = data;
    const updated = await updateProfileOrder(order, customData.user_id);
    console.log('order refounded');
    console.log(order);
    if (updated === true) {
      return new Response(JSON.stringify({ code: 200, message: "success order refounded" }));
    } else {
      return new Response(JSON.stringify({ code: 420, message: "something went wrong" }));
    }
  }

  if (eventName === WebhookEvent.subscriptionCreated) {
    const subscription: SubscriptionObject = data;
    const updated = await updateProfileSubscription(subscription, customData.user_id);
    console.log('subscription created');
    console.log(subscription);
    if (updated === true) {
      return new Response(JSON.stringify({ code: 200, message: "success suscription created" }));
    } else {
      return new Response(JSON.stringify({ code: 420, message: "something went wrong" }));
    }
  }

  if (eventName === WebhookEvent.subscriptionUpdated) {
    const subscription: SubscriptionObject = data;
    const updated = await updateProfileSubscription(subscription, customData.user_id);
    console.log('subscription updated');
    console.log(subscription);
    if (updated === true) {
      return new Response(JSON.stringify({ code: 200, message: "subscription updated success" }));
    } else {
      return new Response(JSON.stringify({ code: 420, message: "something went wrong" }));
    }
  }

  if (eventName === WebhookEvent.subscriptionExpired) {
    const subscription: SubscriptionObject = data;
    const updated = await updateProfileSubscription(subscription, customData.user_id);
    console.log('subscription created');
    console.log(subscription);
    if (updated === true) {
      return new Response(JSON.stringify({ code: 200, message: "subscription created success" }));
    } else {
      return new Response(JSON.stringify({ code: 420, message: "subscription created error" }));
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

  return new Response(JSON.stringify({ code: 420, message: "Wrong payload" }));

}

export { handler as POST }