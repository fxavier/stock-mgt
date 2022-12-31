import "./App.css";

import { Route, Routes } from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";

import InstrumentoPage from "./pages/InstrumentoPage";
import SectorPage from "./pages/SectorPage";
import EntradaPage from "./pages/EntradaPage";
import RequisicaoPage from "./pages/RequisicaoPage";

import AprovacaoPage from "./pages/AprovacaoPage";

import VerInstrumento from "./components/instrumento/VerInstrumento";
import Login from "./pages/Login";
import Layout from "./components/Layout";

const App = () => {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/" element={<Login />} />
			<Route
				path="/dashboard"
				element={
					<Layout>
						<Dashboard />
					</Layout>
				}
			/>
			<Route
				path="/sectores"
				element={
					<Layout>
						<SectorPage />
					</Layout>
				}
			/>
			<Route
				path="/entradas"
				element={
					<Layout>
						<EntradaPage />
					</Layout>
				}
			/>

			<Route
				path="/instrumentos"
				element={
					<Layout>
						<InstrumentoPage />
					</Layout>
				}
			/>
			<Route
				path="/instrumento/:id"
				element={
					<Layout>
						<VerInstrumento />
					</Layout>
				}
			/>
			<Route
				path="/requisicoes"
				element={
					<Layout>
						<RequisicaoPage />
					</Layout>
				}
			/>
			<Route
				path="/aprovacaos"
				element={
					<Layout>
						<AprovacaoPage />
					</Layout>
				}
			/>
		</Routes>
	);
};

export default App;
