import { useState, memo } from "react";
import ReactTooltip from "react-tooltip";
import { roundToMillion, roundToBillion } from "../calculators/RoundNums";
import {
  Box,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography,
  makeStyles,
} from "@material-ui/core";
import {
  Sphere,
  Graticule,
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

import { scaleLinear } from "d3-scale";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = ({ countries, keys }) => {
  
  const [radioGroupValue, setRadioGroupValue] = useState(keys[0].name);
  const [objectKey, setObjectKey] = useState(keys[0].name);
  const [content, setContent] = useState("");
  const min = Math.min(...countries.map((country) => country[objectKey]));
  const max = Math.max(...countries.map((country) => country[objectKey]));
  const range = ["#ffe9e3", "#ff410d"];
  const colorScale = scaleLinear().domain([min, max]).range(range);

  function getExpression(mappedCountry) {
    const expressions = {
      int: `${mappedCountry[objectKey]}`,
      percent: `${parseFloat(mappedCountry[objectKey]).toFixed(2)}%`,
      percentChange: `${parseFloat(mappedCountry[objectKey]).toFixed(
        2
      )}% change`,
      million: `${roundToMillion(
        parseFloat(mappedCountry[objectKey]).toFixed(2)
      )}`,
      billion: `${roundToBillion(
        parseFloat(mappedCountry[objectKey]).toFixed(2)
      )}`,
    };
    const target = keys.find((el) => el.name === objectKey);
    return expressions[target.unit];
  }

  function handleChangeForm(event) {
    setRadioGroupValue(event.target.value);
    setMetric(event.target.value);
  }

  function setMetric(name) {
    setObjectKey(name);
  }

  function setFill(mappedCountry) {
    return colorScale(mappedCountry[objectKey]);
  }

  function setToolTip(mappedCountry) {
    const expression = getExpression(mappedCountry);
    setContent(`${mappedCountry.NAME}: ${expression}`);
  }

  return (
    <>
      <Box sx={{ border: "1px solid #d7d7d7", borderRadius: "5px", padding: "10px" }}>
        <div style={{ width: "100%" }}>
          <ComposableMap
            data-tip=""
            width={900}
            height={400}
            projectionConfig={{ rotate: [-10, 0, 0], scale: 147 }}
          >
            <ZoomableGroup>
              <Sphere stroke="#000" strokeWidth={0.3} />
              <Graticule stroke="#000" strokeWidth={0.3} />
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const mappedCountry = countries.find(
                      (country) => country.iso === geo.properties.ISO_A3
                    );

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={mappedCountry ? setFill(mappedCountry) : "#333"}
                        onMouseEnter={() => {
                          mappedCountry
                            ? setToolTip(mappedCountry)
                            : setContent("no data");
                        }}
                        onMouseLeave={() => {
                          setContent("");
                        }}
                        style={{
                          hover: {
                            fill: "#2D4263",
                            outline: "none",
                          },
                          pressed: {
                            fill: "#E42",
                            outline: "none",
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
          <ReactTooltip>{content}</ReactTooltip>
        </div>
        <FormControl component="fieldset">
          <RadioGroup
          // sx={{display: "flex", }}
          row
            aria-label="radiogroupmap"
            name="radiogroupmap1"
            value={radioGroupValue}
            onChange={handleChangeForm}
          >
            {keys.map((key) => {
              const { name, label } = key;
              return (
                <FormControlLabel
                  labelPlacement="right"
                  value={name}
                  control={<Radio color="primary" />}
                  label={<Typography style={{fontSize: "0.8rem"}}>{label}</Typography>}
                  // label={label}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </Box>
    </>
  );
};

export default memo(MapChart);
