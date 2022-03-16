import {useSelector, useDispatch} from "react-redux"
import {selectCentralBank, submitCpi} from "../../../features/central_bank/centralBankSlice"

import { useState, useEffect, useRef } from "react";

import {
  Box,
  Typography,
  Slider,
  FormGroup,
  TextField,
  Button,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  titleCalculator: {
    marginBottom: "5px",
    padding: "20px 0 10px 0",
    "@media (max-width: 620px)": {
      fontSize: "0.7rem",
      margin: "15px 0 15px 0",
      padding: "0",
    },
  },
  container: {
    padding: "20px",
    width: "60%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "auto",
    "@media (max-width: 620px)": {
      width: "90%",
    },
  },
  labelsInflation: {
    display: "flex",
    justifyContent: "space-around",
  },
  labelInflationIndex: {
    "@media (max-width: 620px)": {
      fontSize: "0.8rem",
      padding: "5px",
    },
  },
  labelInflationRate: {
    "@media (max-width: 620px)": {
      fontSize: "0.8rem",
      padding: "5px",
    },
  },
  containerCalculator: {},

  sliderLabels: {
    display: "grid",
    gridTemplateColumns: "3.5fr 1.5fr 5fr",
    backgroundColor: theme.palette.common.darkSecondary,
    color: "white",
    padding: "5px",
    borderRadius: "5px",
    marginBottom: "15px",
  },
  sliderLabelCategory: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    textAlign: "left",
    "@media (max-width: 620px)": {
      fontSize: "0.6rem",
    },
  },
  sliderLabelChange: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    "@media (max-width: 620px)": {
      fontSize: "0.6rem",
    },
  },
  sliderLabelWeight: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    paddingLeft: "15px",
    "@media (max-width: 620px)": {
      fontSize: "0.6rem",
    },
  },

  slider: {
    display: "grid",
    gridTemplateColumns: "3.5fr 1.5fr 1.5fr 3.5fr",
  },
  labelCategory: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    color: "#808080",
    textAlign: "left",
    "@media (max-width: 620px)": {
      fontSize: "0.4rem",
    },
  },
  labelChange: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    color: "#808080",
  },
  labelWeight: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    color: "#808080",
  },
}));

export default function CpiWeightCalculator() {
  const dispatch = useDispatch()
  const {cpiData} = useSelector(selectCentralBank)
  const classes = useStyles();
  const [cpi, setCpi] = useState(cpiData);
  const [inflationIndex, setInflationIndex] = useState(0);
  const [inflationRate, setInflationRate] = useState(0);
  const [indexWeight, setIndexWeight] = useState(0);
  const [valueWeight, setValueWeight] = useState(0);
  const [indexPrice, setIndexPrice] = useState(0);
  const [valuePrice, setValuePrice] = useState(0);

  const max = 100;

  function total(arr) {
    return arr.reduce((acc, cur) => ({ weight: acc.weight + cur.weight }));
  }

  const handleChangeTextField = (index) => (e, value) => {
    setIndexPrice(index)
    setValuePrice(e.target.value)
  }

  function handleChangePrice(index, value) {
    value = parseFloat(value)
    const newCpi = cpi.map((item) => ({ ...item }));
    newCpi[index].change = value;
    setCpi(newCpi)
  }

  function handleChangeWeight(index, value) {
    const newCpi = cpi.map((item) => ({ ...item }));
    newCpi[index].weight = value;
    let unallocated = max - total(newCpi).weight;
    let slidersToChangeArr = newCpi.filter((el, i) => i !== index);
    let slidersToChange = slidersToChangeArr.map((item) => ({ ...item }));
    if (unallocated > 0) {
      slidersToChange.sort((a, b) => b.weight - a.weight);
    } else {
      slidersToChange.sort((a, b) => a.weight - b.weight);
    }
    let lengthMinusOne = cpi.length - 1;
    let sliderCount = lengthMinusOne;
    slidersToChange.forEach((item, index) => {
      let targetAllocation = unallocated / sliderCount;
      let result = slidersToChange[index].weight + targetAllocation;
      if (result < 0) {
        targetAllocation -= result;
      }
      slidersToChange[index].weight += targetAllocation;
      const found = newCpi.find(
        (el) => el.category === slidersToChange[index].category
      );
      const foundIndex = newCpi.indexOf(found);
      newCpi[foundIndex] = slidersToChange[index];
      unallocated -= targetAllocation;
      sliderCount -= 1;
    });
    setCpi(newCpi);
  }

  const handleChangeSlider = (index) => (e, value) => {
    setIndexWeight(index);
    setValueWeight(value);
  };

  function getInflationRate() {
    let weightedIndex = [];
    const priceIndex = cpi.map((i) => {
      return 100 + i.change;
    });

    cpi.forEach((item, index) => {
      weightedIndex = [
        ...weightedIndex,
        (item.weight / 10) * priceIndex[index],
      ];
    });
    const weightedIndexSum = weightedIndex.reduce((a, b) => a + b) / 10;

    const newInflationIndex = weightedIndexSum;
    const newInflationRate = newInflationIndex - 100;
    
    setInflationIndex(parseFloat(newInflationIndex.toFixed(2)));
    setInflationRate(parseFloat(newInflationRate.toFixed(2)));
  }

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      handleChangeWeight(indexWeight, valueWeight);
    }
  }, [valueWeight]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      handleChangePrice(indexPrice, valuePrice);
    }
  }, [valuePrice]);

  useEffect(() => {
    getInflationRate();
  }, [cpi]);

  return (
    <>
      <Box className={classes.container}>
        <Box className={classes.labelsInflation}>
          <Typography variant="h6" className={classes.labelInflationIndex}>
            Inflation index:{" "}
            <span style={{ fontWeight: "bold" }}>%{inflationIndex}</span>
          </Typography>
          <Typography variant="h6" className={classes.labelInflationRate}>
            Inflation rate:{" "}
            <span style={{ fontWeight: "bold" }}>%{inflationRate}</span>
          </Typography>
        </Box>
        <Box className={classes.containerCalculator}>
          <Typography
            variant="subtitle1"
            align="center"
            className={classes.titleCalculator}
          ></Typography>
          <FormGroup className={classes.containerSliders}>
            <Box className={classes.sliderLabels}>
              <Typography
                className={classes.sliderLabelCategory}
                variant="body1"
              >
                Category
              </Typography>
              <Typography className={classes.sliderLabelChange} variant="body1">
                Price Change
              </Typography>
              <Typography
                className={classes.sliderLabelWeight}
                variant="body1"
                align="left"
              >
                Weight (% of 100)
              </Typography>
            </Box>
            {cpi.map((object, index) => {
              const { category, weight, change } = object;
              return (
                <div key={index} className={classes.slider}>
                  <Typography className={classes.labelCategory} variant="body2">
                    {category}:
                  </Typography>
                  <TextField
                    className={classes.labelChange}
                    type="number"
                    defaultValue={change}
                    onChange={handleChangeTextField(index)}
                  >
                    %{parseFloat(change.toFixed(2))}
                  </TextField>
                  <Typography className={classes.labelWeight} variant="body2">
                    %{parseFloat(weight.toFixed(2))}
                  </Typography>
                  <Slider
                    className={classes.sliderTrack}
                    value={parseFloat(weight.toFixed(2))}
                    onChange={handleChangeSlider(index)}
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
        </Box>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => dispatch(submitCpi(cpi))}
          style={{marginTop: "10px"}}
        >
          Submit New Weights
        </Button>
      </Box>
    </>
  );
}

