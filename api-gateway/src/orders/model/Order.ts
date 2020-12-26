export type OrderItem = {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
};

type Address = {
  zipCode: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  additionalDetails?: string;
};

export type Order = {
  customerId: string;
  customerName: string;
  address: Address;
  orderItems: OrderItem[];
};
