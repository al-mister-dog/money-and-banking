import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import initialState from "./initialState";

export const setGame = createAsyncThunk(
  "game/setGame",
  async ({ country, tradeBloc, alliance, governmentControl, token }) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/game/set-game",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            country,
            tradeBloc,
            alliance,
            governmentControl,
          }),
        }
      );
      if (response.status === 200) {
        return {
          country: country.iso,
          tradeBloc,
          alliance,
          governmentControl,
          data: country,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const getGame = createAsyncThunk(
  "game/getGame",
  async (token, thunkAPI) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/game/get-game",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let data = await response.json();
      

        if (response.status === 200) {
          return { ...data };
        } else {
          return thunkAPI.rejectWithValue(data);
        }
    } catch (error) {
      console.log(error);
    }
  }
);

const saveGame = createAsyncThunk(
  "game/saveGame"
  //update game data. probably the data row
  //GAME SHOULD BE SAVED WHENEVER GAME DATA CHANGES// MAYBE ON APP OR ROUTER PAGE
);

const deleteGame = createAsyncThunk();
//delete game instance

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setCountry: (state, action) => {
      state.country = action.payload;
    },
    setTradeBloc: (state, action) => {
      state.tradeBloc = action.payload;
    },
    setAlliance: (state, action) => {
      state.alliance = action.payload;
    },
    setGovernmentControl: (state, action) => {
      state.governmentControl = action.payload;
    },
  },
  extraReducers: {
    [setGame.fulfilled]: (state, { payload }) => {
      state.gameData = payload;
      state.gameIsActivated = true;
      state.isFetching = false;
    },
    [setGame.pending]: (state) => {
      state.gameIsActivated = false;
      state.isFetching = true;
    },
    [setGame.rejected]: (state) => {
      state.gameIsActivated = false;
      state.isFetching = false;
      state.isError = true;
    },
    [getGame.fulfilled]: (state, { payload }) => {
      state.gameData = payload;
      state.gameIsActivated = true;
      state.isFetching = false;
    },
    [getGame.pending]: (state) => {
      state.gameIsActivated = false;
      state.isFetching = true;
    },
    [getGame.rejected]: (state) => {
      state.gameIsActivated = false;
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const {
  setCountry,
  setTradeBloc,
  setAlliance,
  setGovernmentControl,
  setGameSettings,
} = gameSlice.actions;

export const gameSelector = (state) => state.game;

export default gameSlice.reducer;
