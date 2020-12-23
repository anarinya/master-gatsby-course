import styled from 'styled-components';

const OrderFormStyles = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  fieldset {
    grid-column: span 2;
    max-height: 600px;
    overflow: auto;
    display: grid;
    gap: 1rem;
    align-content: flex-start;
    background: var(--white);
    &.order,
    &.menu {
      grid-column: span 1;
      height: 600px;
    }
  }

  legend {
    display: inline-block;
  }

  label > span {
    display: block;
    margin-bottom: 0.5rem;
  }

  .mapleSyrup {
    display: none;
  }

  @media (max-width: 900px) {
    fieldset.menu,
    fieldset.order {
      grid-column: span 2;
    }
  }
`;

export default OrderFormStyles;
