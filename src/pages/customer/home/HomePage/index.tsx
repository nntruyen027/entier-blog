import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { HeroSection } from './components';

const Page = () => {
  return (
    <div className={'relative min-h-screen'}>
      <DotLottieReact
        className={'fixed top-0 -right-[10%] w-[120%] object-contain'}
        src='https://lottie.host/91709943-e477-4bae-92ce-9a7d1c3e9a35/czVEUka0lS.json'
        loop
        autoplay
      />
      <main className='relative z-1'>
        <HeroSection />
      </main>
    </div>
  );
};

export default Page;
