import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { data as dat } from "../../Data";
//import { useQuery } from "@apollo/client";
// import { GET_RESUMO_VISUALIZACOES } from "../../graphql/queries";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const BarChart = () => {
	//const { loading, error, data } = useQuery(GET_RESUMO_VISUALIZACOES);
	// eslint-disable-next-line
	const [resumo, setResumo] = useState([]);
	// eslint-disable-next-line
	const [array, setArray] = useState([]);

	const url = "http://localhost:8000/api/v1/si-stock/resumo_visualizacoes/";

	const getResumo = async () => {
		const { data } = await axios.get(url);
		setResumo(data);
		//	console.log(data);
		//	return data;
	};
	// Object.getOwnPropertyNames(object) for getting property name
	// let dataArray = [];

	// const getData = () => {
	// 	resumo.map((item) => {
	// 		dataArray = [...Object.getOwnPropertyNames(item)];
	// 	});
	// 	setArray(dataArray);
	// 	console.log("Resumo", array);
	// };

	useEffect(() => {
		getResumo();
	}, []);

	//console.log(getResumo());

	//console.log(data);
	//const labels = data;
	//console.log(labels);

	return (
		<ResponsiveBar
			data={dat}
			keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
			indexBy="country"
			margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
			padding={0.3}
			valueScale={{ type: "linear" }}
			indexScale={{ type: "band", round: true }}
			colors={{ scheme: "nivo" }}
			defs={[
				{
					id: "dots",
					type: "patternDots",
					background: "inherit",
					color: "#38bcb2",
					size: 4,
					padding: 1,
					stagger: true,
				},
				{
					id: "lines",
					type: "patternLines",
					background: "inherit",
					color: "#eed312",
					rotation: -45,
					lineWidth: 6,
					spacing: 10,
				},
			]}
			fill={[
				{
					match: {
						id: "fries",
					},
					id: "dots",
				},
				{
					match: {
						id: "sandwich",
					},
					id: "lines",
				},
			]}
			borderColor={{
				from: "color",
				modifiers: [["darker", 1.6]],
			}}
			axisTop={null}
			axisRight={null}
			axisBottom={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: "country",
				legendPosition: "middle",
				legendOffset: 32,
			}}
			axisLeft={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: "food",
				legendPosition: "middle",
				legendOffset: -40,
			}}
			labelSkipWidth={12}
			labelSkipHeight={12}
			labelTextColor={{
				from: "color",
				modifiers: [["darker", 1.6]],
			}}
			legends={[
				{
					dataFrom: "keys",
					anchor: "bottom-right",
					direction: "column",
					justify: false,
					translateX: 120,
					translateY: 0,
					itemsSpacing: 2,
					itemWidth: 100,
					itemHeight: 20,
					itemDirection: "left-to-right",
					itemOpacity: 0.85,
					symbolSize: 20,
					effects: [
						{
							on: "hover",
							style: {
								itemOpacity: 1,
							},
						},
					],
				},
			]}
			role="application"
			ariaLabel="Nivo bar chart demo"
			barAriaLabel={function (e) {
				return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
			}}
		/>
	);
};

export default BarChart;
