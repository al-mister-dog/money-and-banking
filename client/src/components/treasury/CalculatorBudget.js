import { useState, useEffect } from "react";
import { Typography, Slider, FormGroup, makeStyles } from "@material-ui/core";
const useStyles = makeStyles(() => ({
  title: {
    marginBottom: "5px"
  },
  label: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    color: "#808080",
    textAlign: "left",
    width: "50%",
  },
  sliders: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  slider: {
    display: "flex",
    // width: "50%"
  },

}));
export default function Calculator({ data, settingBudget, title, budgetType, calculateTotalAmount }) {
  const [amount, setAmount] = useState(data);

  const handleChangeSlider = (index) => (e, value) => {
    const newArr = [...amount];
    newArr[index].amount = value;
    setAmount(newArr);
  };

  useEffect(() => {
    calculateTotalAmount(amount, budgetType);
  }, [amount]);

  const classes = useStyles();
  return (
    <>
    <Typography align="left" variant="h6" className={classes.title}>{title}</Typography>
      <FormGroup className={classes.sliders}>
        {amount.map((object, index) => {
          const { name, amount } = object;
          return (
            <div key={index} className={classes.slider}>
              <Typography className={classes.label} variant="body2">
                {name}:
              </Typography>
              <Slider
                aria-label="Temperature"
                disabled={!settingBudget}
                defaultValue={amount}
                onChange={handleChangeSlider(index)}
                // getAriaValueText={amount}
                aria-labelledby="discrete-slider-custom"
                valueLabelDisplay="auto"
                marks
                min={0}
                max={100}
              />
            </div>
          );
        })}
      </FormGroup>
    </>
  );
}
