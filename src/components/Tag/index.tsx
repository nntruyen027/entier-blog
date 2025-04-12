import React, { CSSProperties, useMemo } from 'react';

interface TagProps {
  name: string;
  color?: string; // optional để xử lý khi không có màu
}

const lightenColor = (hex: string, percent: number): string => {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
};

const Tag: React.FC<TagProps> = ({ name, color = '#000000' }) => {
  const style: CSSProperties = useMemo(() => {
    return {
      border: `1px solid ${color}`,
      backgroundColor: lightenColor(color, 70),
      color: '#333',
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '16px'
    };
  }, [color]);

  return <span style={style}>{name}</span>;
};

export default Tag;
