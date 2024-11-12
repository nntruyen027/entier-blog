import { useState } from 'react';
import { Box, Paper, Tab, Tabs } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Item, ShortNew } from '~/types';
import { ItemComponent as ProductComponent } from '~/components';

interface TabData {
  sub_title: string;
  url: string | null | undefined;
  items: Item[];
}

interface MultiTabListProps {
  title: string;
  data: TabData[];
  ItemComponent: React.ComponentType<{ item: Item | ShortNew }>; // More specific type for ItemComponent
}

const MultiTabList: React.FC<MultiTabListProps> = ({ title, data, ItemComponent = ProductComponent }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const { t } = useTranslation();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <div className='first-letter:uppercase font-bold text-2xl text-left mb-4'>{title}</div>
      <Paper className='pb-4'>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant='standard'
          scrollButtons='auto'
          aria-label='category tabs'
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: '#F79009' // Custom tab indicator color
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
            gridTemplateColumns: 'repeat(auto-fill, minmax(192px, 1fr))', // Responsive grid
            justifyItems: 'center'
          }}
        >
          {data[selectedTab]?.items
            .slice(0, 10) // More concise slicing
            .map((item, index) => <ItemComponent key={index} item={item} />)}
        </Box>
        <div>
          <Link to={data[selectedTab]?.url}>
            <span className='first-letter:uppercase mr-3'>{t('more')}</span>
            <FontAwesomeIcon icon={faAngleRight} />
          </Link>
        </div>
      </Paper>
    </div>
  );
};

export default MultiTabList;
