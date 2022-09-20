import { Table } from "flowbite-react";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const InstrumentoRow = ({ instrumento }) => {
	return (
		<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
			<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
				{instrumento.provincia.nome}
			</Table.Cell>
			<Table.Cell>{instrumento.sector.nome}</Table.Cell>
			<Table.Cell>{instrumento.nome}</Table.Cell>
			<Table.Cell>{instrumento.stock}</Table.Cell>
			<Table.Cell>{instrumento.ano}</Table.Cell>
			<Table.Cell>{instrumento.quantidadeNecessaria}</Table.Cell>
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

export default InstrumentoRow;
