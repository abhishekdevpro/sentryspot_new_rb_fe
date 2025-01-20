import React from "react";
import PropTypes from "prop-types";

const LetterDetailsWrapper = ({ letterDetails, editable = false, headerColor = "black", className = "" }) => {
  return (
    <div className={`p-4 md:p-8 bg-gray-100 rounded-lg shadow-md ${className}`}>
      <h2
        className="text-2xl font-bold mb-6"
        style={{ color: headerColor }}
      >
        Letter Details
      </h2>
      <div className="space-y-4">
        {/* Date */}
        {letterDetails.date && (
          <p
            className={`text-gray-800 ${editable ? "hover:outline-dashed hover:outline-2 hover:outline-gray-400" : ""}`}
            contentEditable={editable}
            suppressContentEditableWarning={true}
          >
            <strong>Date:</strong> {letterDetails.date}
          </p>
        )}

        {/* Job Title */}
        {letterDetails.jobTitle && (
          <p
            className={`text-gray-800 ${editable ? "hover:outline-dashed hover:outline-2 hover:outline-gray-400" : ""}`}
            contentEditable={editable}
            suppressContentEditableWarning={true}
          >
            <strong>Job Title:</strong> {letterDetails.jobTitle}
          </p>
        )}

        {/* Reference */}
        {letterDetails.reference && (
          <p
            className={`text-gray-800 ${editable ? "hover:outline-dashed hover:outline-2 hover:outline-gray-400" : ""}`}
            contentEditable={editable}
            suppressContentEditableWarning={true}
          >
            <strong>Reference:</strong> {letterDetails.reference}
          </p>
        )}

        {/* Company Name */}
        {letterDetails.companyName && (
          <p
            className={`text-gray-800 ${editable ? "hover:outline-dashed hover:outline-2 hover:outline-gray-400" : ""}`}
            contentEditable={editable}
            suppressContentEditableWarning={true}
          >
            <strong>Company Name:</strong> {letterDetails.companyName}
          </p>
        )}

        {/* Salutation */}
        {letterDetails.salutation && (
          <p
            className={`text-gray-800 ${editable ? "hover:outline-dashed hover:outline-2 hover:outline-gray-400" : ""}`}
            contentEditable={editable}
            suppressContentEditableWarning={true}
          >
            <strong>Salutation:</strong> {letterDetails.salutation}
          </p>
        )}
      </div>
    </div>
  );
};

LetterDetailsWrapper.propTypes = {
  letterDetails: PropTypes.shape({
    date: PropTypes.string,
    jobTitle: PropTypes.string,
    reference: PropTypes.string,
    companyName: PropTypes.string,
    salutation: PropTypes.string,
  }).isRequired,
  editable: PropTypes.bool,
  headerColor: PropTypes.string,
  className: PropTypes.string,
};

LetterDetailsWrapper.defaultProps = {
  editable: false,
  headerColor: "black",
  className: "",
};

export default LetterDetailsWrapper;
