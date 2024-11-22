import { LayoutProps } from '~/types';
import { Footer, Header } from '~/components';

const HomeLayout: React.FC<LayoutProps> = ({ children }) => {
  const render = () => (
    <div className='w-full bg-[#f2f4f7]'>
      <Header />
      <div className={'px-40 pt-28'}>{children}</div>
      <Footer />
    </div>
  );

  return render();
};

export default HomeLayout;
