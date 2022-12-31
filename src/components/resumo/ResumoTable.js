import { useQuery } from "@apollo/client";
import { Box, CircularProgress } from "@mui/material";
import { Table } from "flowbite-react";
import React, { useState } from "react";
import { GET_RESUMOS } from "../../graphql/queries";
import ResumoTableRow from "./ResumoTableRow";

const ResumoTable = () => {
	const [page, setPage] = useState(1);
	// eslint-disable-next-line
	const [search, setSearch] = useState("");
	// eslint-disable-next-line
	const [searchResults, setSearchResults] = useState([]);
	const { loading, error, data } = useQuery(GET_RESUMOS);
	// eslint-disable-next-line
	const resumoData = data.resumo;

	if (loading)
		return (
			<Box sx={{ display: "flex" }}>
				<CircularProgress />
			</Box>
		);

	if (error) return <p>An error ocurred.</p>;

	// const resumo =
	// 	searchResults.length > 0 ? searchResults : data.requisicoes.results;

	// const onPaginateFront = () => {
	// 	setPage(page + 1);
	// };

	// const onPaginateBack = () => {
	// 	setPage(page - 1);
	// };

	return (
		<>
			{/* <RequisicaoSearch setSearchResults={setSearchResults} /> */}
			<div className="container mx-auto py-16">
				<Table hoverable={true}>
					<Table.Head>
						<Table.HeadCell>Provincia</Table.HeadCell>
						<Table.HeadCell>Sector</Table.HeadCell>
						<Table.HeadCell>Instrumento</Table.HeadCell>
						<Table.HeadCell>Entrada</Table.HeadCell>
						<Table.HeadCell>Qtd Entrads</Table.HeadCell>
						<Table.HeadCell>Fornecedor</Table.HeadCell>
						<Table.HeadCell>Stock</Table.HeadCell>
						<Table.HeadCell>Qtd Nesssaria</Table.HeadCell>
						<Table.HeadCell>Requisicao</Table.HeadCell>
						<Table.HeadCell>Qtd Req.</Table.HeadCell>
						<Table.HeadCell>Status</Table.HeadCell>
					</Table.Head>
					<Table.Body className="divide-y">
						{data.resumos.map((resumo) => (
							<ResumoTableRow resumo={resumo} />
						))}
					</Table.Body>
				</Table>
				{/* <div className="flex flex-row items-center justify-center text-center">
					<Pagination
						numberOfPages={data.requisicoes.total}
						totalRecords={data.requisicoes.size}
						paginateFront={onPaginateFront}
						paginateBack={onPaginateBack}
						currentPage={data.requisicoes.current}
						disabledBackButton={!data.requisicoes.hasPrev}
						disabledForwardButton={!data.requisicoes.hasNext}
					/>
				</div> */}
			</div>
		</>
	);
};

export default ResumoTable;
