import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Skills from "./Skills";
import { ResumeContext } from "../context/ResumeContext";

const SkillsWrapper = ({
  skills,
  headerColor = "black",
  droppableId = "skills",
  className = "",
  layout,
}) => {
  const {backgroundColorss} =  useContext(ResumeContext)
  return (
    <div className={`skills-section ${className}`}>
      <h2
         style={{
          color: `${headerColor == "black" ? `${backgroundColorss}` : headerColor}`,
          borderBottom: `2px solid ${headerColor == "black" ? `${backgroundColorss}` : headerColor}`,
        }}
        className="text-xl font-bold mb-1 "
      >
        Skills
      </h2>
      <Droppable droppableId={droppableId} type="SKILLS">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {Array.isArray(skills) ? (
              skills.map((skill, index) => (
                <Draggable
                  key={`${droppableId}-${index}`}
                  draggableId={`${droppableId}-${index}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`hover:scale-105 transition-transform duration-300 mb-1 ${
                        snapshot.isDragging
                          ? "outline-dashed outline-2 outline-gray-400 bg-white"
                          : ""
                      }`}
                    >
                      <Skills
                        title={skill.title}
                        skills={skill.skills}
                        color={headerColor= "white"}
                        layout={layout}
                      />
                    </div>
                  )}
                </Draggable>
              ))
            ) : (
              <p>No skills available</p> // Fallback content if skills are undefined or not an array
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

SkillsWrapper.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      skills: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  headerColor: PropTypes.string,
  droppableId: PropTypes.string,
  className: PropTypes.string,
};

SkillsWrapper.defaultProps = {
  skills: [],
  headerColor: "black",
  droppableId: "skills",
  className: "",
};

export { SkillsWrapper };
