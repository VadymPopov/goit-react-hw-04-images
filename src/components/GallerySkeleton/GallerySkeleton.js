import React from "react";
import ContentLoader from "react-content-loader"

const GallerySkeleton = (props) => (
  <ContentLoader 
    speed={1}
    width={1488}
    height={820}
    viewBox="0 0 1488 820"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="16" y="10" rx="0" ry="0" width="360" height="260" /> 
    <rect x="392" y="10" rx="0" ry="0" width="360" height="260" /> 
    <rect x="768" y="10" rx="0" ry="0" width="360" height="260" /> 
    <rect x="1144" y="10" rx="0" ry="0" width="360" height="260" /> 
    <rect x="16" y="288" rx="0" ry="0" width="360" height="260" /> 
    <rect x="392" y="288" rx="0" ry="0" width="360" height="260" /> 
    <rect x="768" y="288" rx="0" ry="0" width="360" height="260" /> 
    <rect x="1144" y="288" rx="0" ry="0" width="360" height="260" /> 
  </ContentLoader>
);

export default GallerySkeleton;