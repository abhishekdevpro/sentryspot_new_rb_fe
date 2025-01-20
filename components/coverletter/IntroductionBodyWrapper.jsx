import React from "react";
import PropTypes from "prop-types";

const IntroductionBodyWrapper = ({
  introduction,
  body,
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
        Introduction & Body
      </h2>

      {/* Introduction Section */}
      {introduction && (
        <div className="mb-6">
          <h3
            className="text-xl font-semibold mb-4"
            style={{ color: headerColor }}
          >
            Introduction
          </h3>
          <p
            className={`text-gray-800 ${editable ? "hover:outline-dashed hover:outline-2 hover:outline-gray-400" : ""}`}
            contentEditable={editable}
            suppressContentEditableWarning={true}
          >
            {introduction}
          </p>
        </div>
      )}

      {/* Body Section */}
      <h3
        className="text-xl font-semibold mb-4"
        style={{ color: headerColor }}
      >
        Body Paragraphs
      </h3>
      <div className="space-y-4">
        {body.map((paragraph, index) => (
          <div key={index} className="mb-4">
            <h4
              className="text-lg font-medium"
              style={{ color: headerColor }}
            >
              Paragraph {index + 1}
            </h4>
            <p
              className={`text-gray-800 ${editable ? "hover:outline-dashed hover:outline-2 hover:outline-gray-400" : ""}`}
              contentEditable={editable}
              suppressContentEditableWarning={true}
            >
              {paragraph}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

IntroductionAndBodyWrapper.propTypes = {
  introduction: PropTypes.string.isRequired,
  body: PropTypes.arrayOf(PropTypes.string).isRequired,
  editable: PropTypes.bool,
  headerColor: PropTypes.string,
  className: PropTypes.string,
};

IntroductionAndBodyWrapper.defaultProps = {
  editable: false,
  headerColor: "black",
  className: "",
};

export default IntroductionBodyWrapper;
