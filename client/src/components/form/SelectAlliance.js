import { useSelector, useDispatch } from "react-redux";
import { setAlliance } from "../../features/game/gameSlice";
import { gameSelector } from "../../features/game/gameSlice";
import { useState } from "react";
import { Typography, FormControl, Select, MenuItem } from "@material-ui/core";

export default function SelectAlliance() {
  const blocs = [
    "EU",
    "WTO",
    "OPEC",
    "OECD",
    "UN",
    "NATO",
  ];
  const dispatch = useDispatch();
  const {alliance} = useSelector(gameSelector)
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    //decide whether to import whole country or just the iso + name
    dispatch(setAlliance(e.target.value));
    setValue(e.target.value);
  };
  return (
    <>
      <Typography>Join Alliance?</Typography>
      <FormControl style={{ width: "250px" }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value || alliance}
          onChange={handleChange}
        >
          {blocs.map((bloc) => {
            return <MenuItem key={bloc} value={bloc}>{bloc}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </>
  );
}
