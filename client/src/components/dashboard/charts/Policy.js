import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend,
} from "recharts";
import { Box, Typography } from "@material-ui/core";

const data = [
  {
    "subject": "Oligarchy",
    "A": 120,
    "B": 110,
    "fullMark": 150
  },
  {
    "subject": "Socialist",
    "A": 20,
    "B": 130,
    "fullMark": 150
  },
  {
    "subject": "Monetarist",
    "A": 100,
    "B": 130,
    "fullMark": 150
  },
  {
    "subject": "Free market",
    "A": 75,
    "B": 100,
    "fullMark": 150
  },
  {
    "subject": "Vertical",
    "A": 15,
    "B": 90,
    "fullMark": 150
  },
  {
    "subject": "Imperialist",
    "A": 50,
    "B": 85,
    "fullMark": 150
  }
]

export default function Political() {
  return (
    <>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "35%",
        height: "35%",
        margin: "10px",
      }}
    >
      <Typography style={{ fontWeight: "bold" }}>Policy</Typography>
      <ResponsiveContainer width="100%" height="100%">
      <RadarChart outerRadius={60}  data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" style={{fontSize: "0.35rem"}}/>
        <PolarRadiusAxis angle={30} domain={[0, 150]} />
        <Radar
          name="Average"
          dataKey="A"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Radar
          name="You"
          dataKey="B"
          stroke="#82ca9d"
          fill="#82ca9d"
          fillOpacity={0.6}
        />
        <Tooltip/>
      </RadarChart>
      
      </ResponsiveContainer>
      
    </Box>
    </>
  );
}
