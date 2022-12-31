import { useQuery } from "@apollo/client";
import { Box, CircularProgress } from "@mui/material";
import { Table } from "flowbite-react";
import React, { useState } from "react";
import { GET_REQUISICOES } from "../../graphql/queries";
import Pagination from "../Pagination";
import RequisicaoRow from "./RequisicaoRow";
import RequisicaoSearch from "./RequisicaoSearch";

const Requisicao = () => {
	const [page, setPage] = useState(1);
	// eslint-disable-next-line
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const { loading, error, data } = useQuery(GET_REQUISICOES, {
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

	const requisicoes =
		searchResults.length > 0 ? searchResults : data.requisicoes.results;

	const onPaginateFront = () => {
		setPage(page + 1);
	};

	const onPaginateBack = () => {
		setPage(page - 1);
	};

	return (
		<>
			<RequisicaoSearch setSearchResults={setSearchResults} />
			<div className="container mx-auto py-16">
				<Table hoverable={true}>
					<Table.Head>
						<Table.HeadCell>Provincia</Table.HeadCell>
						<Table.HeadCell>Sector</Table.HeadCell>
						<Table.HeadCell>Instrumento</Table.HeadCell>
						<Table.HeadCell>Data Requisicao</Table.HeadCell>
						<Table.HeadCell>Qtd</Table.HeadCell>
						<Table.HeadCell>Status</Table.HeadCell>
						<Table.HeadCell>Feito por</Table.HeadCell>
						<Table.HeadCell>
							<span>Ver</span>
						</Table.HeadCell>
						<Table.HeadCell>
							<span>Aprovar</span>
						</Table.HeadCell>
					</Table.Head>
					<Table.Body className="divide-y">
						{requisicoes.map((requisicao) => (
							<RequisicaoRow key={requisicao.id} requisicao={requisicao} />
						))}
					</Table.Body>
				</Table>
				<div className="flex flex-row items-center justify-center text-center">
					<Pagination
						numberOfPages={data.requisicoes.total}
						totalRecords={data.requisicoes.size}
						paginateFront={onPaginateFront}
						paginateBack={onPaginateBack}
						currentPage={data.requisicoes.current}
						disabledBackButton={!data.requisicoes.hasPrev}
						disabledForwardButton={!data.requisicoes.hasNext}
					/>
				</div>
			</div>
		</>
	);
};

export default Requisicao;
