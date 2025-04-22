import { useEffect, useRef, useState } from 'react';

interface QuillContentProps {
  content: string | undefined;
}

const QuillContent: React.FC<QuillContentProps> = ({ content }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(500); // Default height
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

  useEffect(() => {
    if (!content || !iframeRef.current) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');

    const toc: { id: string; text: string; level: number }[] = [];
    const headingElements = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');

    headingElements.forEach((heading, index) => {
      const id = `heading-${index}`;
      heading.setAttribute('id', id);
      toc.push({
        id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName[1])
      });
    });

    setHeadings(toc); // Update headings for TOC

    const htmlContent = doc.body.innerHTML;

    const iframeHTML = `
      <html>
        <head>
          <style>
            body {
              font-family: 'Segoe UI', sans-serif;
              margin: 0;
              padding: 24px;
              color: #2d2d2d;
              line-height: 1.7;
            }
            h1, h2, h3, h4, h5, h6 {
              margin-top: 2em;
              color: #1a1a1a;
            }
            img {
              max-width: 100%;
              height: auto;
              display: block;
              margin: 1.2em auto;
            }
            pre {
              background: #2d2d2d;
              color: white;
              border-radius: 8px;
              padding: 16px;
              overflow-x: auto;
              font-size: 14px;
              position: relative;
              line-height: 1.5;
            }
            code {
              font-family: 'Fira Code', monospace;
            }
            .collapsible-header {
              cursor: pointer;
              padding-right: 20px;
            }
            .collapsible-header::after {
              content: '▼';
              position: absolute;
              right: 0;
              top: 0;
              font-size: 12px;
            }
            .collapsed + .collapsible-content {
              display: none;
            }
          </style>
        </head>
        <body>
          ${htmlContent}
          <script>
            function sendHeight() {
              window.parent.postMessage({ iframeHeight: document.body.scrollHeight }, '*');
            }

            function scrollToId(id) {
              const el = document.getElementById(id);
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }

            window.onload = () => {
              sendHeight();
              window.onresize = sendHeight;
              setTimeout(sendHeight, 200);
            };

            window.addEventListener('message', (event) => {
              if (event.data?.scrollToId) {
                scrollToId(event.data.scrollToId);
              }
            });
          </script>
        </body>
      </html>
    `;

    const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
    if (!iframeDoc) return;
    iframeDoc.open();
    iframeDoc.write(iframeHTML);
    iframeDoc.close();
  }, [content]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.iframeHeight) {
        setHeight(event.data.iframeHeight); // Update height based on the content inside iframe
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleTocClick = (id: string) => {
    iframeRef.current?.contentWindow?.postMessage({ scrollToId: id }, '*');
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* TOC */}
      <div
        style={{
          width: '250px',
          padding: '16px',
          background: '#f9fafb',
          borderRadius: 8,
          marginRight: '20px'
        }}
      >
        {headings.length > 0 && (
          <div>
            <h3 style={{ fontSize: 18, marginBottom: 12 }}>📖 Mục lục</h3>
            <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
              {headings.map((heading) => (
                <li
                  key={heading.id}
                  onClick={() => handleTocClick(heading.id)}
                  style={{
                    marginLeft: (heading.level - 1) * 16,
                    marginBottom: 8,
                    cursor: 'pointer',
                    color: '#007bff',
                    textDecoration: 'none',
                    fontSize: 14,
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#0056b3')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#007bff')}
                >
                  {heading.text}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <iframe
        ref={iframeRef}
        style={{
          width: '100%',
          height: `${height}px`,
          border: 'none',
          borderRadius: 8,
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
          transition: 'height 0.3s ease',
          background: 'white'
        }}
      />
    </div>
  );
};

export default QuillContent;
