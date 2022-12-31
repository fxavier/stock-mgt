import React, { useState } from "react";

import { LOGIN } from "../graphql/mutations";
import { Avatar, Box, Button, Grid, Paper, TextField } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useMutation } from "@apollo/client";

import { useLocation, useNavigate } from "react-router-dom";

const Login = ({ classes, setNewUser }) => {
	const paperStyle = {
		padding: 20,
		height: "550",
		width: 350,
		margin: "20px auto",
	};

	const avatarStyle = { backgroundColor: "#1bbd7e" };
	const btnstyle = { margin: "8px 0" };
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();
	// eslint-disable-next-line
	const location = useLocation();
	// eslint-disable-next-line
	const from = "/login";
	// eslint-disable-next-line
	const isLoggedIn = false;

	// eslint-disable-next-line
	const [login, { loading, data, error }] = useMutation(LOGIN, {
		variables: {
			email: email,
			password: password,
		},
	});

	const handleSubmit = async (event) => {
		event.preventDefault();
		const res = await login(email, password);

		localStorage.setItem("authToken", res.data.loginUser.access);

		navigate("/dashboard");
	};

	return (
		<Box className="mt-36">
			<Paper elevetion={10} style={paperStyle}>
				<Grid align="center">
					<Avatar style={avatarStyle}>
						<LockIcon />
					</Avatar>
					<h2>Sign In</h2>
				</Grid>
				<div className="flex flex-col-3 space-y-2.5">
					<form onSubmit={handleSubmit}>
						<TextField
							fullWidth
							variant="filled"
							type="text"
							label="Email"
							onChange={(event) => setEmail(event.target.value)}
							value={email}
							name="email"
							sx={{ gridColumn: "span 2" }}
						/>
						<TextField
							fullWidth
							variant="filled"
							type="password"
							label="Password"
							onChange={(event) => setPassword(event.target.value)}
							value={password}
							name="password"
							sx={{ gridColumn: "span 2" }}
						/>
						<Box display="flex" justifyContent="end" mt="20px">
							<Button
								type="submit"
								color="primary"
								variant="contained"
								style={btnstyle}
								fullWidth
								disabled={loading || !email.trim() || !password.trim()}
							>
								Entrar
							</Button>
						</Box>
					</form>
				</div>
			</Paper>
		</Box>
	);
};

export default Login;
