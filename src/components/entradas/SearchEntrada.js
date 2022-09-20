import { ApolloConsumer, useQuery } from "@apollo/client";
import { Clear, Search } from "@mui/icons-material";
import { IconButton, InputBase, Paper } from "@mui/material";
import React, { useRef, useState } from "react";
import { GET_ENTRADAS } from "../../graphql/queries";

const SearchEntrada = ({ setSearchResults }) => {
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");
	const { data } = useQuery(GET_ENTRADAS, {
		variables: {
			page: page,
			search: search,
		},
	});
	const inputEl = useRef();
	const clearSearchInput = () => {
		setSearchResults([]);
		setSearch("");
		inputEl.current.focus();
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setSearchResults(data.entradas.results);
		setPage(data.entradas.current);
	};

	return (
		<div className="py-4">
			<ApolloConsumer>
				{(client) => (
					<form onSubmit={(event) => handleSubmit(event, client)}>
						<Paper
							sx={{
								p: "2px 4px",
								display: "flex",
								alignItems: "center",
								width: 400,
							}}
						>
							<IconButton
								sx={{ p: "10px" }}
								aria-label="clear"
								onClick={clearSearchInput}
							>
								<Clear />
							</IconButton>
							<InputBase
								sx={{ ml: 1, flex: 1 }}
								placeholder="Pesquisar Instrumentos..."
								inputProps={{ "aria-label": "Pesquisar Movimentos de entrada" }}
								onChange={(event) => setSearch(event.target.value)}
								value={search}
								inputRef={inputEl}
							/>
							<IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
								<Search />
							</IconButton>
						</Paper>
					</form>
				)}
			</ApolloConsumer>
		</div>
	);
};

export default SearchEntrada;
