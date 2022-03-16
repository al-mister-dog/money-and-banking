import { useSelector, useDispatch } from "react-redux";
import { gameSelector } from "../../features/game/gameSlice";
import { setTradeBloc } from "../../features/game/gameSlice";
import { useState } from "react";
import { Typography, FormControl, Select, MenuItem } from "@material-ui/core";

export default function SelectTradeBloc() {
  const blocs = [
    "EEA",
    "NAFTA",
    "MERCOSUR",
    "AEC",
    "COMESA",
    "APEC",
    "SARC",
    "IORA",
    "LAIA",
    "SADC",
  ];
  const dispatch = useDispatch();
  const {tradeBloc} = useSelector(gameSelector)
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    dispatch(setTradeBloc(e.target.value));
    setValue(e.target.value);
  };
  return (
    <>
      <Typography>Join Trade Bloc?</Typography>
      <FormControl style={{ width: "250px" }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value || tradeBloc}
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
