import { useSelector, useDispatch } from "react-redux";
import { gameSelector, getGame } from "../../features/game/gameSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuth, getCookie } from "../../utils/cookies";

import Reserves from "../../components/dashboard/charts/Reserves";
import Inflation from "../../components/dashboard/charts/Inflation";
import TradeBalance from "../../components/dashboard/charts/TradeBalance";
import Policy from "../../components/dashboard/charts/Policy";
import { Box, Typography, Button } from "@material-ui/core";

export default function GameDashboard() {
  const dispatch = useDispatch();
  const { gameData } = useSelector(gameSelector);
  
  const navigate = useNavigate();
  const token = getCookie("token");
  useEffect(() => {
    if (isAuth().role === "subscriber") {
      navigate("/game/create");
    }
    if (isAuth().role === "player") {
      dispatch(getGame(token));
    }
  }, [isAuth().role]);
  return (
    <>
      <Box sx={{ display: "flex", height: "60vh" }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            alignItems: "center",
            width: "55%",
            // border: "1px solid #d7d7d7",
            backgroundColor: "#f9f9f9",
            borderRadius: "5px",
          }}
        >
          <Reserves />
          <Inflation />
          <TradeBalance />
          <Policy />
        </Box>
        <Box sx={{ width: "10%" }}></Box>
        <Box
          sx={{
            width: "35%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // border: "1px solid #d7d7d7",
            backgroundColor: "#f9f9f9",
            borderRadius: "5px",
          }}
        >
          {/* <Box>
            <Typography
              align="middle"
              variant="h6"
              style={{ fontWeight: "bold" }}
            >
              {gameData.country.name}
            </Typography>
            <Typography align="middle" variant="body1">
              Trade Blocs: {gameData.tradeBloc}
            </Typography>
            <Typography align="middle" variant="body1">
              Alliances: {gameData.alliance}
            </Typography>
            <Typography align="middle" variant="body1">
              System: Unknown
            </Typography>
          </Box>
          <Box style={{ marginTop: "25px" }}>
            <Typography variant="body1" style={{ fontWeight: "bold" }}>
              Performance
            </Typography>

            <Typography variant="body1">GDP</Typography>
            <Typography variant="subtitle">
              {gameData.country.gdpConstPrice}tn: 6th
            </Typography>
            <Typography variant="body1">PPP</Typography>
            <Typography variant="subtitle">
              {gameData.country.gdpConstPrice}tn: 13th
            </Typography>
            <Typography variant="body1">GINI</Typography>
            <Typography variant="subtitle">Unknown</Typography>
            <Typography variant="body1">Balance of Trade</Typography>
            <Typography variant="subtitle">
              {gameData.country.currentAccBal}: 25th
            </Typography>
          </Box> */}
        </Box> 
        
      </Box>
      {/* <Box></Box> */}
    </>
  );
}
