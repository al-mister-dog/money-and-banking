import { useState, useEffect, useRef } from "react";
import {useSelector, useDispatch} from "react-redux"
import {selectCentralBank} from "../../../features/central_bank/centralBankSlice"

import {
  Box,
  Typography,
  Slider,
  FormGroup,
  Button,
  makeStyles,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: "5px",
    // fontWeight: "bold",
    padding: "20px 0 10px 0",
    "@media (max-width: 620px)": {
      fontSize: "0.7rem",
      margin: "15px 0 15px 0",
      padding: "0",
    },
  },
  boxCpi: {
    padding: "20px",
    border: "1px solid #d7d7d7",
    borderRadius: "5px",
    width: "60%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "auto",
    "@media (max-width: 620px)": {
      width: "90%",
    },
  },
  inflationLabels: {
    display: "flex",
    justifyContent: "space-around",
  },
  inflationLabelIndex: {
    
    "@media (max-width: 620px)": {
      fontSize: "0.8rem",
      padding: "5px"
    },

  },
  inflationLabelRate: {
    
    "@media (max-width: 620px)": {
      fontSize: "0.8rem",
      padding: "5px"
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
    marginBottom: "15px"
  },
  sliderLabelCategory: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    textAlign: "left",
    "@media (max-width: 620px)": {
      fontSize: "0.6rem"
    }
  },
  sliderLabelChange: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    "@media (max-width: 620px)": {
      fontSize: "0.6rem"
    }
    // width: "40%",
  },
  sliderLabelWeight: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    paddingLeft: "15px",
    "@media (max-width: 620px)": {
      fontSize: "0.6rem"
    }
  },

  slider: {
    display: "grid",
    gridTemplateColumns: "3.5fr 1.5fr 1.5fr 3.5fr",
    paddingBottom: "5px",
  },
  category: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    color: "#808080",
    textAlign: "left",
    // margin: "auto",
    "@media (max-width: 620px)": {
      fontSize: "0.4rem",
    },
  },
  change: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    color: "#808080",
  },
  weight: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    color: "#808080",
  },
}));

export default function CpiWeightCalculator() {
  const dispatch = useDispatch()
  const {cpiData} = useSelector(selectCentralBank)
  const [cpi, setCpi] = useState(cpiData);
  const [inflationIndex, setInflationIndex] = useState(0);
  const [inflationRate, setInflationRate] = useState(0);
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState(0);
  const max = 100;

  function total(arr) {
    return arr.reduce((acc, cur) => ({ weight: acc.weight + cur.weight }));
  }

  function handleChange(index, value) {
    //deep copy cpi
    const newCpi = cpi.map((item) => ({ ...item }));
    //set this weight to value
    newCpi[index].weight = value;
    // Calculate the difference between the intended maximum and the real total
    let unallocated = max - total(newCpi).weight;
    // Get a list of all the other slider keys
    // If the real total exceeds the intended maximum, sort sliders by lowest to highest value
    let slidersToChangeArr = newCpi.filter((el, i) => i !== index);
    //deep copy slidersToChangeArr
    let slidersToChange = slidersToChangeArr.map((item) => ({ ...item }));
    if (unallocated > 0) {
      slidersToChange.sort((a, b) => b.weight - a.weight);
    } else {
      slidersToChange.sort((a, b) => a.weight - b.weight);
    }
    //number of sliders left to iterate through
    let lengthMinusOne = cpi.length - 1;
    let sliderCount = lengthMinusOne;
    // Iterate through sliders
    slidersToChange.forEach((item, index) => {
      // In a perfect world, add or subtract the same amount from all remaining sliders
      let targetAllocation = unallocated / sliderCount;
      let result = slidersToChange[index].weight + targetAllocation;
      // If we go under the minimum value of a slider, change the target allocation so that the result will be 0
      if (result < 0) {
        targetAllocation -= result;
      }
      // Add or subtract the target allocation
      slidersToChange[index].weight += targetAllocation;
      //set new values to newCpi
      const found = newCpi.find(
        (el) => el.category === slidersToChange[index].category
      );
      const foundIndex = newCpi.indexOf(found);
      newCpi[foundIndex] = slidersToChange[index];
      // Recalculate the reamining allocation
      unallocated -= targetAllocation;
      sliderCount -= 1;
    });
    setCpi(newCpi);
  }
  const handleChangeSlider = (index) => (e, value) => {
    setIndex(index);
    setValue(value);
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

    setInflationIndex(newInflationIndex.toFixed(2));
    setInflationRate(newInflationRate.toFixed(2));
  }

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      handleChange(index, value);
    }
  }, [value]);
  useEffect(() => {
    getInflationRate();
  }, [cpi]);
  const classes = useStyles();
  return (
    <>
    <Typography variant="h6" style={{marginBottom: "25px"}}>CPI Weight Calculator</Typography>
      <Box className={classes.boxCpi}>
        <Box className={classes.inflationLabels}>
          <Typography variant="h6" className={classes.inflationLabelIndex}>
            Inflation index:{" "}
            <span style={{ fontWeight: "bold" }}>%{inflationIndex}</span>
          </Typography>
          <Typography variant="h6" className={classes.inflationLabelRate}>
            Inflation rate:{" "}
            <span style={{ fontWeight: "bold" }}>%{inflationRate}</span>
          </Typography>
        </Box>
        <Box className={classes.containerCalculator}>
          <Typography
            variant="subtitle1"
            align="center"
            className={classes.title}
          >
            Weight allocation of items to Consumer Prices Index
          </Typography>
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
                  <Typography className={classes.category} variant="body2">
                    {category}:
                  </Typography>
                  <Typography className={classes.change} variant="body2">
                    %{change}
                  </Typography>
                  <Typography className={classes.weight} variant="body2">
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
      </Box>
    </>
  );
}
