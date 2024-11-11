import { useState } from 'react';
import { Box, Paper, Tab, Tabs } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

interface Item {
  name: string;
  img: string;
  originalPrice: number | null | undefined;
  price: number;
  gift: string;
  rating: number;
  url: string;
  labels: Label[];
  compares: Label[];
}

interface Label {
  color: string;
  bg: string;
  content: string;
}

interface TabData {
  sub_title: string;
  url: string | null | undefined;
  items: Item[];
}

interface MultiTabListProps {
  title: string;
  data: TabData[];
}

const MultiTabList: React.FC<MultiTabListProps> = ({ title, data }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const { t } = useTranslation();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <div className='first-letter:uppercase font-bold text-2xl text-left mb-4'>{title}</div>
      <Paper className={'pb-4'}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant='standard'
          scrollButtons='auto'
          aria-label='category tabs'
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: '#F79009' // Hides default Material-UI indicator
            }
          }}
        >
          {data.map((tab, index) => (
            <Tab
              sx={{
                outline: 'none',
                ':focus': { outline: '0' },
                '&.Mui-selected': {
                  borderColor: '#F79009',
                  backgroundColor: '#FFF6E3',
                  color: 'black'
                }
              }}
              key={index}
              label={tab.sub_title}
            />
          ))}
        </Tabs>

        <Box
          p={3}
          className='w-full grid gap-3'
          sx={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(192px, 1fr))',
            justifyItems: 'center'
          }}
        >
          {data[selectedTab]?.items
            .filter((item, index) => index < 10)
            .map((item, index) => (
              <Link to={item.url} key={index}>
                <div className='border min-h-[400px] px-4 py-2 border-gray-200 w-48 flex flex-col gap-3 rounded-lg'>
                  <div className='h-fit text-left flex gap-1 flex-wrap'>
                    {item.labels.map((label, labelIndex) => (
                      <span
                        key={labelIndex}
                        style={{
                          color: label.color,
                          backgroundColor: label.bg,
                          fontSize: '10px',
                          padding: '3px',
                          letterSpacing: '1px'
                        }}
                        className='rounded-sm'
                      >
                        {label.content}
                      </span>
                    ))}
                  </div>
                  <img
                    src={item.img}
                    alt={item.name}
                    className='w-36 h-36 object-cover m-0 hover:-translate-y-2 transition-transform duration-300 ease-in-out'
                  />

                  <div className='text-left mt-0 flex flex-col gap-1'>
                    <Link to={item.url} className='text-black'>
                      <h3 className='text-sm m-0'>{item.name}</h3>
                    </Link>

                    <div className='h-fit flex gap-1 flex-wrap justify-center'>
                      {item.compares.map((compare, compareIndex) => (
                        <span
                          key={compareIndex}
                          style={{
                            color: compare.color,
                            backgroundColor: compare.bg,
                            fontSize: '10px',
                            padding: '3px',
                            letterSpacing: '1px'
                          }}
                          className='rounded-sm'
                        >
                          {compare.content}
                        </span>
                      ))}
                    </div>

                    {/* Price Details */}
                    <div className='text-red-500 font-bold m-0'>{item.price.toLocaleString()}₫</div>
                    <div className='text-gray-500 line-through m-0'>
                      {item.originalPrice?.toLocaleString()}
                      {item.originalPrice && '₫'}
                    </div>

                    {/* Gift Section */}
                    <div className='text-sm text-gray-500 m-0'>Quà tặng: {item.gift}</div>

                    {/* Rating Section */}
                    <div className='text-black-500 text-sm m-0'>
                      <i className='fa-solid fa-star text-yellow-300'></i> {item.rating}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </Box>
        <div>
          <Link to={data[selectedTab]?.url}>
            <span className={'first-letter:uppercase mr-3'}>{t('more')}</span>
            <FontAwesomeIcon icon={faAngleRight} />
          </Link>
        </div>
      </Paper>
    </div>
  );
};

export default MultiTabList;
