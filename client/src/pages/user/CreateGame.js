import { useSelector, useDispatch } from "react-redux";
import { gameSelector, setGame } from "../../features/game/gameSlice";
import { userSelector } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { isAuth, getCookie } from "../../utils/cookies";

import React, { useEffect } from "react";
import SelectCountry from "../../components/form/SelectCountry";
import SelectTradeBloc from "../../components/form/SelectTradeBloc";
import SelectAlliance from "../../components/form/SelectAlliance";
import SelectGovControl from "../../components/form/SelectGovControl";
import {
  Paper,
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { updateUserRole } from "../../features/user/userSlice";
import { Navigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "#fdfbf7",
    width: "70vw",
    margin: "auto",
    marginTop: "6rem",
    padding: "25px",
    "@media (max-width: 620px)": {
      width: "95vw",
      padding: "5px",
      marginTop: "4rem",
    },
  },
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function GameForm() {
  const classes = useStyles();

  return (
    
      <Box>
        <Typography variant="h6" style={{ marginBottom: "25px" }}>
          Hi, {isAuth().name}. Its to time to take charge of your nation's
          economy...
        </Typography>
        <HorizontalLinearStepper />
      </Box>
    
  );
}

function getSteps() {
  return [
    "Select country",
    "Join trade bloc",
    "Join alliance",
    "Choose governmental control",
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <SelectCountry />;
    case 1:
      return <SelectTradeBloc />;
    case 2:
      return <SelectAlliance />;
    case 3:
      return <SelectGovControl />;
    default:
      return "Unknown step";
  }
}

function HorizontalLinearStepper() {
  const dispatch = useDispatch();
  const token = getCookie("token");
  const { country } = useSelector(gameSelector);
  const { tradeBloc } = useSelector(gameSelector);
  const { alliance } = useSelector(gameSelector);
  const { governmentControl } = useSelector(gameSelector);
  const { user } = useSelector(userSelector);
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleStart = () => {
    dispatch(
      setGame({ country, tradeBloc, alliance, governmentControl, token })
    );
    dispatch(updateUserRole({ token, role: "player" }));
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth().role === "player") {
      navigate("/dashboard");
    }
  }, [isAuth().role]);
  return (
    <div className={classes.root}>
      <Stepper
        activeStep={activeStep}
        style={{ backgroundColor: "#fdfbf7", marginBottom: "25px" }}
      >
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div style={{ marginBottom: "25px" }}>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <div style={{ marginTop: "25px" }}>
              <Button
                onClick={handleReset}
                className={classes.button}
                style={{ margin: "5px" }}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleStart}
                className={classes.button}
                style={{ margin: "5px" }}
              >
                Start Game
              </Button>
            </div>
          </div>
        ) : (
          <div style={{ marginBottom: "25px" }}>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div style={{ marginTop: "25px" }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                disabled={!country}
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
      {activeStep === 0 && (
        <Typography align="justify" style={{ marginTop: "25px" }}>
          Each country comes with its own benifits and drawbacks. However in the
          real world, not all benifits and drawbacks are created equally. For
          example your country's debt may be denominated in a foreign currency,
          tying your hands as to how much your government can spend...
        </Typography>
      )}
      {activeStep === 1 && (
        <Typography align="justify" style={{ marginTop: "25px" }}>
          Joining a trade bloc may help with easing the cost of exports. You may
          be restricted by your geographical location...
        </Typography>
      )}
      {activeStep === 2 && (
        <Typography align="justify" style={{ marginTop: "25px" }}>
          Joining an alliance may give your country a few economic perks, but if
          the relationship is unbalanced you may find that implementing reforms
          can come with disapproval or even worse, economic sanctions
        </Typography>
      )}
      {activeStep === 3 && (
        <Typography align="justify" style={{ marginTop: "25px" }}>
          The interesting part. Put your political ideology to the test. Will
          deregulation really encourage growth? Will complete control of the
          monetary base free your country or plunge it into debt? Will a free
          market of banks flourish or will a monopoly inevitably emerge?
        </Typography>
      )}
    </div>
  );
}
