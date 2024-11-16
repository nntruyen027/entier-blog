import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 2,
    partialVisibilityGutter: 40 //
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
    partialVisibilityGutter: 40 //
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

interface CarouselProps {
  data: [
    | {
        url: string;
        title: string;
        img: string;
      }
    | null
    | undefined
  ];
}

const CustomCarousel: React.FC<CarouselProps> = ({ data }) => {
  const [show, setShow] = useState<boolean>(true);

  return (
    show && (
      <div className={'relative top-0 left-0 w-full'}>
        <Carousel infinite={true} responsive={responsive} autoPlay={true}>
          {data?.map((item, index) => (
            <Link to={item.url} key={index}>
              <img className={'px-1 rounded-xl'} src={item.img} alt={item.title} />
            </Link>
          ))}
        </Carousel>
        <FontAwesomeIcon
          className={'absolute right-2 top-2 bg-gray-300 w-4 h-4 p-1 rounded-2xl cursor-pointer'}
          icon={faClose}
          onClick={() => setShow(!show)}
        />
      </div>
    )
  );
};

export default CustomCarousel;
