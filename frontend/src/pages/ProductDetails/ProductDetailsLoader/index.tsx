import React from 'react';
import ContentLoader from 'react-content-loader';

const ProductDetailsLoader = () => {
  return (
    <ContentLoader viewBox="0 0 320 280" height={280} width={320}>
      <rect x="0" y="0" rx="0" ry="0" width="280" height="20" />
      <rect x="0" y="27" rx="0" ry="0" width="239" height="20" />
      <rect x="0" y="54" rx="0" ry="0" width="274" height="20" />
      <rect x="0" y="81" rx="0" ry="0" width="280" height="20" />
      <rect x="0" y="108" rx="0" ry="0" width="239" height="20" />
      <rect x="0" y="135" rx="0" ry="0" width="274" height="20" />
    </ContentLoader>
  );
};

export default ProductDetailsLoader;
