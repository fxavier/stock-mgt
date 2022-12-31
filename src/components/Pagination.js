import { Button } from "@mui/material";
import React from "react";

const Pagination = ({
	numberOfPages,
	totalRecords,
	paginateFront,
	paginateBack,
	currentPage,
	disabledBackButton,
	disabledForwardButton,
}) => {
	return (
		<div className="py-2 font-poppins flex flex-row justify-center items-center space-x-2">
			<Button
				variant="contained"
				onClick={paginateBack}
				disabled={disabledBackButton}
				color="success"
			>
				Anterior
			</Button>
			<span>
				<h5>{currentPage}</h5>
			</span>
			<span>
				<h5> DE {numberOfPages}</h5>
			</span>
			<Button
				variant="contained"
				onClick={paginateFront}
				disabled={disabledForwardButton}
				color="success"
			>
				Proximo
			</Button>
		</div>
	);
};

export default Pagination;
