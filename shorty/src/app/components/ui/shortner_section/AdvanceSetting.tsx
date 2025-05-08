import { useState } from "react";
import {
  FaMobile,
  FaGlobe,
  FaTimes,
  FaLink,
} from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface Settings {
  countryRestriction: boolean;
  showCountryDropdown: boolean;
  expiryType: "clicks" | "time" | "none";
  maxClicks: number;
  expiryTimeValue: number;
  expiryTimeUnit: "days" | "hours" | "months";
  showAdvanceSettings: boolean;
}

interface AdvancedSettingsProps {
  settings: Settings;
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
}

const AdvancedSettings = ({
  settings,
  updateSetting,
}: AdvancedSettingsProps) => {
  const [blockedCountries, setBlockedCountries] = useState<string[]>([]);

  // Sample country data
  const countries = [
    { code: "US", name: "United States" },
    { code: "GB", name: "United Kingdom" },
    { code: "CA", name: "Canada" },
    { code: "AU", name: "Australia" },
    { code: "IN", name: "India" },
    { code: "JP", name: "Japan" },
    { code: "DE", name: "Germany" },
    { code: "FR", name: "France" },
  ];

  const toggleCountry = (countryCode: string) => {
    if (blockedCountries.includes(countryCode)) {
      setBlockedCountries(blockedCountries.filter((c) => c !== countryCode));
    } else {
      setBlockedCountries([...blockedCountries, countryCode]);
    }
  };

  const resetSettings = () => {
    updateSetting("countryRestriction", false);
    updateSetting("showCountryDropdown", false);
    updateSetting("expiryType", "none");
    updateSetting("maxClicks", 0);
    updateSetting("expiryTimeValue", 1);
    updateSetting("expiryTimeUnit", "days");
    updateSetting("showAdvanceSettings", false);
    setBlockedCountries([]);
  };

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={() =>
          updateSetting("showAdvanceSettings", !settings.showAdvanceSettings)
        }
        className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
      >
        {settings.showAdvanceSettings ? (
          <>
            <span>Hide Advanced Settings</span>
            <FiChevronUp className="ml-1" />
          </>
        ) : (
          <>
            <span>Show Advanced Settings</span>
            <FiChevronDown className="ml-1" />
          </>
        )}
      </button>

      {settings.showAdvanceSettings && (
        <div className="mt-4 p-6 bg-gray-50 rounded-lg border border-gray-200 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">
              Advanced Settings
            </h3>
            <button
              onClick={resetSettings}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
            >
              <FaTimes className="mr-1" /> Reset
            </button>
          </div>

          {/* Country Restriction */}
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={settings.countryRestriction}
                  onChange={() =>
                    updateSetting(
                      "countryRestriction",
                      !settings.countryRestriction
                    )
                  }
                />
                <div
                  className={`block w-12 h-6 rounded-full transition-colors ${
                    settings.countryRestriction ? "bg-indigo-500" : "bg-gray-300"
                  }`}
                ></div>
                <div
                  className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                    settings.countryRestriction ? "transform translate-x-6" : ""
                  }`}
                ></div>
              </div>
              <div className="flex items-center">
                <FaGlobe className="text-gray-600 mr-2" />
                <span className="text-gray-700 font-medium">
                  Country Restrictions
                </span>
              </div>
            </label>

            {settings.countryRestriction && (
              <div className="ml-4 pl-6 border-l-2 border-gray-200">
                <div className="relative">
                  <button
                    onClick={() =>
                      updateSetting(
                        "showCountryDropdown",
                        !settings.showCountryDropdown
                      )
                    }
                    className="w-full flex justify-between items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm"
                  >
                    <span>
                      {blockedCountries.length > 0
                        ? `${blockedCountries.length} countries blocked`
                        : "Select countries to block"}
                    </span>
                    <FiChevronDown
                      className={`transition-transform ${
                        settings.showCountryDropdown
                          ? "transform rotate-180"
                          : ""
                      }`}
                    />
                  </button>

                  {settings.showCountryDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                      <div className="p-2 space-y-2">
                        {countries.map((country) => (
                          <label
                            key={country.code}
                            className="flex items-center px-3 py-2 hover:bg-gray-50 rounded cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={blockedCountries.includes(country.code)}
                              onChange={() => toggleCountry(country.code)}
                              className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                            />
                            <span className="ml-3 text-gray-700">
                              {country.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {blockedCountries.length > 0
                    ? "Link will be blocked in selected countries"
                    : "All countries will be allowed by default"}
                </p>
              </div>
            )}
          </div>

          {/* Expiration Settings */}
          <div className="space-y-4">
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="expiry"
                  checked={settings.expiryType === "none"}
                  onChange={() => updateSetting("expiryType", "none")}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-gray-700 font-medium">Never expire</span>
              </label>
            </div>

            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="expiry"
                  checked={settings.expiryType === "clicks"}
                  onChange={() => updateSetting("expiryType", "clicks")}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-gray-700 font-medium">Expire after</span>
                <input
                  type="number"
                  min="0"
                  value={settings.maxClicks}
                  onChange={(e) =>
                    updateSetting("maxClicks", Number(e.target.value))
                  }
                  disabled={settings.expiryType !== "clicks"}
                  className="w-20 px-3 py-1 border border-gray-300 rounded-md disabled:bg-gray-100 disabled:text-gray-500"
                />
                <span className="text-gray-500">clicks (0 = infinite)</span>
              </label>
            </div>

            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="expiry"
                  checked={settings.expiryType === "time"}
                  onChange={() => updateSetting("expiryType", "time")}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-gray-700 font-medium">Expire in</span>
                <input
                  type="number"
                  min="1"
                  value={settings.expiryTimeValue}
                  onChange={(e) =>
                    updateSetting("expiryTimeValue", Number(e.target.value))
                  }
                  disabled={settings.expiryType !== "time"}
                  className="w-16 px-3 py-1 border border-gray-300 rounded-md disabled:bg-gray-100 disabled:text-gray-500"
                />
                <select
                  value={settings.expiryTimeUnit}
                  onChange={(e) =>
                    updateSetting(
                      "expiryTimeUnit",
                      e.target.value as "days" | "hours" | "months"
                    )
                  }
                  disabled={settings.expiryType !== "time"}
                  className="px-3 py-1 border border-gray-300 rounded-md disabled:bg-gray-100 disabled:text-gray-500"
                >
                  <option value="hours">hours</option>
                  <option value="days">days</option>
                  <option value="months">months</option>
                </select>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSettings;
