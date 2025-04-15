import React, { useState } from 'react';

const SortDropdown = ({ onChange }: { onChange: (value: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Sort By');

  const options = [
    { label: 'Price: Low → High', value: 'priceLowHigh' },
    { label: 'Price: High → Low', value: 'priceHighLow' },
    { label: 'Title: A–Z', value: 'titleAZ' },
    { label: 'Title: Z–A', value: 'titleZA' },
  ];

  const handleSelect = (option: (typeof options)[0]) => {
    setSelected(option.label);
    setIsOpen(false);
    onChange(option.value);
  };

  return (
    <div className="relative inline-block text-left w-52">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded-full border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
      >
        {selected}
        <span className="float-right ml-2">
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800">
          <div className="py-1">
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 dark:text-white dark:hover:bg-gray-700"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
