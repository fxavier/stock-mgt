import format from "date-fns/format";
import { Table } from "flowbite-react";
import React from "react";
import { FaEdit } from "react-icons/fa";

const AprovacaoRow = ({ aprovacao }) => {
	return (
		<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
			<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
				{aprovacao.requisicao.provincia.nome}
			</Table.Cell>
			<Table.Cell>
				{format(new Date(aprovacao.requisicao.dataRequisicao), "dd-MM-yyyy")}
			</Table.Cell>
			<Table.Cell>{aprovacao.requisicao.instrumento.nome}</Table.Cell>
			<Table.Cell>{aprovacao.requisicao.quantidade}</Table.Cell>

			<Table.Cell>{aprovacao.requisicao.feitoPor.name}</Table.Cell>

			<Table.Cell
				className={`${
					aprovacao.tipoAprovacao === "PENDENTE"
						? "text-orange-300"
						: aprovacao.tipoAprovacao === "APROVADA"
						? "text-green-500"
						: "text-red-600"
				}`}
			>
				{aprovacao.tipoAprovacao}
			</Table.Cell>
			<Table.Cell>{aprovacao.comentario}</Table.Cell>
			<Table.Cell>
				<a
					href="/"
					className="font-medium text-blue-600 hover:underline dark:text-blue-500"
				>
					<FaEdit />
				</a>
			</Table.Cell>
		</Table.Row>
	);
};

export default AprovacaoRow;
