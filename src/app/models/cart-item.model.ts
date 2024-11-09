export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    imageUrl?: string; // Optional, in case not all items have an image
}
