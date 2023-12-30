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
        .insert({ ...SubscriptionInvoiceObject.attributes, userId })
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
