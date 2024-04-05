export type RouterDetailParams = {
    Order: {
        number: number | string;
        order_id: string;
    };
};

export type CategoryProps = {
    id: string;
    name: string;
};

export type ProductsProps = {
    id: string;
    name: string;
};

export type ItemsProps = {
    id: string;
    product_id: string;
    name: string;
    amount: string | number;
}