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
		// <div className="py-2">
		// 	<div className="flex flex-row justify-center items-center space-x-4">
		// 		<p className="text-sm text-gray-700 font-poppins">
		// 			Page
		// 			<span className="font-medium space-x-2">{currentPage}</span>
		// 			to
		// 			<span className="font-medium"> {numberOfPages} </span>
		// 			of
		// 			<span className="font-medium"> {totalRecords} </span>
		// 			results
		// 		</p>
		// 	</div>
		// 	<nav className="block"></nav>
		// 	<div>
		// 		<nav
		// 			className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
		// 			aria-label="Pagination"
		// 		>
		// 			<a
		// 				onClick={() => {
		// 					paginateBack();
		// 				}}
		// 				href="#"
		// 				className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
		// 			>
		// 				<span>Previous</span>
		// 			</a>

		// 			<a
		// 				onClick={() => {
		// 					paginateFront();
		// 				}}
		// 				href="#"
		// 				className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
		// 			>
		// 				<span>Next</span>
		// 			</a>
		// 		</nav>
		// 	</div>
		// </div>
	);
};

export default Pagination;
