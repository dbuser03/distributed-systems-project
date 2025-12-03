import React from "react";

interface CheckboxListProps<T extends string> {
  title: string;
  items: { key: T; label: string }[];
  selectedItems: T[];
  onToggle: (item: T) => void;
}

function CheckboxList<T extends string>({
  title,
  items,
  selectedItems,
  onToggle,
}: CheckboxListProps<T>) {
  return (
    <>
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="flex flex-col gap-1">
        {items.map(({ key, label }) => (
          <label
            key={key}
            className="flex items-center gap-2 cursor-pointer hover:bg-base-200 p-1 rounded"
          >
            <input
              type="checkbox"
              className="checkbox checkbox-sm"
              checked={selectedItems.includes(key)}
              onChange={() => onToggle(key)}
            />
            <span className="text-sm ml-2">{label}</span>
          </label>
        ))}
      </div>
    </>
  );
}

export default CheckboxList;
