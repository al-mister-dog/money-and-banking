import { useSelector } from "react-redux";
import { countriesSelector } from "../../features/countries/countriesSlice";
import BlocMapChart from "../../components/bloc/BlocMapChart";
export default function Trade() {
  const { countries } = useSelector(countriesSelector);
  const blocs = [
    { name: "EEA", color: "#e6194B" },
    { name: "NAFTA", color: "#f032e6" },
    { name: "MERCOSUR", color: "#ffe119" },
    { name: "AEC", color: "#4363d8" },
    { name: "COMESA", color: "#f58231" },
    { name: "APEC", color: "#911eb4" },
    { name: "SARC", color: "#42d4f4" },
    { name: "IORA", color: "#3cb44b" },
    { name: "LAIA", color: "#bfef45" },
    { name: "SADC", color: "#fabed4" },
  ];
  return <BlocMapChart blocs={blocs} countries={countries} />;
}
