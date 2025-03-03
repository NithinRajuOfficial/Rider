import { useState } from "react";
import PropTypes from "prop-types";
import { PiExclamationMarkBold } from "react-icons/pi";

const CustomSelect = ({ label, options, registering, errors }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    setHasValue(e.target.value !== "");
  };

  const handleChange = (e) => {
    setHasValue(e.target.value !== "");
    if (registering?.onChange) {
      registering.onChange(e);
    }
  };

  const handleErrorIconClick = () => {
    setShowTooltip(!showTooltip);
  };

  const shouldFloat = isFocused || hasValue;

  return (
    <div className="relative w-72 md:w-full">
      <div className="relative">
        {/* Select Field */}
        <select
          id={registering?.name}
          className={`peer w-full h-10 px-3 py-2 text-gray-700 bg-gray-100 border rounded-md focus:outline-none focus:ring-1 
                     ${
                       errors
                         ? "border-red-500 ring-red-500 pr-10"
                         : "border-gray-300 focus:ring-blue-500"
                     }`}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...registering}
        >
          <option value="" className="text-gray-700">
            Select {label}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Floating Label */}
        <label
          htmlFor={registering?.name}
          className={`absolute text-sm duration-200 transform -translate-y-4 scale-75 top-2 origin-[0] 
                     ${
                       shouldFloat
                         ? "left-2.5 text-blue-500 bg-white px-1 z-10 -translate-y-6"
                         : "left-3 text-gray-500"
                     }
                     ${
                       errors
                         ? "text-red-500"
                         : shouldFloat
                         ? "text-blue-500"
                         : "text-gray-500"
                     }
                     peer-focus:text-blue-500 peer-focus:bg-white peer-focus:px-1 peer-focus:z-10
                     peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-2.5`}
        >
          {label}
        </label>

        {/* Error Icon and Tooltip */}
        {errors && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <button
              type="button"
              onClick={handleErrorIconClick}
              className="text-red-500 cursor-pointer p-1 bg-gray-300 rounded-full"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <PiExclamationMarkBold />
            </button>
            {showTooltip && (
              <div className="absolute right-8 top-0 z-50 w-64 p-2 rounded-md bg-gray-300 text-red-500 text-sm shadow-md">
                {errors?.message}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

CustomSelect.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  registering: PropTypes.object.isRequired,
  errors: PropTypes.object,
};

CustomSelect.defaultProps = {
  errors: null,
};

export default CustomSelect;
