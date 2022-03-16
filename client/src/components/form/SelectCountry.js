import { useSelector, useDispatch } from "react-redux";
import { setCountry } from "../../features/game/gameSlice";
import { countriesSelector } from "../../features/countries/countriesSlice";
import { gameSelector } from "../../features/game/gameSlice";
import { useState } from "react";
import { Typography, FormControl, Select, MenuItem } from "@material-ui/core";

export default function SelectCountry() {
  const dispatch = useDispatch();
  const { countries } = useSelector(countriesSelector);
  const { country } = useSelector(gameSelector); 
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    //decide whether to import whole country or just the iso + name
    dispatch(setCountry(e.target.value));
    setValue(e.target.value);
  };
  return (
    <>
      <Typography>Select country...</Typography>
      <FormControl style={{ width: "250px" }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value || country}
          onChange={handleChange}
        >
          {countries.map((country) => {
            const { iso, NAME } = country;
            return <MenuItem key={iso} value={country}>{NAME}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </>
  );
}
