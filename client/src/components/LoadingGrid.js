import React from 'react';
import { ItemsGridStyles, ItemStyles } from '../styles/Grids';

// Blank img - generate from png-pixel.com
const loadingSVG =
  'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAECAQAAADsOj3LAAAADklEQVR42mNkgANGQkwAAJoABWH6GPAAAAAASUVORK5CYII=';

export default function LoadingGrid({ count }) {
  console.log('');
  return (
    <ItemsGridStyles>
      {Array.from(Array(count).keys(), (v) => (
        <ItemStyles key={v}>
          <p>
            <span className="mark">Loading...</span>
          </p>
          <img
            src={loadingSVG}
            className="loading"
            alt="Loading"
            width="500"
            height="400"
          />
        </ItemStyles>
      ))}
    </ItemsGridStyles>
  );
}
