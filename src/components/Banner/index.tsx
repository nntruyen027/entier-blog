import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const Banner = () => {
  const [show, setShow] = useState<boolean>(true);

  const render = () => {
    return (
      show && (
        <div className={'relative top-0 left-0 w-full'}>
          <FontAwesomeIcon
            className={'absolute right-2 top-2 bg-gray-300 w-4 h-4 p-1 rounded-2xl cursor-pointer'}
            icon={faClose}
            onClick={() => setShow(!show)}
          />
          <Link to={'/banner'}>
            <img
              alt={'top-event'}
              className={'w-full rounded-lg'}
              title={'top-event'}
              src={'https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/29/41/294174e0ace7c74d5773b38eccdcd66b.png'}
            />
          </Link>
        </div>
      )
    );
  };

  return render();
};

export default Banner;
