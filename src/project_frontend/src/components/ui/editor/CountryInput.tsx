import React from "react";
import { CountryCode } from "../../../types";
import { Countries } from "../../../data";
import FilterDropdown from "../filters/FilterDropdown";
import { FilterIcon, GlobeIcon } from "../../icons/FilterIcons";

interface CountryInputProps {
  countries: CountryCode[];
  onAddCountry: (country: CountryCode) => void;
  onRemoveCountry: (country: CountryCode) => void;
}

export function CountryInput({
  countries,
  onAddCountry,
  onRemoveCountry,
}: CountryInputProps) {
  const availableCountries = Object.keys(Countries) as CountryCode[];

  const handleCountrySelect = (country: CountryCode) => {
    if (!countries.includes(country)) {
      onAddCountry(country);
    }
  };

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">Countries</legend>
      <div className="flex gap-2 items-start">
        <FilterDropdown
          label="Select Countries"
          icon={<GlobeIcon />}
          badgeCount={countries.length}
          className="w-80"
        >
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {availableCountries.map((country) => (
              <label
                key={country}
                className="flex items-center gap-2 cursor-pointer hover:bg-base-200 p-2 rounded"
              >
                <input
                  type="checkbox"
                  checked={countries.includes(country)}
                  onChange={() => {
                    if (countries.includes(country)) {
                      onRemoveCountry(country);
                    } else {
                      handleCountrySelect(country);
                    }
                  }}
                  className="checkbox checkbox-sm"
                />
                <span className="text-sm">{Countries[country]}</span>
              </label>
            ))}
          </div>
        </FilterDropdown>
      </div>
      {countries.length > 0 && (
        <CountryList countries={countries} onRemove={onRemoveCountry} />
      )}
      <div className="label">Optional</div>
    </fieldset>
  );
}

interface CountryListProps {
  countries: CountryCode[];
  onRemove: (country: CountryCode) => void;
}

function CountryList({ countries, onRemove }: CountryListProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {countries.map((country) => (
        <CountryBadge
          key={country}
          country={country}
          onRemove={() => onRemove(country)}
        />
      ))}
    </div>
  );
}

interface CountryBadgeProps {
  country: CountryCode;
  onRemove: () => void;
}

function CountryBadge({ country, onRemove }: CountryBadgeProps) {
  return (
    <div
      className="badge badge-secondary cursor-pointer"
      onClick={onRemove}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onRemove()}
    >
      {Countries[country]} ×
    </div>
  );
}
