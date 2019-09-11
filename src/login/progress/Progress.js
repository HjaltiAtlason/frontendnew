import React from 'react';
import PropTypes from 'prop-types';

const Progress = ({ currentStep, steps }) => {
  const renderStep = (complete, stepNumber, stepDescription) => {
    return (
      <div
        key={stepNumber}
        className={`col-xs-3 bs-wizard-step ${complete
          ? 'complete'
          : 'disabled'}`}
      >
        <div className="text-center bs-wizard-stepnum">Skref {stepNumber}</div>
        <div className="progress">
          <div className="progress-bar" />
        </div>
        <span className="bs-wizard-dot" />
        <div className="bs-wizard-info text-center">{stepDescription}</div>
      </div>
    );
  };

  return (
    <div className="bs-wizard" style={{ borderBottom: '0' }}>
      {steps.map((step, index) => {
        const num = index + 1;
        const stepDescription = step.description || step;
        return renderStep(Boolean(index < currentStep), num, stepDescription);
      })}
    </div>
  );
};

Progress.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.object),
  currentStep: PropTypes.number
};

export default Progress;
