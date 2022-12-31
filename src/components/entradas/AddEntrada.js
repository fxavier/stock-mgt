import format from "date-fns/format";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { ADD_ENTRADA } from "../../graphql/mutations";
import {
	GET_ENTRADAS,
	GET_INSTRUMENTOS_BY_SECTOR,
	GET_PROVINCIAS,
	GET_SECTORES_BY_PROVINCE,
} from "../../graphql/queries";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Stack, TextField } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const AddEntrada = () => {
	const fornecedores = [
		{ id: 1, name: "ECHO" },
		{ id: 2, name: "MISAU" },
		{ id: 3, name: "LEVANTAMENTO DEPOSITO" },
	];

	const [showModal, setShowModal] = useState(false);
	// eslint-disable-next-line
	const [provincias, setProvincias] = useState([]);
	// eslint-disable-next-line
	const [sectores, setSectores] = useState([]);
	const [instrumentos, setInstrumentos] = useState([]);
	const [sectorId, setSectorId] = useState(0);
	const [provinciaId, setProvinciaId] = useState(0);
	const [instrumentoId, setInstrumentoId] = useState(0);
	const [fornecedor, setFornecedor] = useState([]);
	const [fornecedorNome, setFornecedorNome] = useState("");
	const [dataEntrada, setDataEntrada] = useState(
		format(new Date(new Date()), "yyyy-MM-dd")
	);

	const [quantidade, setQuantidade] = useState(0);
	// eslint-disable-next-line
	const [userId, setUserId] = useState(1);

	const { loading, error, data } = useQuery(GET_PROVINCIAS);

	const res = useQuery(GET_SECTORES_BY_PROVINCE, {
		variables: {
			provinciaId: provinciaId,
		},
	});

	const {
		loading: instrumentoLoading,
		error: instrumentoError,
		data: instrumentoData,
	} = useQuery(GET_INSTRUMENTOS_BY_SECTOR, {
		variables: {
			sectorId,
		},
	});

	const [addEntrada] = useMutation(ADD_ENTRADA, {
		variables: {
			dataEntrada,
			fornecedor: fornecedorNome,
			instrumentoId,
			provinciaId,
			quantidade,
			sectorId,
			userId,
		},
		update(cache, { data: { addEntrada } }) {
			const [entradas] = cache.readQuery({ query: GET_ENTRADAS });

			cache.writeQuery({
				data: { entradas: [...entradas, addEntrada] },
			});
		},
	});

	const handleProvincias = (cod) => {
		const provinceData = data.provincias.filter((item) => item.id === cod);
		setProvincias(provinceData);
		const [{ id }] = provinceData;
		setProvinciaId(id);
	};

	const handleSectores = (codProvincia) => {
		const sectorData = res.data.sectorByProvince.filter(
			(item) => item.id === codProvincia
		);
		setSectores(sectorData);
		//const [{ __typename, id, nome }] = sectorData;
		const [{ id }] = sectorData;
		setSectorId(id);
	};

	const handleInstrumentos = (codSector) => {
		const dataInstrumento = instrumentoData.instrumentoBySector.filter(
			(item) => item.id === codSector
		);

		setInstrumentos(dataInstrumento);
		//const [{ __typename, id, provincia, sector, nome }] = dataInstrumento;
		const [{ id }] = dataInstrumento;
		setInstrumentoId(id);
		console.log(instrumentos);
	};

	const handleFornecedores = (nome) => {
		const fornecedorData = fornecedores.filter((item) => item.name === nome);
		setFornecedor(fornecedorData);
		const [{ name }] = fornecedorData;
		setFornecedorNome(name);
	};

	const handleDataEntrada = (newDate) => {
		const formattedDate = format(new Date(newDate), "yyyy-MM-dd");
		setDataEntrada(formattedDate);

		console.log(dataEntrada);
	};

	// const handleFornecedorName = (nome) => {
	// 	const nomeFornecedor = fornecedores.filter((item) => item.name == nome);
	// 	setFornecedorNome(nomeFornecedor);
	// };

	const clearFields = () => {
		setDataEntrada(format(new Date(new Date()), "yyyy-MM-dd"));
		setFornecedor([]);
		setInstrumentos([]);
		setProvincias([]);
		setSectores([]);
		setQuantidade(0);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		addEntrada(
			dataEntrada,
			fornecedorNome,
			instrumentoId,
			provinciaId,
			quantidade,
			sectorId,
			userId
		);

		console.log("Data:", dataEntrada);
		console.log("Fornecedor:", fornecedorNome);
		console.log("Provincia:", provinciaId);
		console.log("Instrumento:", instrumentoId);
		console.log("Provincia:", provinciaId);
		console.log("Quantidade:", quantidade);
		console.log("Sector:", sectorId);
		clearFields();
	};

	return (
		<>
			<div className="flex justify-end p-4">
				<Button color="success" onClick={() => setShowModal(true)}>
					<FiPlus className="ml-2 h-5 w-5" />
					Nova Entrada
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
								Nova Entrada
							</h3>
							<div id="provincia">
								<div className="mb-2 block">
									<Label htmlFor="provincias" value="Provincia" />
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
									<Label htmlFor="sectores" value="Sector" />
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
							<div id="instrumento">
								<div className="mb-2 block">
									<Label htmlFor="instrumentos" value="Instrumento" />
								</div>
								<Select
									id="instrumento"
									onChange={(e) => handleInstrumentos(e.target.value)}
								>
									<option value="">Selecione o Instrumento</option>
									{!instrumentoLoading && !instrumentoError
										? instrumentoData.instrumentoBySector.map((instrumento) => (
												<option key={instrumento.id} value={instrumento.id}>
													{instrumento.nome}
												</option>
										  ))
										: "No data"}
								</Select>
							</div>

							<div>
								<div id="dataEntrada">
									<div className="mb-3 block">
										<Label htmlFor="" />
									</div>
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<Stack spacing={3}>
											<DesktopDatePicker
												components={{
													OpenPickerIcon: CalendarMonthIcon,
													LeftArrowIcon: ArrowLeftIcon,
													RightArrowIcon: ArrowRightIcon,
												}}
												label="Data de Entrada"
												inputFormat="DD/MM/YYYY"
												value={dataEntrada}
												onChange={handleDataEntrada}
												renderInput={(params) => <TextField {...params} />}
											/>
										</Stack>
									</LocalizationProvider>
								</div>
								<div id="fornecedor">
									<div className="mb-2 block">
										<Label htmlFor="fornecedores" value="Fornecedor" />
									</div>
									<Select
										id="fornecedor"
										onChange={(e) => handleFornecedores(e.target.value)}
									>
										<option value="">Selecione o Fornecedor</option>
										{fornecedor && fornecedor !== undefined
											? fornecedores.map((fornecedor) => (
													<option key={fornecedor.id} value={fornecedor.name}>
														{fornecedor.name}
													</option>
											  ))
											: "No data"}
									</Select>
								</div>
								<div className="mb-2 block">
									<Label htmlFor="Quantidade" value="Quantidade" />
								</div>
								<TextInput
									id="quantidade"
									type="number"
									required={false}
									value={quantidade}
									onChange={(e) => setQuantidade(e.target.value)}
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

export default AddEntrada;
