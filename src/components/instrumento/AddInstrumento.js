import { useMutation, useQuery } from "@apollo/client";
import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { ADD_INSTRUMENTO } from "../../graphql/mutations";
import {
	GET_INSTRUMENTOS,
	GET_PROVINCIAS,
	GET_SECTORES_BY_PROVINCE,
} from "../../graphql/queries";

const AddInstrumento = () => {
	const [showModal, setShowModal] = useState(false);
	// eslint-disable-next-line
	const [provincias, setProvincias] = useState([]);
	// eslint-disable-next-line
	const [sectores, setSectores] = useState([]);
	const [sectorId, setSectorId] = useState(0);
	const [provinciaId, setProvinciaId] = useState(0);
	const [nome, setNome] = useState("");
	const [stock, setStock] = useState(0);
	const [ano, setAno] = useState(2022);
	const [quantidadeNecessaria, setQuantidadeNecessaria] = useState(0);

	const { loading, error, data } = useQuery(GET_PROVINCIAS);

	const res = useQuery(GET_SECTORES_BY_PROVINCE, {
		variables: {
			provinciaId: provinciaId,
		},
	});

	const [addInstrumento] = useMutation(ADD_INSTRUMENTO, {
		variables: {
			nome,
			stock,
			ano,
			quantidadeNecessaria,
			provinciaId,
			sectorId,
		},
		refetchQueries: [{ query: GET_INSTRUMENTOS }],
	});

	const handleProvincias = (cod) => {
		const provinceData = data.provincias.filter((item) => item.id === cod);
		setProvincias(provinceData);
		const [{ id }] = provinceData;
		setProvinciaId(id);
	};

	const handleSectores = (codigo) => {
		const sectorData = res.data.sectorByProvince.filter(
			(item) => item.id === codigo
		);
		setSectores(sectorData);
		const [{ id }] = sectorData;
		setSectorId(id);
	};

	const clearFields = () => {
		setNome("");
		setStock(0);
		setAno(2022);
		setQuantidadeNecessaria(0);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		//	addSector(provinciaId, nome);
		console.log(provinciaId);
		console.log(sectorId);
		console.log(nome);
		console.log(stock);
		console.log(ano);
		console.log(quantidadeNecessaria);
		addInstrumento(
			nome,
			stock,
			ano,
			quantidadeNecessaria,
			provinciaId,
			sectorId
		);
		clearFields();
	};

	return (
		<>
			<div className="flex justify-end p-4">
				<Button color="success" onClick={() => setShowModal(true)}>
					<FiPlus className="ml-2 h-5 w-5" />
					Adicionar Instrumento
				</Button>
			</div>
			<Modal
				show={showModal}
				size="lg"
				popup={true}
				onClose={() => setShowModal(false)}
			>
				<Modal.Header />
				<Modal.Body>
					<div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
						<form onSubmit={onSubmit}>
							<h3 className="text-xl font-medium text-gray-900 dark:text-white">
								Adicionar Instrumento
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
							<div id="sector">
								<div className="mb-2 block">
									<Label htmlFor="sectores" value="Selecione o sector" />
								</div>
								<Select
									id="sector"
									onChange={(e) => handleSectores(e.target.value)}
								>
									<option value="">Selecione o Sector</option>
									{!res.loading && !res.error
										? res.data.sectorByProvince.map((sector) => (
												<option key={sector.id} value={sector.id}>
													{sector.nome}
												</option>
										  ))
										: "No data"}
								</Select>
							</div>
							<div>
								<div className="mb-2 block">
									<Label htmlFor="nome" value="Nome do Instrumento" />
								</div>
								<TextInput
									id="nome"
									type="text"
									required={true}
									value={nome}
									onChange={(e) => setNome(e.target.value)}
								/>
								<div className="mb-2 block">
									<Label htmlFor="stock" value="Stock" />
								</div>
								<TextInput
									id="stock"
									type="number"
									required={false}
									value={stock}
									onChange={(e) => setStock(e.target.value)}
								/>
								<div className="mb-2 block">
									<Label htmlFor="ano" value="Ano" />
								</div>
								<TextInput
									id="ano"
									type="number"
									required={false}
									value={ano}
									onChange={(e) => setAno(e.target.value)}
								/>
								<div className="mb-2 block">
									<Label htmlFor="quantidade" value="Necessidade" />
								</div>
								<TextInput
									id="quantidade"
									type="number"
									required={false}
									value={quantidadeNecessaria}
									onChange={(e) => setQuantidadeNecessaria(e.target.value)}
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

export default AddInstrumento;
