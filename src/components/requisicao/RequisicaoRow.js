import format from "date-fns/format";
import { Table } from "flowbite-react";
import React from "react";
import { FaEye } from "react-icons/fa";
import { MdApproval } from "react-icons/md";
import { Link, useParams } from "react-router-dom";

const RequisicaoRow = ({ requisicao }) => {
	// eslint-disable-next-line
	const { id } = useParams();
	return (
		<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
			<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
				{requisicao.provincia.nome}
			</Table.Cell>
			<Table.Cell>{requisicao.sector.nome}</Table.Cell>
			<Table.Cell>{requisicao.instrumento.nome}</Table.Cell>
			<Table.Cell>
				{format(new Date(requisicao.dataRequisicao), "dd-MM-yyyy")}
			</Table.Cell>
			<Table.Cell>{requisicao.quantidade}</Table.Cell>
			<Table.Cell
				className={`${
					requisicao.statusRequisicao === "PENDENTE"
						? "text-orange-300"
						: requisicao.statusRequisicao === "APROVADA"
						? "text-green-500"
						: "text-red-600"
				}`}
			>
				{requisicao.statusRequisicao}
			</Table.Cell>
			<Table.Cell>{requisicao.feitoPor.name}</Table.Cell>

			<Table.Cell>
				<a className="font-medium text-blue-600 hover:underline dark:text-blue-500">
					<Link to={`/instrumento/${requisicao.instrumento.id}`}>
						<FaEye />
					</Link>
				</a>
			</Table.Cell>
			<Table.Cell>
				<a className="font-medium text-blue-600 hover:underline dark:text-blue-500">
					<Link to={`/aprovacao-requisicao/${requisicao.id}`}>
						{requisicao.statusRequisicao === "APROVADA" ? "" : <MdApproval />}
					</Link>
				</a>
			</Table.Cell>
		</Table.Row>
	);
};

export default RequisicaoRow;
