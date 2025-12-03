import React from "react";

interface FilterDropdownProps {
  label: string;
  icon: React.ReactNode;
  badgeCount?: number;
  children: React.ReactNode;
  className?: string;
}

function FilterDropdown({
  label,
  icon,
  badgeCount,
  children,
  className = "w-64",
}: FilterDropdownProps) {
  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn m-1 whitespace-nowrap">
        {icon}
        {label}
        {badgeCount !== undefined && badgeCount > 0 && (
          <span className="badge badge-primary ml-2">{badgeCount}</span>
        )}
      </div>
      <div
        tabIndex={0}
        className={`dropdown-content card card-sm bg-base-100 z-10 shadow-md max-h-96 overflow-y-auto ${className}`}
      >
        <div className="card-body">{children}</div>
      </div>
    </div>
  );
}

export default FilterDropdown;
