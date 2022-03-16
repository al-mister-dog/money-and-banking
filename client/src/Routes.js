import { useSelector, useDispatch } from "react-redux";
import {
  navSelector,
  setDepartment,
  setDepartmentOperation,
} from "./features/nav/navSlice";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import keysData from "./components/performance/keysData";

import Home from "./pages/Home";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Activate from "./pages/auth/Activate";
import Dashboard from "./pages/user/Dashboard";
import CreateGame from "./pages/user/CreateGame";
import Private from "./pages/Private";
import Admin from "./pages/Admin";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

import Banking from "./pages/banking/Home";
import OverviewBanking from "./pages/banking/Overview";
import BalanceSheets from "./pages/banking/BalanceSheets";
import SurvivalConstraint from "./pages/banking/SurvivalConstraint";
import ClearingHouse from "./pages/banking/ClearingHouse"


import Bloc from "./pages/bloc/Home";
import OverviewBloc from "./pages/bloc/Overview";
import BlocTrade from "./pages/bloc/Trade";
import BlocAlliance from "./pages/bloc/Alliance";

import CentralBank from "./pages/central_bank/Home";
import OverviewCentralBank from "./pages/central_bank/Overview";
import MonetaryPolicy from "./pages/central_bank/monetary_policy/Home";
import DeskMonetaryPolicy from "./pages/central_bank/monetary_policy/Desk";
import Inflation from "./pages/central_bank/monetary_policy/Inflation";
import InterestRate from "./pages/central_bank/monetary_policy/InterestRate";

import Performance from "./pages/performance/Home";
import OverviewPerformance from "./pages/performance/Overview";
import BalanceOfPayments from "./pages/performance/BalanceOfPayments";
import GovernmentFinance from "./pages/performance/GovernmentFinance";
import Monetary from "./pages/performance/Monetary";
import NationalAccounts from "./pages/performance/NationalAccounts";
import People from "./pages/performance/People";
import Trade from "./pages/performance/Trade";

import Treasury from "./pages/treasury/Home";
import OverviewTreasury from "./pages/treasury/Overview";
import Budget from "./pages/treasury/budget/Home";

import { isAuth } from "./utils/cookies";


const AppRoutes = () => {
  const dispatch = useDispatch();
  const { departments } = useSelector(navSelector);

  function usePageViews() {
    let location = useLocation();
    useEffect(() => {
      let segments = location.pathname
        .split("/")
        .filter((segment) => segment !== "");
      if(segments[1] === 'activate' || segments[1] === 'create') {
        return
      }
      if (segments.length === 0) {
        dispatch(setDepartment(""));
      }
      if (segments.length === 1) {
        let department = departments.find((d) => d.path === segments[0]);
        dispatch(setDepartment(department));
        dispatch(setDepartmentOperation(""));
      }

      if (segments.length > 1) {
        let department = departments.find((d) => d.path === segments[0]);
        console.log(department);
        let departmentOperation = department.menuItems.find(
          (dOp) => dOp.path === segments[1]
        );
        setDepartment(department);
        setDepartmentOperation(departmentOperation);
      }
    }, [location]);
  }

  // const loggedin = false;
  usePageViews();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/signup"
        element={
          <RequireLogin>
            <Signup />
          </RequireLogin>
        }
      />
      <Route
        path="/login"
        element={
          <RequireLogin>
            <Login />
          </RequireLogin>
        }
      />
      <Route path="/auth/activate/:token" element={<Activate />} />
      <Route
        path="/dashboard"
        element={
          <RequirePlayerAuth>
            <Dashboard />
          </RequirePlayerAuth>
        }
      />
      <Route
        path="game/create"
        element={
          <RequireSubscriberAuth>
            <CreateGame />
          </RequireSubscriberAuth>
        }
      />
      <Route
        path="/private"
        element={
          <RequireAuth>
            <Private />
          </RequireAuth>
        }
      />
      <Route
        path="/admin"
        element={
          <RequireAdminAuth>
            <Admin />
          </RequireAdminAuth>
        }
      />
      <Route
        path="/auth/password/forgot"
        element={
          <RequireLogin>
            <ForgotPassword />
          </RequireLogin>
        }
      />
      <Route path="/auth/password/reset/:token" element={<ResetPassword />} />
      <Route path="banking" element={<Banking />}>
        <Route index element={<OverviewBanking />} />
        <Route path="overview" element={<OverviewBanking />} />
        <Route path="balance-sheets" element={<BalanceSheets />} />
        <Route path="survival-constraint" element={<SurvivalConstraint />} />
        <Route path="clearing-house" element={<ClearingHouse />} />
      </Route>
      <Route path="bloc" element={<Bloc />}>
        <Route index element={<OverviewBloc />} />
        <Route path="overview" element={<OverviewBloc />} />
        <Route path="trade" element={<BlocTrade />} />
        <Route path="alliance" element={<BlocAlliance />} />
      </Route>
      <Route path="centralbank" element={<CentralBank />}>
        <Route index element={<OverviewCentralBank />} />
        <Route path="overview" element={<OverviewCentralBank />} />
        <Route path="monetarypolicy" element={<MonetaryPolicy />}>
          <Route index element={<DeskMonetaryPolicy />} />
          <Route path="desk" element={<DeskMonetaryPolicy />} />
          <Route path="inflation" element={<Inflation />} />
          <Route path="interest" element={<InterestRate />} />
        </Route>
      </Route>
      <Route path="performance" element={<Performance />}>
        <Route index element={<OverviewPerformance />} />
        <Route path="overview" element={<OverviewPerformance />} />
        <Route
          path="balanceofpayments"
          element={<BalanceOfPayments keysData={keysData} />}
        />
        <Route
          path="governmentfinance"
          element={<GovernmentFinance keysData={keysData} />}
        />
        <Route path="monetary" element={<Monetary keysData={keysData} />} />
        <Route
          path="nationalaccounts"
          element={<NationalAccounts keysData={keysData} />}
        />
        <Route path="people" element={<People keysData={keysData} />} />
        <Route path="trade" element={<Trade keysData={keysData} />} />
      </Route>
      <Route path="treasury" element={<Treasury />}>
        <Route index element={<OverviewTreasury />} />
        <Route path="overview" element={<OverviewTreasury />} />
        <Route path="budget" element={<Budget />} />
      </Route>
    </Routes>
  );
};

function RequireAuth({ children }) {
  let location = useLocation();
  if (!isAuth()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function RequireLogin({ children }) {
  let location = useLocation();

  if (isAuth()) {
    return <Navigate to={-1} state={{ from: location }} replace />;
  }
  return children;
}

function RequireSubscriberAuth({ children }) {
  let location = useLocation();
  if (!isAuth()) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  if (isAuth().role === "player") {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }
  return children;
}

function RequirePlayerAuth({ children }) {
  let location = useLocation();
  if (!isAuth()) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  if (isAuth().role !== "player") {
    return <Navigate to="/game/create" state={{ from: location }} replace />;
  }
  return children;
}

function RequireAdminAuth({ children }) {
  let location = useLocation();
  if (isAuth() && isAuth().role === "admin") {
    return children;
  } else {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
}

export default AppRoutes;
