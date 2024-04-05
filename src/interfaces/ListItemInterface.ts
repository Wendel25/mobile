export interface ItemProps {
    data: {
        id: string;
        product_id: string;
        name: string;
        amount: string | number;
    }
    deleteItem: (item_id: string) => void
}