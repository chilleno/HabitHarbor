import supabase from '../../../utils/supabase';
import supabaseAuth from '../../../utils/supabaseAuth';

export const updateProfileSubscription = async (SubscriptionObject: SubscriptionObject): Promise<Boolean> => {
    const profile = checkSubscription(SubscriptionObject);
    const userId = await getUserId(SubscriptionObject.attributes.user_email);

    const { error, status } = await supabaseAuth
        .from('config')
        .update({ profile_id: profile, updated_at: new Date() })
        .eq('user_id', userId)

    if (status === 201) {
        return true;
    } else {
        console.log(error);
        return false;
    }
}

export const createInvoice = async (SubscriptionInvoiceObject: SubscriptionInvoiceObject): Promise<any> => {
    const userId = await getUserId(SubscriptionInvoiceObject.attributes.user_email);

    const { data, error, status } = await supabase
        .from('invoices')
        .insert({ ...SubscriptionInvoiceObject.attributes, userId })
    if (status === 200) {
        return { status: 200 };
    } else {
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

const getUserId = async (email: string): Promise<any> => {
    const { data, error, status } = await supabaseAuth
        .from('users')
        .select('id')
        .eq('email', email)
        .single()
    if (status === 200) {
        return { status: 200, data: data?.id };
    } else {
        console.log(error);
        return { status: 420 };
    }
}