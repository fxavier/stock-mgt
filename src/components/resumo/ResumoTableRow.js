import format from "date-fns/format";
import { Table } from "flowbite-react";
import React from "react";

const ResumoTableRow = (resumo) => {
	return (
		<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
			<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
				{resumo.provincia}
			</Table.Cell>
			<Table.Cell>{resumo.sector}</Table.Cell>
			<Table.Cell>{resumo.instrumento}</Table.Cell>
			<Table.Cell>
				{format(new Date(resumo.dataEntrada), "dd-MM-yyyy")}
			</Table.Cell>
			<Table.Cell>{resumo.quantidade}</Table.Cell>

			<Table.Cell>{resumo.fornecedor}</Table.Cell>
			<Table.Cell>{resumo.stock}</Table.Cell>
			<Table.Cell>{resumo.necessidade}</Table.Cell>
			<Table.Cell>
				{format(new Date(resumo.dataRequisicao), "dd-MM-yyyy")}
			</Table.Cell>
			<Table.Cell>{resumo.quantidadeRequisicao}</Table.Cell>
			<Table.Cell
				className={`${
					resumo.statusRequisicao === "PENDENTE"
						? "text-orange-300"
						: resumo.statusRequisicao === "APROVADA"
						? "text-green-500"
						: "text-red-600"
				}`}
			>
				{resumo.statusRequisicao}
			</Table.Cell>
		</Table.Row>
	);
};

export default ResumoTableRow;
