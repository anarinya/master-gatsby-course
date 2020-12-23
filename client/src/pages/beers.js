import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import SEO from '../components/SEO';

const defaultImgUrl =
  'https://www.totalwine.com/media/sys_master/cmsmedia/hff/h0e/8979036078110.png';

const BeerGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleBeerStyles = styled.div`
  border: 1px solid var(--gray);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    min-height: 200px;
    object-fit: contain;
    display: block;
    display: grid;
    align-items: center;
    font-size: 10px;
  }
`;

export default function BeersPage({ data }) {
  return (
    <>
      <SEO title={`Beers! ${data.beers.nodes.length} available!`} />
      <h2 className="center">
        We have {data.beers.nodes.length} beers available. Dine-in Only!
      </h2>
      <BeerGridStyles>
        {data.beers.nodes.map((beer) => {
          const rating = Math.round(beer.rating.average);
          console.log(beer);
          return (
            <SingleBeerStyles key={beer.id}>
              <img
                src={beer.image}
                alt={beer.name}
                onError={(e) => (e.target.style.visibility = 'hidden')}
              />
              <h3>{beer.name}</h3>
              {beer.price}
              <p title={`${rating} out of 5 stars`}>
                {`★`.repeat(rating)}
                {`☆`.repeat(5 - rating)}
                <span>({beer.rating.reviews})</span>
              </p>
            </SingleBeerStyles>
          );
        })}
      </BeerGridStyles>
    </>
  );
}

export const query = graphql`
  query {
    beers: allBeer {
      nodes {
        id
        name
        price
        image
        rating {
          average
          reviews
        }
      }
    }
  }
`;
