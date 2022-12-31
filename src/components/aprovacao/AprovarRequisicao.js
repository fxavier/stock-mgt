import { useMutation, useQuery } from "@apollo/client";
import { Button, Label, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ADD_APROVACOES } from "../../graphql/mutations";
import { GET_REQUISICOES } from "../../graphql/queries";

const AprovarRequisicao = () => {
	const { id } = useParams();
	const tipoAprovacao = [
		{ id: 1, name: "Aprovada" },
		{ id: 2, name: "Rejeitada" },
	];
	// eslint-disable-next-line
	const [requisicaoId, setRequisicaoId] = useState(0);
	const [comentario, setComentario] = useState("");
	// eslint-disable-next-line
	const [userId, setUserId] = useState(1);
	// eslint-disable-next-line
	const [aprovacao, setAprovacao] = useState([]);
	const [tipoAprovacaoNome, setTipoAprovacaoNome] = useState("");
	// eslint-disable-next-line
	const { loading, error, data } = useQuery(GET_REQUISICOES);

	const [addAprovacao] = useMutation(ADD_APROVACOES, {
		variables: {
			requisicaoId: id,
			tipoAprovacao: tipoAprovacaoNome,
			comentario,
			userId,
		},
	});

	const clearFields = () => {
		setComentario("");

		setTipoAprovacaoNome("");
	};

	const handleTipoAprovacao = (nome) => {
		const tipoData = tipoAprovacao.filter((item) => item.name === nome);
		setAprovacao(tipoData);
		const [{ name }] = tipoData;
		setTipoAprovacaoNome(name);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		//	addSector(provinciaId, nome);

		addAprovacao(requisicaoId, tipoAprovacao, comentario, userId);
		clearFields();
		//	history.push("/requisicoes");
	};
	return (
		<>
			<div className="container mx-auto pb-16 shadow-lg rounded-lg bg-white w-3/4 h-auto m-12">
				<div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
					<form onSubmit={onSubmit}>
						<h3 className="text-xl font-medium font-poppins text-center text-gray-900 dark:text-white">
							Aprovar a requisicao
						</h3>

						<div>
							<div className="mb-2 block">
								<Label htmlFor="reqId" value="Requisicao" />
							</div>
							<TextInput
								id="reqId"
								type="text"
								required={true}
								value={id}
								disabled={true}
							/>
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

export default AprovarRequisicao;
