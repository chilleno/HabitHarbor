interface SubscriptionObject {
    type: string;
    id: string;
    attributes: {
        store_id: number;
        customer_id: number;
        order_id: number;
        order_item_id: number;
        product_id: number;
        variant_id: number;
        product_name: string;
        variant_name: string;
        user_name: string;
        user_email: string;
        status: string;
        status_formatted: string;
        card_brand: string;
        card_last_four: string;
        pause: null;
        cancelled: boolean;
        trial_ends_at: null;
        billing_anchor: number;
        first_subscription_item: {
            id: number;
            subscription_id: number;
            price_id: number;
            quantity: number;
            created_at: string;
            updated_at: string;
        };
        urls: {
            update_payment_method: string;
            customer_portal: string;
        };
        renews_at: string;
        ends_at: null;
        created_at: string;
        updated_at: string;
        test_mode: boolean;
    };
}

interface SubscriptionInvoiceObject {
    type: string;
    id: string;
    attributes: {
        store_id: number;
        subscription_id: number;
        customer_id: number;
        user_name: string;
        user_email: string;
        billing_reason: string;
        card_brand: string;
        card_last_four: string;
        currency: string;
        currency_rate: string;
        status: string;
        status_formatted: string;
        refunded: boolean;
        refunded_at: null;
        subtotal: number;
        discount_total: number;
        tax: number;
        total: number;
        subtotal_usd: number;
        discount_total_usd: number;
        tax_usd: number;
        total_usd: number;
        subtotal_formatted: string;
        discount_total_formatted: string;
        tax_formatted: string;
        total_formatted: string;
        urls: {
            invoice_url: string;
        };
        created_at: string;
        updated_at: string;
        test_mode: boolean;
    };
    relationships: {
        store: {
            links: {
                related: string;
                self: string;
            };
        };
        subscription: {
            links: {
                related: string;
                self: string;
            };
        };
        customer: {
            links: {
                related: string;
                self: string;
            };
        };
    };
    links: {
        self: string;
    };

}

interface OrderObject {
    type: string;
    id: string;
    attributes: {
        store_id: number;
        customer_id: number;
        identifier: string;
        order_number: number;
        user_name: string;
        user_email: string;
        currency: string;
        currency_rate: string;
        subtotal: number;
        discount_total: number;
        tax: number;
        total: number;
        subtotal_usd: number;
        discount_total_usd: number;
        tax_usd: number;
        total_usd: number;
        tax_name: string;
        tax_rate: string;
        status: string;
        status_formatted: string;
        refunded: boolean;
        refunded_at: string,
        subtotal_formatted: string;
        discount_total_formatted: string;
        tax_formatted: string;
        total_formatted: string;
        first_order_item: {
            id: number;
            order_id: number;
            product_id: number;
            variant_id: number;
            product_name: string;
            variant_name: string;
            price: number;
            created_at: string;
            updated_at: string;
            test_mode: boolean;
        }
        urls: {
            update_payment_method: string;
            customer_portal: string;
        };
        created_at: string;
        updated_at: string;
        test_mode: boolean;
    };
}

