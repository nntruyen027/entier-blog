import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { getProductStart } from '~/redux/product/slice';
import { Button, Collapse, Empty, Menu, Tooltip, Typography } from 'antd';
import { ArrowUpOutlined, EyeOutlined, FilePdfOutlined } from '@ant-design/icons';
import { formatDate } from '~/utils/date';
import { Tag } from '~/components';

const { Title, Text } = Typography;

const ProductDetail = () => {
  const { id } = useParams();
  const { product } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(500);
  const [toc, setToc] = useState<{ id: string; text: string; level: number }[]>([]);

  useEffect(() => {
    dispatch(getProductStart(id));
  }, [id]);

  useEffect(() => {
    if (!product?.content || !iframeRef.current) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(product.content, 'text/html');
    const headings = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    const newToc = headings.map((heading, index) => {
      const id = `heading-${index}`;
      heading.setAttribute('id', id);
      return {
        id,
        text: heading.textContent || '',
        level: Number(heading.tagName.slice(1))
      };
    });

    setToc(newToc);

    const contentWithScript = `
      <html>
        <head>
          <style>
            body {
              font-family: 'Inter', sans-serif;
              line-height: 1.6;
              padding: 24px;
              color: #333;
              background-color: white;
            }
            h1, h2, h3, h4, h5, h6 { scroll-margin-top: 80px; }
          </style>
        </head>
        <body>
          ${doc.body.innerHTML}
          <script>
            function sendHeight() {
              const height = document.body.scrollHeight;
              window.parent.postMessage({ iframeHeight: height }, '*');
            }
            window.onload = sendHeight;
            window.onresize = sendHeight;
            setTimeout(sendHeight, 100);
          </script>
        </body>
      </html>
    `;

    const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
    if (iframeDoc) {
      iframeDoc.open();
      iframeDoc.write(contentWithScript);
      iframeDoc.close();
    }
  }, [product?.content]);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.iframeHeight) setHeight(e.data.iframeHeight);
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const scrollToHeading = (id: string) => {
    const iframeDoc = iframeRef.current?.contentDocument || iframeRef.current?.contentWindow?.document;
    const target = iframeDoc?.getElementById(id);
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  const menuItems = toc.map((item) => ({
    key: item.id,
    label: <span style={{ marginLeft: `${(item.level - 1) * 12}px` }}>{item.text}</span>,
    onClick: () => scrollToHeading(item.id)
  }));

  return (
    <div className='flex justify-center px-4 sm:px-6 lg:px-10 py-8 bg-gray-50 min-h-screen'>
      <div className='w-full max-w-6xl bg-white rounded-xl shadow-md overflow-hidden'>
        {/* Header với ảnh và overlay tên */}
        {product?.image ? (
          <div className='relative h-60 sm:h-72'>
            <img src={product.image} alt={product.name} className='w-full h-full object-cover' />
            <div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center'>
              <Title level={2} className='!text-white text-center'>
                {product?.name}
              </Title>
            </div>
          </div>
        ) : (
          <Empty />
        )}

        {/* Info Section */}
        <div className='px-6 py-4'>
          <div className='flex flex-wrap gap-3 justify-between items-center mb-4'>
            <div className='text-gray-600 italic'>{product?.description}</div>
            <div className='flex gap-4 text-sm text-gray-500'>
              <span>
                <EyeOutlined className='mr-1' />
                {product?.view || 0} lượt xem
              </span>
              <span>{formatDate(product?.createAt, 'DD/MM/YYYY')}</span>
            </div>
          </div>

          <div className='flex flex-wrap gap-2 mb-4'>
            {product?.tags.map((tag) => (
              <Tooltip key={tag.name} title={tag.name.length > 12 ? tag.name : ''}>
                <Tag name={tag.name} color={tag.color} />
              </Tooltip>
            ))}
          </div>

          <div className='mb-4 text-xl font-semibold text-blue-600'>Giá: {product?.price?.toLocaleString()}đ</div>

          {product?.file && (
            <Button
              type='default'
              icon={<FilePdfOutlined />}
              href={product.file}
              target='_blank'
              rel='noopener noreferrer'
              className='mb-6'
            >
              Xem tài liệu đính kèm
            </Button>
          )}

          {toc.length > 0 && (
            <Collapse
              className='text-left mb-6'
              items={[
                {
                  key: 'toc',
                  label: <span className='font-semibold'>Mục lục nội dung</span>,
                  children: <Menu mode='vertical' items={menuItems} />
                }
              ]}
            />
          )}

          <iframe
            ref={iframeRef}
            title='Product content'
            style={{
              width: '100%',
              height,
              border: 'none',
              transition: 'height 0.2s ease',
              borderRadius: 8
            }}
          />
        </div>

        <Button
          type='primary'
          shape='circle'
          icon={<ArrowUpOutlined />}
          size='large'
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className='fixed bottom-10 right-10 z-50 shadow-lg'
        />
      </div>
    </div>
  );
};

export default ProductDetail;
