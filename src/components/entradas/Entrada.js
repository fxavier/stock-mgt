import { useQuery } from "@apollo/client";
import { Box, CircularProgress } from "@mui/material";
import { Table } from "flowbite-react";
import React, { useState } from "react";
import { GET_ENTRADAS } from "../../graphql/queries";
import Pagination from "../Pagination";
import EntradaRow from "./EntradaRow";
import SearchEntrada from "./SearchEntrada";

const Entrada = () => {
	const [page, setPage] = useState(1);
	// eslint-disable-next-line
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const { loading, error, data } = useQuery(GET_ENTRADAS, {
		variables: {
			page: page,
			search: search,
		},
	});

	if (loading)
		return (
			<Box sx={{ display: "flex" }}>
				<CircularProgress />
			</Box>
		);

	if (error) return <p>An error ocurred.</p>;

	const entradas =
		searchResults.length > 0 ? searchResults : data.entradas.results;

	const onPaginateFront = () => {
		setPage(page + 1);
	};

	const onPaginateBack = () => {
		setPage(page - 1);
	};

	return (
		<>
			<SearchEntrada setSearchResults={setSearchResults} />
			<div className="container mx-auto py-16">
				<Table hoverable={true}>
					<Table.Head>
						<Table.HeadCell>Provincia</Table.HeadCell>
						<Table.HeadCell>Sector</Table.HeadCell>
						<Table.HeadCell>Instrumento</Table.HeadCell>
						<Table.HeadCell>Data de Entrada</Table.HeadCell>
						<Table.HeadCell>Qtd</Table.HeadCell>
						<Table.HeadCell>Fornecedor</Table.HeadCell>
						<Table.HeadCell>
							<span className="sr-only">Edit</span>
						</Table.HeadCell>
						<Table.HeadCell>
							<span className="sr-only">Remover</span>
						</Table.HeadCell>
					</Table.Head>
					<Table.Body className="divide-y">
						{entradas.map((entrada) => (
							<EntradaRow key={entrada.id} entrada={entrada} />
						))}
					</Table.Body>
				</Table>
				<div className="flex flex-row items-center justify-center text-center">
					<Pagination
						numberOfPages={data.entradas.total}
						totalRecords={data.entradas.size}
						paginateFront={onPaginateFront}
						paginateBack={onPaginateBack}
						currentPage={data.entradas.current}
						disabledBackButton={!data.entradas.hasPrev}
						disabledForwardButton={!data.entradas.hasNext}
					/>
				</div>
			</div>
		</>
	);
};

export default Entrada;
