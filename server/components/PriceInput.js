import React from 'react';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';

const createPatchFrom = (value) =>
  PatchEvent.from(value === '' ? unset() : set(Number(value)));

const formatMoney = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format;

const PriceInput = ({ type, value, onChange, inputComponent }) => (
  <div>
    <h5>
      <div>
        {type.title} - {value ? formatMoney(value / 100) : formatMoney(0)}
      </div>
      <span style={{ fontWeight: 'normal' }}>{type.description}</span>
    </h5>
    <input
      type={type.name}
      value={value}
      onChange={(e) => onChange(createPatchFrom(e.target.value))}
      ref={inputComponent}
    />
  </div>
);

PriceInput.focus = function () {
  this._inputElement.focus();
};

export default PriceInput;
