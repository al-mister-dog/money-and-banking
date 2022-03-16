import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import activationReducer from '../features/activation/activationSlice';
import gameReducer from '../features/game/gameSlice'
import countriesReducer from '../features/countries/countriesSlice'
import navReducer from '../features/nav/navSlice'
import centralBankReducer from "../features/central_bank/centralBankSlice"
export const store = configureStore({
  reducer: {
    user: userReducer,
    activation: activationReducer,
    game: gameReducer,
    countries: countriesReducer,
    nav: navReducer,
    centralBank: centralBankReducer
  },
});
