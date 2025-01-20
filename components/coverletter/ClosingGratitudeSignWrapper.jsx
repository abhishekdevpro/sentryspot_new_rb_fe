import React from "react";
import PropTypes from "prop-types";

const ClosingGratitudeAndSignWrapper = ({
  closing,
  gratitude,
  signature,
  editable = false,
  headerColor = "black",
  className = "",
}) => {
  return (
    <div className={`p-4 md:p-8 bg-gray-100 rounded-lg shadow-md ${className}`}>
      <h2
        className="text-2xl font-bold mb-6"
        style={{ color: headerColor }}
      >
        Closing & Gratitude
      </h2>

      {/* Closing Section */}
      {closing && (
        <div className="mb-6">
          <h3
            className="text-xl font-semibold mb-4"
            style={{ color: headerColor }}
          >
            Closing
          </h3>
          <p
            className={`text-gray-800 ${editable ? "hover:outline-dashed hover:outline-2 hover:outline-gray-400" : ""}`}
            contentEditable={editable}
            suppressContentEditableWarning={true}
          >
            {closing}
          </p>
        </div>
      )}

      {/* Gratitude Section */}
      {gratitude && (
        <div className="mb-6">
          <h3
            className="text-xl font-semibold mb-4"
            style={{ color: headerColor }}
          >
            Gratitude
          </h3>
          <p
            className={`text-gray-800 ${editable ? "hover:outline-dashed hover:outline-2 hover:outline-gray-400" : ""}`}
            contentEditable={editable}
            suppressContentEditableWarning={true}
          >
            {gratitude}
          </p>
        </div>
      )}

      {/* Signature Section */}
      {signature && (
        <div>
          <h3
            className="text-xl font-semibold mb-4"
            style={{ color: headerColor }}
          >
            Signature
          </h3>
          <p
            className={`text-gray-800 ${editable ? "hover:outline-dashed hover:outline-2 hover:outline-gray-400" : ""}`}
            contentEditable={editable}
            suppressContentEditableWarning={true}
          >
            {signature}
          </p>
        </div>
      )}
    </div>
  );
};

ClosingGratitudeAndSignatureWrapper.propTypes = {
  closing: PropTypes.string.isRequired,
  gratitude: PropTypes.string.isRequired,
  signature: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  headerColor: PropTypes.string,
  className: PropTypes.string,
};

ClosingGratitudeAndSignatureWrapper.defaultProps = {
  editable: false,
  headerColor: "black",
  className: "",
};

export default ClosingGratitudeAndSignWrapper;
