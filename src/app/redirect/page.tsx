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
        return redirect('https://habitharbor.lemonsqueezy.com/checkout/buy/49db8caf-69df-44c8-85be-9460b0131666?checkout[custom][user_id]='+id)
    }

    if (urlParam === 'yearly') {
        return redirect('https://habitharbor.lemonsqueezy.com/checkout/buy/a4c419e3-b99a-4ad8-a3b4-0e0efd654fa4?checkout[custom][user_id]='+id)
    }

    if (urlParam === 'founder') {
        return redirect('https://habitharbor.lemonsqueezy.com/checkout/buy/e5382f9c-c1ba-448e-9b3d-73d62b88b746?checkout[custom][user_id]='+id)
    }

    return redirect('/app');
}

export default Redirect;