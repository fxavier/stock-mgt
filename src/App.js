import "./App.css";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
//import { ChakraProvider } from "@chakra-ui/react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/dashboard/Dashboard";
import Footer from "./components/Footer";
import InstrumentoPage from "./pages/InstrumentoPage";
import SectorPage from "./pages/SectorPage";
import EntradaPage from "./pages/EntradaPage";
import RequisicaoPage from "./pages/RequisicaoPage";
import ResumoPage from "./pages/ResumoPage";
import Students from "./pages/Students";
import AprovacaoPage from "./pages/AprovacaoPage";
import AddAprovacao from "./components/aprovacao/AddAprovacao";
import AprovarRequisicao from "./components/aprovacao/AprovarRequisicao";
import VerInstrumento from "./components/instrumento/VerInstrumento";

const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				sectores: {
					merge(existing, incoming) {
						return incoming;
					},
				},
				instrumentos: {
					merge(existing, incoming) {
						return incoming;
					},
				},
			},
		},
	},
});

export const client = new ApolloClient({
	uri: "http://localhost:8000/graphql/",
	cache, //: new InMemoryCache(),
});

const App = () => {
	return (
		// <ChakraProvider theme={theme}>
		<ApolloProvider client={client}>
			<Router>
				<div className="flex relative">
					<div>
						<Sidebar />
					</div>
					<div className="flex flex-col w-full">
						<Header />
						<div className="container mx-auto w-full h-[91vh]">
							<Routes>
								<Route path="/dashboard" element={<Dashboard />} />
								<Route path="/" element={<Dashboard />} />
								<Route path="/sectores" element={<SectorPage />} />
								<Route path="/entradas" element={<EntradaPage />} />
								<Route path="/instrumentos" element={<InstrumentoPage />} />
								<Route path="/instrumento/:id" element={<VerInstrumento />} />
								<Route path="/requisicoes" element={<RequisicaoPage />} />
								<Route path="/resumo" element={<ResumoPage />} />
								<Route path="/aprovacaos" element={<AprovacaoPage />} />
								<Route path="/aprovacao/add" element={<AddAprovacao />} />
								<Route
									path="/aprovacao-requisicao/:id"
									element={<AprovarRequisicao />}
								/>
								<Route path="/usuarios" element={<Students />} />
							</Routes>
						</div>
						<Footer />
					</div>
				</div>
			</Router>
		</ApolloProvider>
		// </ChakraProvider>
	);
};

export default App;
