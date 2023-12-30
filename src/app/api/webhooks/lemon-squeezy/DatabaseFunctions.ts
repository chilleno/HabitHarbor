import supabase from '../../../utils/supabase';
import supabaseAuth from '../../../utils/supabaseAuth';

enum Profiles {
    free = '06966125-4262-4947-97e4-82caa9572616',
    pro = '966536f3-a528-4754-a474-2b7be0cff440'
}

export const updateProfileOrder = async (OrderObject: OrderObject, userId: string): Promise<Boolean> => {
    if (OrderObject.attributes.first_order_item.variant_id === 191246) {
        if (OrderObject.attributes.status === 'paid') {
            const { error, status } = await supabaseAuth
                .from('users')
                .update({ profile_id: Profiles.pro })
                .eq('id', userId)
            if (status === 201) {
                return true;
            } else {
                console.log(error);
                return false;
            }
        }else{
            return false;
        }
    } else {
        return false;
    }
}

export const updateProfileSubscription = async (SubscriptionObject: SubscriptionObject, userId: string): Promise<Boolean> => {
    const profile = checkSubscription(SubscriptionObject);

    const { error, status } = await supabaseAuth
        .from('users')
        .update({ profile_id: profile })
        .eq('id', userId)

    if (status === 201) {
        return true;
    } else {
        console.log(error);
        return false;
    }
}

export const createInvoice = async (SubscriptionInvoiceObject: SubscriptionInvoiceObject, userId: string): Promise<any> => {
    const { data, error, status } = await supabase
        .from('invoices')
        .insert({ 
            user_id: userId,
            store_id: SubscriptionInvoiceObject.attributes.store_id,
            subscription_id: SubscriptionInvoiceObject.attributes.subscription_id,
            customer_id: SubscriptionInvoiceObject.attributes.customer_id,
            user_name: SubscriptionInvoiceObject.attributes.user_name,
            user_email: SubscriptionInvoiceObject.attributes.user_email,
            billing_reason: SubscriptionInvoiceObject.attributes.billing_reason,
            card_brand: SubscriptionInvoiceObject.attributes.card_brand,
            card_last_four: SubscriptionInvoiceObject.attributes.card_last_four,
            currency: SubscriptionInvoiceObject.attributes.currency,
            currency_rate: SubscriptionInvoiceObject.attributes.currency_rate,
            status: SubscriptionInvoiceObject.attributes.status,
            status_formatted: SubscriptionInvoiceObject.attributes.status_formatted,
            refunded: SubscriptionInvoiceObject.attributes.refunded,
            refunded_at: SubscriptionInvoiceObject.attributes.refunded_at,
            subtotal: SubscriptionInvoiceObject.attributes.subtotal,
            discount_total: SubscriptionInvoiceObject.attributes.discount_total,
            tax: SubscriptionInvoiceObject.attributes.tax,
            total: SubscriptionInvoiceObject.attributes.total,
            subtotal_usd: SubscriptionInvoiceObject.attributes.subtotal_usd,
            discount_total_usd: SubscriptionInvoiceObject.attributes.discount_total_usd,
            tax_usd: SubscriptionInvoiceObject.attributes.tax_usd,
            total_usd: SubscriptionInvoiceObject.attributes.total_usd,
            subtotal_formatted: SubscriptionInvoiceObject.attributes.subtotal_formatted,
            discount_total_formatted: SubscriptionInvoiceObject.attributes.discount_total_formatted,
            tax_formatted: SubscriptionInvoiceObject.attributes.tax_formatted,
            total_formatted: SubscriptionInvoiceObject.attributes.total_formatted,
            urls: SubscriptionInvoiceObject.attributes.urls,
            created_at: SubscriptionInvoiceObject.attributes.created_at,
            updated_at: SubscriptionInvoiceObject.attributes.updated_at,
         })
    if (status === 200) {
        return { status: 200 };
    } else {
        console.log('error creating invoice')
        console.log(error);
        return { status: 420 };
    }
}

const checkSubscription = (SubscriptionObject: SubscriptionObject): Profiles => {
    if (SubscriptionObject.attributes.status === 'active') {
        return Profiles.pro;
    } else {
        return Profiles.free;
    }
}
