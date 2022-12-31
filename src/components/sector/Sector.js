import { useQuery } from "@apollo/client";

import { Box, CircularProgress } from "@mui/material";
import { Table } from "flowbite-react";

import { useState } from "react";

import { GET_SECTORES } from "../../graphql/queries";
import Pagination from "../Pagination";
import SectorRow from "./SectorRow";
import SectorSearch from "./SectorSearch";

const Sector = () => {
	const [page, setPage] = useState(1);
	// eslint-disable-next-line
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const { loading, error, data } = useQuery(GET_SECTORES, {
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

	const sectores =
		searchResults.length > 0 ? searchResults : data.sectores.results;

	const onPaginateFront = () => {
		setPage(page + 1);
		console.log(page);
	};

	const onPaginateBack = () => {
		setPage(page - 1);
		console.log(page);
	};

	return (
		<>
			<SectorSearch setSearchResults={setSearchResults} />
			<div className="container mx-auto py-16">
				<Table hoverable={true}>
					<Table.Head>
						<Table.HeadCell>Provincia</Table.HeadCell>
						<Table.HeadCell>Sector</Table.HeadCell>
						<Table.HeadCell>
							<span className="sr-only">Edit</span>
						</Table.HeadCell>
						<Table.HeadCell>
							<span className="sr-only">Remover</span>
						</Table.HeadCell>
					</Table.Head>
					<Table.Body className="divide-y">
						{sectores.map((sector) => (
							<SectorRow key={sector.id} sector={sector} />
						))}
					</Table.Body>
				</Table>
				<div className="flex flex-row items-center justify-center text-center">
					<Pagination
						numberOfPages={data.sectores.total}
						totalRecords={data.sectores.size}
						paginateFront={onPaginateFront}
						paginateBack={onPaginateBack}
						currentPage={data.sectores.current}
						disabledBackButton={!data.sectores.hasPrev}
						disabledForwardButton={!data.sectores.hasNext}
					/>
				</div>
			</div>
		</>
	);
};

export default Sector;
