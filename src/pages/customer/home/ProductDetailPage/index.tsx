import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { RootState } from '~/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getProductStart } from '~/redux/product/slice';
import { Button, Collapse, Empty, Menu, MenuProps, Typography } from 'antd';
import { formatDate } from '~/utils/date';
import { ArrowUpOutlined } from '@ant-design/icons';
import { Tag } from '~/components';

const { Title } = Typography;

const Component = () => {
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
    const newToc: { id: string; text: string; level: number }[] = [];

    headings.forEach((heading, index) => {
      const level = Number(heading.tagName.slice(1));
      const id = `heading-${index}`;
      heading.setAttribute('id', id);
      newToc.push({ id, text: heading.textContent || '', level });
    });

    setToc(newToc);

    const serializedContent = doc.body.innerHTML;

    const contentWithScript = `
      <html>
        <head>
          <style>
            body {
              font-family: 'Inter', sans-serif;
              line-height: 1.6;
              padding: 24px;
              color: #333;
              margin: 0 auto;
              background-color: white;
            }
            a { color: #1a0dab; text-decoration: none; }
            a:hover { text-decoration: underline; }
            strong { font-weight: bold; }
            em { font-style: italic; }
            p { margin-bottom: 1em; }
            h1, h2, h3, h4, h5, h6 { scroll-margin-top: 80px; }
          </style>
        </head>
        <body>
          ${serializedContent}
          <script>
            function sendHeight() {
              const height = document.body.scrollHeight;
              window.parent.productMessage({ iframeHeight: height }, '*');
            }
            window.onload = sendHeight;
            window.onresize = sendHeight;
            setTimeout(sendHeight, 100);
          </script>
        </body>
      </html>
    `;

    const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
    if (!iframeDoc) return;
    iframeDoc.open();
    iframeDoc.write(contentWithScript);
    iframeDoc.close();
  }, [product?.content]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.iframeHeight) {
        setHeight(event.data.iframeHeight);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const scrollToHeading = (id: string) => {
    const iframeDoc = iframeRef.current?.contentDocument || iframeRef.current?.contentWindow?.document;
    if (!iframeDoc) return;
    const target = iframeDoc.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const menuItems: MenuProps['items'] = toc.map((item) => ({
    key: item.id,
    label: <span style={{ marginLeft: `${(item.level - 1) * 12}px` }}>{item.text}</span>,
    onClick: () => {
      scrollToHeading(item.id);
    }
  }));

  return (
    <div className='flex justify-center text-center'>
      <div className='w-[80%] bg-white '>
        {product?.image ? <img src={product?.image} className={'w-full'} alt={product.name} /> : <Empty />}
        <Title className={'my-3 '} level={2}>
          {product?.name}
        </Title>
        <div className={'w-full flex justify-center text-left p-3 italic'}>{product?.description}</div>
        <div className={'w-full flex justify-between'}>
          <div className={'flex justify-end gap-1 p-3 items-center'}>
            {product?.tags.map((tag) => <Tag name={tag.name} color={tag.color} />)}
          </div>
          <div className={'w-full flex justify-end text-left p-3 italic'}>
            {product?.createAt && formatDate(product?.createAt, 'DD/MM/YYYY')}
          </div>
        </div>

        <div className='w-full flex justify-center'>
          <Collapse
            className={'text-left mb-3 w-[98%]'}
            items={[{ key: '1', label: 'Mục lục', children: <Menu mode='vertical' items={menuItems} /> }]}
          />
        </div>

        <iframe
          ref={iframeRef}
          title={product?.name}
          style={{
            width: '100%',
            height,
            border: 'none',
            transition: 'height 0.2s ease'
          }}
        />
      </div>
      <Button
        type='primary'
        shape='circle'
        icon={<ArrowUpOutlined />}
        size='large'
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          position: 'fixed',
          bottom: 40,
          right: 40,
          zIndex: 1000,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }}
      />
    </div>
  );
};

export default Component;
