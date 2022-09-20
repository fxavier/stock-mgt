import { useQuery } from "@apollo/client";
import { Box, CircularProgress } from "@mui/material";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { GET_INSTRUMENTO } from "../../graphql/queries";

const VerInstrumento = () => {
	const { id } = useParams();
	const { loading, error, data } = useQuery(GET_INSTRUMENTO, {
		variables: {
			id: id,
		},
	});

	if (loading)
		return (
			<Box sx={{ display: "flex" }}>
				<CircularProgress />
			</Box>
		);

	if (error) return <p>An error ocurred.</p>;

	return (
		<div className="container mx-auto pb-16 shadow-lg rounded-lg bg-white w-3/4 h-auto m-12">
			<div className="flex flex-col justify-start items-center space-y-4 text-3xl font-poppins">
				<p>Nome do Instrumento: {data.instrumento.nome}</p>
				<p>Stock actual: {data.instrumento.stock}</p>
				<p>Quantidade Necessaria: {data.instrumento.quantidadeNecessaria}</p>
				<a className="font-medium text-blue-600 hover:underline dark:text-blue-500">
					<Link to="/requisicoes">
						<FaArrowLeft className="ml-2 h-10 bg-green-400 w-24 rounded-lg shadow-lg text-white" />
					</Link>
				</a>
			</div>
		</div>
	);
};

export default VerInstrumento;
