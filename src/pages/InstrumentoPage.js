import React from "react";

import Instrumento from "../components/instrumento/Instrumento";
import AddInstrumento from "../components/instrumento/AddInstrumento";

const InstrumentoPage = () => {
	return (
		<>
			<AddInstrumento />
			<Instrumento />
		</>
	);
};

export default InstrumentoPage;
