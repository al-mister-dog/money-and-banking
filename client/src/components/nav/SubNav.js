import Department from "./Department";
import DepartmentOps from "./DeparmentOps";
import { useSelector } from "react-redux";
import { navSelector } from "../../features/nav/navSlice";
import { Toolbar } from "@material-ui/core";

const darkPrimary = "#191919";

export default function SubNav() {
  const { department, departmentOperation } = useSelector(navSelector);
  return (
    <>
      <Toolbar style={{ backgroundColor: darkPrimary, height: "0.7rem", display: "flex", justifyContent: "center" }}>
        {department && <Department />}
        {departmentOperation && <DepartmentOps />}
      </Toolbar>
    </>
  );
}
