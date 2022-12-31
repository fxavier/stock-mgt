import { useMutation, useQuery } from "@apollo/client";
import { Button, Label, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { ADD_APROVACOES } from "../../graphql/mutations";
import { GET_REQUISICOES_PENDENTES } from "../../graphql/queries";

const AddAprovacao = () => {
	const tipoAprovacao = [
		{ id: 1, name: "Aprovada" },
		{ id: 2, name: "Rejeitada" },
	];

	const [requisicaoId, setRequisicaoId] = useState(0);
	// eslint-disable-next-line
	const [requisicao, setRequisicao] = useState([]);
	const [comentario, setComentario] = useState("");
	// eslint-disable-next-line
	const [userId, setUserId] = useState(1);
	// eslint-disable-next-line
	const [aprovacao, setAprovacao] = useState([]);
	const [tipoAprovacaoNome, setTipoAprovacaoNome] = useState("");

	const { loading, error, data } = useQuery(GET_REQUISICOES_PENDENTES);

	const [addAprovacao] = useMutation(ADD_APROVACOES, {
		variables: {
			requisicaoId,
			tipoAprovacao: tipoAprovacaoNome,
			comentario,
			userId,
		},
	});

	const clearFields = () => {
		setComentario("");
		setRequisicao([]);
		setTipoAprovacaoNome("");
	};

	const handleTipoAprovacao = (nome) => {
		const tipoData = tipoAprovacao.filter((item) => item.name === nome);
		setAprovacao(tipoData);
		const [{ name }] = tipoData;
		setTipoAprovacaoNome(name);
	};

	const handleRequisicoes = (codReq) => {
		const dataReq = data.requisicoesPendentes.filter(
			(item) => item.id === codReq
		);

		setRequisicao(dataReq);
		//const [{ __typename, id, provincia, sector, nome }] = dataInstrumento;
		const [{ id }] = dataReq;
		setRequisicaoId(id);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		//	addSector(provinciaId, nome);

		addAprovacao(requisicaoId, tipoAprovacao, comentario, userId);
		clearFields();
	};

	return (
		<>
			<div className="container mx-auto pb-16 shadow-lg rounded-lg bg-white w-3/4 h-auto m-12">
				<div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
					<form onSubmit={onSubmit}>
						<h3 className="text-xl font-medium font-poppins text-center text-gray-900 dark:text-white">
							Aprovar a requisicao
						</h3>

						<div id="requisicao">
							<div className="mb-2 block">
								<Label htmlFor="requisicao" value="Selecione a requisicao" />
							</div>
							<Select
								id="requisicao"
								onChange={(e) => handleRequisicoes(e.target.value)}
							>
								<option value="">Selecione requisicao</option>
								{!loading && !error
									? data.requisicoesPendentes.map((req) => (
											<option key={req.id} value={req.id}>
												{req.instrumento.nome}
											</option>
									  ))
									: "No data"}
							</Select>
						</div>
						<div id="tipoAprovacao">
							<div className="mb-2 block">
								<Label htmlFor="aprovacao" value="Tipo Aprovacao" />
							</div>
							<Select
								id="tipoAprovacao"
								onChange={(e) => handleTipoAprovacao(e.target.value)}
							>
								<option value="">Selecione o tipo</option>
								{tipoAprovacao && tipoAprovacao !== undefined
									? tipoAprovacao.map((tipo) => (
											<option key={tipo.id} value={tipo.name}>
												{tipo.name}
											</option>
									  ))
									: "No data"}
							</Select>
						</div>

						<div>
							<div className="mb-2 block">
								<Label htmlFor="Comentario" value="Comentario" />
							</div>
							<TextInput
								id="comentario"
								type="text"
								required={true}
								value={comentario}
								onChange={(e) => setComentario(e.target.value)}
							/>
						</div>

						<div className="w-full m-4">
							<Button type="submit">Salvar</Button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default AddAprovacao;
