import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import ModuleOne from "../../components/banking/balance_sheets/chapter_1/Module";
import ModuleTwo from "../../components/banking/balance_sheets/chapter_2/Module";
import ModuleThree from "../../components/banking/balance_sheets/chapter_3/Module";
import ModuleFour from "../../components/banking/balance_sheets/chapter_4/Module";
import ModuleFive from "../../components/banking/balance_sheets/chapter_5/Module";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: "inline-block",
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["1", "2", "3", "4", "5"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <ModuleOne />;
    case 1:
      return <ModuleTwo />;
    case 2:
      return <ModuleThree />;
    case 3:
      return <ModuleFour />;
    case 4:
      return <ModuleFive />;
    default:
      return "Unknown step";
  }
}

export default function HorizontalNonLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const steps = getSteps();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  
  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        nonLinear
        activeStep={activeStep}
        style={{ backgroundColor: "#fdfbf7" }}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton
              onClick={handleStep(index)}
              completed={completed[index]}
            ></StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            {/* <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                Next
              </Button> */}
            {/* {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" className={classes.completed}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button variant="contained" color="primary" onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                  </Button>
                ))} */}
            {/* </div> */}
            <>{getStepContent(activeStep)}</>
            <div
              style={{
                marginTop: "40px",
                padding: "25px",
                width: "75%",
                margin: "auto",
                display: "flex",
                justifyContent: "flex-end"
              }}
            >
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              {activeStep !== 4 ?
              <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className={classes.button}
            >
              Next
            </Button>
            :
            <Link to="home" style={{textDecoration: "none", color: "white"}}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className={classes.button}
            >NEXT!!!</Button>
            </Link>
            
              }
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
