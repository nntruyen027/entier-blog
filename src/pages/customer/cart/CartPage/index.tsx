import { EmptyComponent } from './components';

const isEmpty = false;

const CartPage = () => {
  if (isEmpty) return <EmptyComponent />;
  else return <div>Cart Page</div>;
};

export default CartPage;
