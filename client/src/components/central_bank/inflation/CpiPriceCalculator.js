import {useSelector} from "react-redux"
import {selectCentralBank} from "../../../features/central_bank/centralBankSlice"

import { useState, useEffect, useRef } from "react";

import {
  Box,
  Typography,
  FormGroup,
  TextField,
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
  boxCpi: {
    // padding: "20px",
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
  container: {
    padding: "20px",
    // width: "60%",
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
    gridTemplateColumns: "3.3fr 3.3fr 3.3fr",
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
    gridTemplateColumns: "3.3fr 3.3fr 3.3fr",
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
  const {cpiData} = useSelector(selectCentralBank)
  const classes = useStyles();
  const [cpi, setCpi] = useState(cpiData);
  const [inflationIndex, setInflationIndex] = useState(0);
  const [inflationRate, setInflationRate] = useState(0);
  const [indexPrice, setIndexPrice] = useState(0);
  const [valuePrice, setValuePrice] = useState(0);

  const handleChangeTextField = (index) => (e, value) => {
    setIndexPrice(index);
    setValuePrice(e.target.value);
  };

  function handleChangePrice(index, value) {
    value = parseFloat(value);
    const newCpi = cpi.map((item) => ({ ...item }));
    newCpi[index].change = value;
    setCpi(newCpi);
  }

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
      handleChangePrice(indexPrice, valuePrice);
    }
  }, [valuePrice]);

  useEffect(() => {
    getInflationRate();
  }, [cpi]);

  return (
    <>
      <Typography variant="h6" style={{ marginBottom: "25px" }}>
        CPI Price Calculator
      </Typography>
      <Box className={classes.boxCpi}>
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
                <Typography
                  className={classes.sliderLabelChange}
                  variant="body1"
                >
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
                    <Typography
                      className={classes.labelCategory}
                      variant="body2"
                    >
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
                  </div>
                );
              })}
            </FormGroup>
          </Box>
        </Box>
      </Box>
    </>
  );
}


