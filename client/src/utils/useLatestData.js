import { useState, useEffect } from 'react';

// Allow syntax highlighting in vs code for graphql strings
const gql = String.raw;

const DetailFragment = gql`
  name
  _id
  image {
    asset {
      url
      metadata {
        lqip
      }
    }
  }
`;

const query = gql`
  query {
    StoreSettings(id: "downtown") {
      name
      slicemaster {
        ${DetailFragment}
      }
      hotSlices {
        ${DetailFragment}
      }
    }
  }
`;

export default function useLatestData() {
  const [hotSlices, setHotSlices] = useState();
  const [slicemasters, setSlicemasters] = useState();

  useEffect(function () {
    fetch(process.env.GATSBY_SANITY_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSlicemasters(res.data.StoreSettings.slicemaster);
      })
      .catch((err) => console.log('error:', err));
  }, []);

  return {
    hotSlices,
    slicemasters,
  };
}
