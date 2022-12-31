import { gql } from "@apollo/client";

const GET_SECTORES = gql`
	query getSectores($page: Int, $search: String) {
		sectores(page: $page, search: $search) {
			total
			size
			current
			hasNext
			hasPrev
			results {
				id
				provincia {
					nome
				}
				nome
			}
		}
	}
`;

const GET_SECTORES_BY_PROVINCE = gql`
	query getSectoresByProvince($provinciaId: Int!) {
		sectorByProvince(provinciaId: $provinciaId) {
			id
			provincia {
				nome
			}
			nome
		}
	}
`;

const GET_INSTRUMENTOS_BY_SECTOR = gql`
	query getInstrumentoBySector($sectorId: Int!) {
		instrumentoBySector(sectorId: $sectorId) {
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
		}
	}
`;

const GET_INSTRUMENTOS = gql`
	query getInstrumentos($page: Int, $search: String) {
		instrumentos(page: $page, search: $search) {
			total
			size
			current
			hasNext
			hasPrev
			results {
				id
				provincia {
					nome
				}
				sector {
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

const GET_INSTRUMENTO = gql`
	query getInstrumento($id: Int!) {
		instrumento(id: $id) {
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
			quantidadeNecessaria
		}
	}
`;

const GET_ENTRADAS = gql`
	query getEntradas($page: Int, $search: String) {
		entradas(page: $page, search: $search) {
			total
			size
			current
			hasNext
			hasPrev
			results {
				id
				dataEntrada
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
				fornecedor
				feitoPor {
					id
					name
				}
				feitoEm
			}
		}
	}
`;

const GET_REQUISICOES = gql`
	query getRequisicoes($page: Int, $search: String) {
		requisicoes(page: $page, search: $search) {
			total
			size
			current
			hasNext
			hasPrev
			results {
				id
				dataRequisicao
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
				feitoEm
			}
		}
	}
`;

const GET_REQUISICOES_PENDENTES = gql`
	query getRequisicoesPendentes {
		requisicoesPendentes {
			id
			instrumento {
				id
				nome
			}
			statusRequisicao
		}
	}
`;

const GET_PROVINCIAS = gql`
	query getProvincias {
		provincias {
			id
			nome
		}
	}
`;

const GET_RESUMOS = gql`
	query getResumos {
		resumos {
			id
			requisicaoId
			provincia
			sector
			instrumento
			dataEntrada
			quantidade
			fornecedor
			stock
			necessidade
			dataRequisicao
			quantidadeRequisicao
			statusRequisicao
		}
	}
`;

const GET_RESUMO_VISUALIZACOES = gql`
	query getResumoVisualizacoes {
		resumoVisualizacoes {
			instrumento
			echoMisau
			necessidade
			stockActual
		}
	}
`;

const GET_APROVACOES = gql`
	query getAprovacoes {
		aprovacoes {
			total
			size
			current
			hasNext
			hasPrev
			results {
				id
				requisicao {
					id
					provincia {
						id
						nome
					}
					instrumento {
						id
						nome
					}
					dataRequisicao
					quantidade
					feitoPor {
						id
						name
					}
				}
				tipoAprovacao
				comentario
				feitoEm
				feitoPor {
					id
					name
				}
			}
		}
	}
`;

export {
	GET_SECTORES,
	GET_INSTRUMENTOS,
	GET_PROVINCIAS,
	GET_SECTORES_BY_PROVINCE,
	GET_INSTRUMENTOS_BY_SECTOR,
	GET_REQUISICOES,
	GET_ENTRADAS,
	GET_RESUMOS,
	GET_APROVACOES,
	GET_REQUISICOES_PENDENTES,
	GET_INSTRUMENTO,
	GET_RESUMO_VISUALIZACOES,
};
