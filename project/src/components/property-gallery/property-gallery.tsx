import React from 'react';

type PropertyGalleryType = {
  images: string[];
}
function PropertyGallery({images}: PropertyGalleryType): JSX.Element {
  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {images.map((image) => (
          <div className="property__image-wrapper" key={image}>
            <img className="property__image" src={image} alt={image} data-testid='property__image'/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(PropertyGallery);
