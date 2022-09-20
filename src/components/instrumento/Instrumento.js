import { useQuery } from "@apollo/client";
import { Box, CircularProgress } from "@mui/material";
import { Table } from "flowbite-react";
import React, { useState } from "react";
import { GET_INSTRUMENTOS } from "../../graphql/queries";
import Pagination from "../Pagination";
import InstrumentoRow from "./InstrumentoRow";
import InstrumentoSearch from "./InstrumentoSearch";

const Instrumento = () => {
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const { loading, error, data } = useQuery(GET_INSTRUMENTOS, {
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

	const instrumentos =
		searchResults.length > 0 ? searchResults : data.instrumentos.results;

	const onPaginateFront = () => {
		setPage(page + 1);
		console.log(instrumentos);
	};

	const onPaginateBack = () => {
		setPage(page - 1);
	};

	return (
		<>
			<InstrumentoSearch setSearchResults={setSearchResults} />
			<div className="container mx-auto py-16">
				<Table hoverable={true}>
					<Table.Head>
						<Table.HeadCell>Provincia</Table.HeadCell>
						<Table.HeadCell>Sector</Table.HeadCell>
						<Table.HeadCell>Instrumento</Table.HeadCell>
						<Table.HeadCell>Stock</Table.HeadCell>
						<Table.HeadCell>Ano</Table.HeadCell>
						<Table.HeadCell>Necessidade</Table.HeadCell>
						<Table.HeadCell>
							<span className="sr-only">Edit</span>
						</Table.HeadCell>
						<Table.HeadCell>
							<span className="sr-only">Remover</span>
						</Table.HeadCell>
					</Table.Head>
					<Table.Body className="divide-y">
						{instrumentos.map((instrumento) => (
							<InstrumentoRow key={instrumento.id} instrumento={instrumento} />
						))}
					</Table.Body>
				</Table>
				<div className="flex flex-row items-center justify-center text-center">
					<Pagination
						numberOfPages={data.instrumentos.total}
						totalRecords={data.instrumentos.size}
						paginateFront={onPaginateFront}
						paginateBack={onPaginateBack}
						currentPage={data.instrumentos.current}
						disabledBackButton={!data.instrumentos.hasPrev}
						disabledForwardButton={!data.instrumentos.hasNext}
					/>
				</div>
			</div>
		</>
	);
};

export default Instrumento;
