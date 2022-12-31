import { gql } from "@apollo/client";

const ADD_SECTOR = gql`
	mutation createSector($provinciaId: Int!, $nome: String!) {
		createSector(provinciaId: $provinciaId, nome: $nome) {
			sector {
				id
				provincia {
					id
					nome
				}
				nome
			}
		}
	}
`;

const ADD_INSTRUMENTO = gql`
	mutation createInstrumento(
		$nome: String!
		$stock: Int
		$ano: Int
		$quantidadeNecessaria: Int
		$provinciaId: Int!
		$sectorId: Int!
	) {
		createInstrumento(
			nome: $nome
			stock: $stock
			ano: $ano
			quantidadeNecessaria: $quantidadeNecessaria
			provinciaId: $provinciaId
			sectorId: $sectorId
		) {
			instrumento {
				id
				provincia {
					id
					nome
				}
				sector {
					id
					nome
				}
				nome
				stock
				ano
				quantidadeNecessaria
			}
		}
	}
`;

const ADD_ENTRADA = gql`
	mutation createEntrada(
		$dataEntrada: Date!
		$fornecedor: String!
		$instrumentoId: Int!
		$provinciaId: Int!
		$quantidade: Int!
		$sectorId: Int!
		$userId: Int
	) {
		createEntrada(
			dataEntrada: $dataEntrada
			fornecedor: $fornecedor
			instrumentoId: $instrumentoId
			provinciaId: $provinciaId
			quantidade: $quantidade
			sectorId: $sectorId
			userId: $userId
		) {
			entrada {
				id
				provincia {
					id
					nome
				}
				sector {
					id
					nome
				}
				instrumento {
					id
					nome
				}
				dataEntrada
				quantidade
				fornecedor
				feitoPor {
					id
					name
				}
			}
		}
	}
`;

const ADD_REQUISICAO = gql`
	mutation createRequisicao(
		$dataRequisicao: Date!
		$provinciaId: Int!
		$sectorId: Int!
		$instrumentoId: Int!
		$quantidade: Int!
		$userId: Int
	) {
		createRequisicao(
			dataRequisicao: $dataRequisicao
			provinciaId: $provinciaId
			sectorId: $sectorId
			instrumentoId: $instrumentoId
			quantidade: $quantidade
			userId: $userId
		) {
			requisicao {
				id
				provincia {
					id
					nome
				}
				sector {
					id
					nome
				}
				instrumento {
					id
					nome
				}
				quantidade
				statusRequisicao
				feitoPor {
					id
					name
				}
			}
		}
	}
`;

const ADD_APROVACOES = gql`
	mutation createAprovacao(
		$requisicaoId: Int!
		$tipoAprovacao: String!
		$comentario: String
		$userId: Int!
	) {
		createAprovacao(
			requisicaoId: $requisicaoId
			tipoAprovacao: $tipoAprovacao
			comentario: $comentario
			userId: $userId
		) {
			aprovacao {
				id
				requisicao {
					id
					dataRequisicao
					quantidade
				}
				tipoAprovacao
				comentario
			}
		}
	}
`;

const LOGIN = gql`
	mutation loginUser($email: String!, $password: String!) {
		loginUser(email: $email, password: $password) {
			user {
				id
				name
				email
				password
			}
			access
			refresh
		}
	}
`;

export {
	ADD_SECTOR,
	ADD_INSTRUMENTO,
	ADD_ENTRADA,
	ADD_REQUISICAO,
	ADD_APROVACOES,
	LOGIN,
};
