import { useQuery } from "@apollo/client";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { Table } from "flowbite-react";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { GET_APROVACOES } from "../../graphql/queries";
import Pagination from "../Pagination";
import AprovacaoRow from "./AprovacaoRow";

const Aprovacao = () => {
	const [page, setPage] = useState(1);
	const { loading, error, data } = useQuery(GET_APROVACOES, {
		variables: {
			page: page,
		},
	});

	if (loading)
		return (
			<Box sx={{ display: "flex" }}>
				<CircularProgress />
			</Box>
		);

	if (error) return <p>An error ocurred.</p>;

	const onPaginateFront = () => {
		setPage(page + 1);
	};

	const onPaginateBack = () => {
		setPage(page - 1);
	};

	return (
		<>
			<div className="flex justify-end p-4 ">
				<Link to="/aprovacao/add">
					<FiPlus className="ml-2 h-10 bg-green-400 w-24 rounded-lg shadow-lg text-white" />
				</Link>
			</div>
			<div className="container mx-auto py-16">
				<Table hoverable={true}>
					<Table.Head>
						<Table.HeadCell>Provincia</Table.HeadCell>
						<Table.HeadCell>Data Req</Table.HeadCell>
						<Table.HeadCell>Instrumento</Table.HeadCell>
						<Table.HeadCell>Qtd</Table.HeadCell>
						<Table.HeadCell>Pedido Por</Table.HeadCell>
						<Table.HeadCell>Status</Table.HeadCell>
						<Table.HeadCell>Comentario</Table.HeadCell>
						<Table.HeadCell>
							<span className="sr-only">Edit</span>
						</Table.HeadCell>
					</Table.Head>
					<Table.Body className="divide-y">
						{data.aprovacoes.results.map((aprovacao) => (
							<AprovacaoRow key={aprovacao.id} aprovacao={aprovacao} />
						))}
					</Table.Body>
				</Table>
				<div className="flex flex-row items-center justify-center text-center">
					<Pagination
						numberOfPages={data.aprovacoes.total}
						totalRecords={data.aprovacoes.size}
						paginateFront={onPaginateFront}
						paginateBack={onPaginateBack}
						currentPage={data.aprovacoes.current}
						disabledBackButton={!data.aprovacoes.hasPrev}
						disabledForwardButton={!data.aprovacoes.hasNext}
					/>
				</div>
			</div>
		</>
	);
};

export default Aprovacao;
