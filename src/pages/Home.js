import React, { useState } from "react";
import { HiMenu, HiOfficeBuilding } from "react-icons/hi";
import { MdDashboard, MdApproval, MdSummarize } from "react-icons/md";
import { FaTools, FaUser } from "react-icons/fa";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import { GoRequestChanges } from "react-icons/go";

import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../components/Main";

const Home = () => {
	const menus = [
		{ name: "Dashboard", link: "/dashboard", icon: MdDashboard },
		{ name: "Sectores", link: "/sectores", icon: HiOfficeBuilding },
		{ name: "Instrumentos", link: "/instrumento", icon: FaTools },
		{ name: "Entrada", link: "/", icon: AiOutlineDeliveredProcedure },
		{ name: "Requisicao", link: "/", icon: GoRequestChanges },
		{ name: "Aprovacao", link: "/", icon: MdApproval },
		{ name: "Resumo", link: "/", icon: MdSummarize },
		{ name: "Usuario", link: "/", icon: FaUser },
	];

	const [open, setOpen] = useState(true);
	return (
		<section className="flex gap-6">
			<div
				className={`bg-[#052963] min-h-screen ${
					open ? "w-72" : "w-16"
				} duration-500 text-gray-100 px-4`}
			>
				<div className="py-3 flex justify-end">
					<HiMenu
						size={26}
						className="cursor-pointer hover:text-[#02BBCA]"
						onClick={() => setOpen(!open)}
					/>
				</div>
				<div className="mt-4 flex flex-col gap-4 relative">
					{menus.map((menu, i) => (
						<Link
							to={menu?.link}
							key={i}
							className={`${
								menu?.margin && "mt-5"
							}group flex items-center text-sm gap-3.5 font-medium p-2  hover:bg-[#02BBCA] rounded-md`}
						>
							<div>{React.createElement(menu?.icon, { size: "20" })}</div>
							<h2
								style={{ transitionDelay: `${i + 3}00ms` }}
								className={`whitespace-pre duration-500 ${
									!open && "opacity-0 translate-x-28 overflow-hidden"
								}`}
							>
								{menu?.name}
							</h2>
						</Link>
					))}
				</div>
			</div>
			<div className="flex flex-col bg-gray-100 w-full h-screen text-white text-poppins font-semibold"></div>
		</section>
	);
};

export default Home;
