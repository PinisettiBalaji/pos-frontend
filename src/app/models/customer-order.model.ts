// customer-order.model.ts
export interface CustomerOrder {
    orderId: number;
    customerId: number;
    orderedItems: { id: number; name: string; quantity: number; price: number }[];
    totalAmount: number;
    orderDate: Date;
    status: 'placed' | 'delivered' | 'returned'; // to track status of the order
}
