import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
	return (
		<>
			<div className="flex relative">
				<Sidebar />
				<div className="flex flex-col w-full">
					<Header />
					<div className="container mx-auto w-full h-[91vh]">{children}</div>
					<Footer />
				</div>
			</div>
		</>
	);
};

export default Layout;
