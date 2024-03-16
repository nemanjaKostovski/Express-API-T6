export interface UserEntity {
  // email: string;
  // password: string;
  // role: 'admin' | 'user';
  id: string;
}

export interface ProductEntity {
  id: string; // uuid
  title: string;
  description: string;
  price: number;
}

export interface CartItemEntity {
  product: ProductEntity;
  count: number;
}

export interface CartEntity {
  id: string; // uuid
  userId: string;
  isDeleted: boolean;
  items: CartItemEntity[];
}

type ORDER_STATUS = 'created' | 'completed';

export interface OrderEntity {
  id: string; // uuid
  userId: string;
  cartId: string;
  items: CartItemEntity[]; // products from CartEntity
  payment: {
    type: string;
    address?: any;
    creditCard?: any;
  };
  delivery: {
    type: string;
    address: any;
  };
  comments: string;
  status: ORDER_STATUS;
  total: number;
}
