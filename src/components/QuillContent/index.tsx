import { useEffect, useRef, useState } from 'react';

interface QuillContentProps {
  content: string | undefined;
}

const QuillContent: React.FC<QuillContentProps> = ({ content }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(500);

  useEffect(() => {
    if (!content || !iframeRef.current) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');

    // Tự động thêm class language-js nếu thiếu và thêm hljs để highlight hoạt động
    const preCodeBlocks = doc.querySelectorAll('pre > code');
    preCodeBlocks.forEach((code) => {
      if (!code.className.includes('language-')) {
        code.classList.add('language-js');
      }
    });

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
              margin: 0;
              background-color: white;
            }
            pre {
              background: #272822;
              border-radius: 8px;
              padding: 16px;
              overflow-x: auto;
              position: relative;
              color: white;
              font-size: 14px;
              line-height: 1.4;
            }
            code {
              font-family: 'Fira Code', monospace;
              white-space: pre;
            }
            .copy-btn {
              position: absolute;
              top: 10px;
              right: 10px;
              background-color: #007bff;
              color: white;
              border: none;
              padding: 6px 12px;
              cursor: pointer;
              border-radius: 4px;
              font-size: 12px;
            }
            .copy-btn:hover {
              background-color: #0056b3;
            }
            img {
              max-width: 100%;
              height: auto;
              display: block;
              margin: 12px auto;
            }
          </style>
        </head>
        <body>
          ${serializedContent}
          <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
          <script>
            function sendHeight() {
              const height = document.body.scrollHeight;
              window.parent.postMessage({ iframeHeight: height }, '*');
            }

            function addCopyButtons() {
              const pres = document.querySelectorAll('pre');
              pres.forEach(pre => {
                const button = document.createElement('button');
                button.innerText = 'Copy';
                button.className = 'copy-btn';
                const code = pre.querySelector('code');
                if (code) {
                  button.onclick = async () => {
                    try {
                      await navigator.clipboard.writeText(code.innerText);
                      alert('Code copied!');
                    } catch (err) {
                      alert('Copy failed: ' + err);
                    }
                  };
                  pre.appendChild(button);
                }
              });
            }

            window.addEventListener('DOMContentLoaded', () => {
              if (window.hljs) {
                window.hljs.highlightAll();
              }
              addCopyButtons();
              sendHeight();
            });

            window.onload = sendHeight;
            window.onresize = sendHeight;
            setTimeout(sendHeight, 200);
          </script>
        </body>
      </html>
    `;

    const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
    if (!iframeDoc) return;
    iframeDoc.open();
    iframeDoc.write(contentWithScript);
    iframeDoc.close();
  }, [content]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.iframeHeight) {
        setHeight(event.data.iframeHeight);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <iframe
      ref={iframeRef}
      style={{
        width: '100%',
        height,
        border: 'none',
        transition: 'height 0.2s ease'
      }}
    />
  );
};

export default QuillContent;
