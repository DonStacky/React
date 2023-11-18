import React from 'react';
import ContentLoader from 'react-content-loader';
import './card.scss';

const Skeleton = (/* props */) => (
  <ContentLoader
    speed={2}
    className="card"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    // {...props}
  >
    <div className="card__imgbox" />
    <div className="card__title" />
    <div className="card__text" />
    {/* <rect x="0" y="100" rx="8" ry="8" width="220" height="50" /> */}
    {/* <rect x="40" y="155" rx="8" ry="8" width="30" height="15" /> */}
  </ContentLoader>
);

export default Skeleton;
