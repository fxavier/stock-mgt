import { Box } from "@mui/material";
import React from "react";
import BarChart from "../../components/Charts/BarChart";

const Dashboard = () => {
	return (
		<div className="container mx-auto mt-2">
			<Box height="75vh">
				<BarChart />
			</Box>
		</div>
	);
};

export default Dashboard;
