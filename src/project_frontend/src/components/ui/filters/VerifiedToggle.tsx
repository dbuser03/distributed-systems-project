import React from "react";

interface VerifiedToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function VerifiedToggle({ checked, onChange }: VerifiedToggleProps) {
  return (
    <div className="flex items-center ml-auto">
      <span className="text-sm whitespace-nowrap">
        {checked ? "Verified" : "All Stories"}
      </span>
      <input
        type="checkbox"
        className="toggle toggle-primary toggle-xl ml-2"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </div>
  );
}

export default VerifiedToggle;
