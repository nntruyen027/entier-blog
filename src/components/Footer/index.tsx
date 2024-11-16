import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const helpdesk = [
  {
    title: 'customer-support',
    phone: '1900 232 460'
  },
  {
    title: 'technical-support',
    phone: '1900 232 461'
  },
  {
    title: 'sales-inquiries',
    phone: '1900 232 462'
  }
];

const aboutMe = [
  {
    title: 'company-introduction',
    url: '/about/company-introduction'
  },
  {
    title: 'careers',
    url: '/about/careers'
  },
  {
    title: 'contact-us',
    url: '/about/contact'
  },
  {
    title: 'locations',
    url: '/about/locations'
  }
];

const other = [
  {
    title: 'terms-of-service',
    url: '/legal/terms-of-service'
  },
  {
    title: 'privacy-policy',
    url: '/legal/privacy-policy'
  },
  {
    title: 'support-center',
    url: '/support'
  },
  {
    title: 'partner-program',
    url: '/partners'
  }
];

const partners = [
  {
    title: 'Partner 1',
    url: '/partners/partner-1'
  },
  {
    title: 'Partner 2',
    url: '/partners/partner-2'
  },
  {
    title: 'Partner 3',
    url: '/partners/partner-3'
  },
  {
    title: 'Partner 4',
    url: '/partners/partner-4'
  }
];

const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className='w-full bg-white mt-10 px-40 text-sm flex justify-between'>
      <div className='text-left py-3'>
        <h3 className='font-bold'>{t('helpdesk')}</h3>
        <table className='border-separate border-spacing-y-1'>
          <tbody>
            {helpdesk.map((item, index) => (
              <tr key={index}>
                <td className='text-left'>{t(item.title)}:</td>
                <td className='cursor-pointer text-[#2f80ed] font-bold'>{item.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='text-left py-3'>
        <h3 className='font-bold'>{t('about-us')}</h3>
        <div className='leading-6'>
          {aboutMe.map((item, index) => (
            <Link key={index} to={item.url} className='block text-gray-700 hover:text-blue-600'>
              {t(item.title)}
            </Link>
          ))}
        </div>
      </div>
      <div className='text-left py-3'>
        <h3 className='font-bold'>{t('resources')}</h3>
        <div className='leading-6'>
          {other.map((item, index) => (
            <Link key={index} to={item.url} className='block text-gray-700 hover:text-blue-600'>
              {t(item.title)}
            </Link>
          ))}
        </div>
      </div>
      <div className='text-left py-3'>
        <h3 className='font-bold'>{t('our-partners')}</h3>
        <div className='leading-6'>
          {partners.map((item, index) => (
            <Link key={index} to={item.url} className='block text-gray-700 hover:text-blue-600'>
              {t(item.title)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
