import { Table } from "flowbite-react";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import format from "date-fns/format";
const EntradaRow = ({ entrada }) => {
	return (
		<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
			<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
				{entrada.provincia.nome}
			</Table.Cell>
			<Table.Cell>{entrada.sector.nome}</Table.Cell>
			<Table.Cell>{entrada.instrumento.nome}</Table.Cell>
			<Table.Cell>
				{format(new Date(entrada.dataEntrada), "dd-MM-yyyy")}
			</Table.Cell>
			<Table.Cell>{entrada.quantidade}</Table.Cell>
			<Table.Cell>{entrada.fornecedor}</Table.Cell>

			<Table.Cell>
				<a
					href="/"
					className="font-medium text-blue-600 hover:underline dark:text-blue-500"
				>
					<FaEdit />
				</a>
			</Table.Cell>
			<Table.Cell>
				<a
					href="/"
					className="font-medium text-blue-600 hover:underline dark:text-blue-500"
				>
					<FaTrash />
				</a>
			</Table.Cell>
		</Table.Row>
	);
};

export default EntradaRow;
