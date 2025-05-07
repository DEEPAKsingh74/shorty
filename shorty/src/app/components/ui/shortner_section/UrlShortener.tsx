"use client";

import { useCallback, useState } from "react";
import { FaLink, FaCopy, FaMobile, FaDesktop } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { ExpiryType, TimeUnit } from "@/types";
import AdvancedSettings from "./AdvanceSetting";

const UrlShortener = () => {
  const [formState, setFormState] = useState({
    originalUrl: "",
    shortenedUrl: "",
    isLoading: false,
    error: "",
    copiedUrl: null as string | null,
  });

  // Advanced settings state
  const [settings, setSettings] = useState({
    deviceSpecific: false,
    mobileUrl: "",
    countryRestriction: false,
    showCountryDropdown: false,
    expiryType: "none" as ExpiryType,
    maxClicks: 0,
    expiryTimeValue: 1,
    expiryTimeUnit: "days" as TimeUnit,
    showAdvanceSettings: false,
  });

  // Memoized handlers
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormState((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const copyToClipboard = useCallback((url: string) => {
    navigator.clipboard.writeText(url);
    setFormState((prev) => ({ ...prev, copiedUrl: url }));
    setTimeout(
      () => setFormState((prev) => ({ ...prev, copiedUrl: null })),
      2000
    );
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState((prev) => ({ ...prev, isLoading: true, error: "" }));
    setSettings((prev) => ({ ...prev, showAdvanceSettings: false }));

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockShortUrl = `https://tiny.url/${Math.random()
        .toString(36)
        .substring(2, 8)}`;
      setFormState((prev) => ({ ...prev, shortenedUrl: mockShortUrl }));
    } catch (err) {
      setFormState((prev) => ({
        ...prev,
        error: "Failed to shorten URL. Please try again.",
      }));
    } finally {
      setFormState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  // Update specific settings
  const updateSetting = useCallback(
    <K extends keyof typeof settings>(key: K, value: (typeof settings)[K]) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md pt-30">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Shorten Your URL
      </h1>

      {/* URL Shortener Form */}
      <form 
      onSubmit={handleSubmit} 
      className="mb-6"
      
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <label
              htmlFor="originalUrl"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Enter your long URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLink className="text-gray-400" />
              </div>
              <input
                type="url"
                id="originalUrl"
                name="originalUrl"
                value={formState.originalUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/very-long-url"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div className="md:self-end">
            <button
              type="submit"
              disabled={formState.isLoading}
              className={`w-full md:w-auto px-6 py-3 border border-transparent text-sm font-bold tracking-wider rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                formState.isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {formState.isLoading ? "Shortening..." : "Shorten URL"}
            </button>
          </div>
        </div>

        {/* Advanced Settings Panel */}
        <AdvancedSettings settings={settings} updateSetting={updateSetting} />
      </form>

      {/* Result Section */}
      {formState.shortenedUrl && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-grow space-y-3">
              <p className="text-sm font-medium text-gray-700 mb-1">
                Your shortened URL
                {settings.deviceSpecific && settings.mobileUrl ? "s" : ""}:
              </p>

              {/* Desktop URL */}
              <div className="space-y-1">
                {settings.deviceSpecific && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    <FaDesktop className="mr-1" /> Desktop
                  </span>
                )}
                <div className="flex items-center">
                  <a
                    href={formState.shortenedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 break-all mr-2"
                  >
                    {formState.shortenedUrl}
                  </a>
                  <FiExternalLink className="text-gray-500 flex-shrink-0" />
                </div>
              </div>

              {/* Mobile URL (only shown if deviceSpecific is true) */}
              {settings.deviceSpecific && settings.mobileUrl && (
                <div className="space-y-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                    <FaMobile className="mr-1" /> Mobile
                  </span>
                  <div className="flex items-center">
                    <a
                      href={settings.mobileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 break-all mr-2"
                    >
                      {settings.mobileUrl}
                    </a>
                    <FiExternalLink className="text-gray-500 flex-shrink-0" />
                  </div>
                </div>
              )}
            </div>

            {/* Copy Button */}
            <div className="flex space-x-2 sm:flex-col sm:space-x-0 sm:space-y-2">
              <button
                onClick={() => copyToClipboard(formState.shortenedUrl)}
                className="flex-shrink-0 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {formState.copiedUrl === formState.shortenedUrl ? (
                  "Copied!"
                ) : (
                  <>
                    <FaCopy className="inline mr-1" /> Copy Desktop
                  </>
                )}
              </button>

              {settings.deviceSpecific && settings.mobileUrl && (
                <button
                  onClick={() => copyToClipboard(settings.mobileUrl)}
                  className="flex-shrink-0 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  {formState.copiedUrl === settings.mobileUrl ? (
                    "Copied!"
                  ) : (
                    <>
                      <FaCopy className="inline mr-1" /> Copy Mobile
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {formState.error && (
        <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
          <p className="text-sm text-red-600">{formState.error}</p>
        </div>
      )}
    </div>
  );
};

export default UrlShortener;
