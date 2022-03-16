import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { year: 1999, rate: 6 },
  { year: 2000, rate: 5.75 },
  { year: 2001, rate: 5.50 },
  { year: 2002, rate: 4 },
  { year: 2003, rate: 3.75 },
  { year: 2004, rate: 4 },
  { year: 2005, rate: 4.5 },
  { year: 2006, rate: 5 },
  { year: 2007, rate: 5.5 },
  { year: 2008, rate: 2 },
  { year: 2009, rate: 0.5 },
  { year: 2010, rate: 0.5 },
  { year: 2011, rate: 0.5 },
  { year: 2012, rate: 0.5 },
  { year: 2013, rate: 0.5 },
  { year: 2014, rate: 0.5 },
  { year: 2015, rate: 0.5 },
  { year: 2016, rate: 0.25 },
  { year: 2017, rate: 0.25 },
  { year: 2018, rate: 0.5 },
  { year: 2019, rate: 0.5 },
  { year: 2020, rate: 0.1 },
];

export default function Chart() {

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 5,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis width={20}/>
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="rate"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
