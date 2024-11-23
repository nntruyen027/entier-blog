import { LayoutProps } from '~/types';
import { Header } from '~/components';

const CartLayout: React.FC<LayoutProps> = ({ children }) => {
  const render = () => (
    <div className='w-full min-h-screen bg-[#f2f4f7] pb-3'>
      <Header />
      <div className={'px-40 pt-28'}>{children}</div>
    </div>
  );

  return render();
};

export default CartLayout;
