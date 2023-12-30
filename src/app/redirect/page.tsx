import { redirect } from 'next/navigation'

const Redirect = ({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) => {
    //get first param from url
    const urlParam = searchParams?.plan;
    const id = searchParams?.id;

    if (urlParam === 'monthly') {
        return redirect('https://habitharbor.lemonsqueezy.com/checkout/buy/52533b6f-60a2-4aad-a75a-7c94c1e7574e?checkout[custom][user_id]='+id)
    }

    if (urlParam === 'yearly') {
        return redirect('https://habitharbor.lemonsqueezy.com/checkout/buy/f3610d3e-4942-4274-882c-55d8111a6dff?checkout[custom][user_id]='+id)
    }

    if (urlParam === 'founder') {
        return redirect('https://habitharbor.lemonsqueezy.com/checkout/buy/357a35c3-2586-4c2d-9c6c-28d8132219a3?checkout[custom][user_id]='+id)
    }

    return redirect('/app');
}

export default Redirect;