import { useMutation, useQuery } from "@apollo/client";
import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import { ADD_SECTOR } from "../../graphql/mutations";

import { GET_PROVINCIAS, GET_SECTORES } from "../../graphql/queries";

const AddSector = () => {
	const [showModal, setShowModal] = useState(false);
	// eslint-disable-next-line
	const [provincias, setProvincias] = useState([]);
	const [provinciaId, setProvinciaId] = useState(0);
	const [nome, setNome] = useState("");
	const { loading, error, data } = useQuery(GET_PROVINCIAS);

	const [addSector] = useMutation(ADD_SECTOR, {
		variables: { provinciaId, nome },
		update(cache, { data: { addSector } }) {
			const [sectores] = cache.readQuery({ query: GET_SECTORES });

			cache.writeQuery({
				data: { sectores: [...sectores, addSector] },
			});
		},
	});

	const handleProvincias = (cod) => {
		const provinceData = data.provincias.filter((item) => item.id === cod);
		setProvincias(provinceData);
		const [{ id }] = provinceData;
		setProvinciaId(id);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		addSector(provinciaId, nome);
		setNome("");
	};

	return (
		<>
			<div className="flex justify-end p-4">
				<Button color="success" onClick={() => setShowModal(true)}>
					<FiPlus className="ml-2 h-5 w-5" />
					Adicionar Sector
				</Button>
			</div>
			<Modal
				show={showModal}
				size="md"
				popup={true}
				onClose={() => setShowModal(false)}
			>
				<Modal.Header />
				<Modal.Body>
					<div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
						<form onSubmit={onSubmit}>
							<h3 className="text-xl font-medium text-gray-900 dark:text-white">
								Adicionar Sector
							</h3>
							<div id="provincia">
								<div className="mb-2 block">
									<Label htmlFor="provincias" value="Selecione a provincia" />
								</div>
								<Select
									id="provincia"
									onChange={(e) => handleProvincias(e.target.value)}
								>
									<option value="">Selecione a Provincia</option>
									{!loading && !error
										? data.provincias.map((provincia) => (
												<option key={provincia.id} value={provincia.id}>
													{provincia.nome}
												</option>
										  ))
										: "No data"}
								</Select>
							</div>
							<div>
								<div className="mb-2 block">
									<Label htmlFor="nome" value="Nome do sector" />
								</div>
								<TextInput
									id="nome"
									type="text"
									required={true}
									value={nome}
									onChange={(e) => setNome(e.target.value)}
								/>
							</div>

							<div className="w-full m-4">
								<Button type="submit">Salvar</Button>
							</div>
						</form>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default AddSector;
