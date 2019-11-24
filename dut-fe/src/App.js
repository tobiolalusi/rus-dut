import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import CountUp from "react-countup";
import "./App.css";
import model1 from "./model1.png";
import model2 from "./model2.png";
import {
	DecorativeAxis,
	HeatmapSeries,
	LineSeries,
	XAxis,
	XYPlot,
	YAxis
} from "react-vis";

import demo0 from "./demo0";
import demo1 from "./demo1";

const heatmap = [
	{ x: 1, y: 0 },
	{ x: 1, y: 5 },
	{ x: 1, y: 10 },
	{ x: 1, y: 15 },
	{ x: 2, y: 0 },
	{ x: 2, y: 5 },
	{ x: 2, y: 10 },
	{ x: 2, y: 15 },
	{ x: 3, y: 0 },
	{ x: 3, y: 5 },
	{ x: 3, y: 10 },
	{ x: 3, y: 15 }
];

const App = () => {
	const [demoId, setDemoId] = useState(0);
	const [graph, setGraph] = useState("covariance");
	const [covr, setCovr] = useState([]);
	const [pof, setPof] = useState([]);
	const [poft, setPoft] = useState([]);

	const demos = [demo0, demo1];

	useEffect(() => {
		setCovr(convertCovr());
		setPof(convertPoF());
		setPoft(convertPoFT());
	}, [demoId]);

	const handleGraphChange = graphType => {
		setGraph(graphType);
	};

	const handleDemoSelect = () => {
		let e = document.getElementById("demoSelect");
		const val = e.options[e.selectedIndex].value;
		setDemoId(val);
	};

	// Convert covariance to vis data
	const convertCovr = () => {
		const covr = [];
		let idx = 0;
		for (let i = 0; i < demos[demoId].covr_mtrx.length; i++) {
			for (let j = 0; j < demos[demoId].covr_mtrx[i].length; j++) {
				covr[idx] = {
					x: i,
					y: j,
					color: Math.round(demos[demoId].covr_mtrx[i][j] * 10)
				};
				idx++;
			}
		}
		return covr;
	};

	// Convert pass or fail to vis data
	const convertPoF = () => {
		const pof = [];
		for (let i = 0; i < demos[demoId].pass_fail.length; i++) {
			pof[i] = { x: i, y: demos[demoId].pass_fail[i] };
		}
		return pof;
	};

	// Convert pass or fail threshold
	const convertPoFT = () => {
		// Pass threshold = 1.0
		const poft = [];
		for (let i = 0; i < demos[demoId].pass_fail.length; i++) {
			poft[i] = { x: i, y: 1 };
		}
		return poft;
	};

	return (
		<main className="container mx-auto my-8">
			<header className="my-8">
				<img src={logo} alt="Rhodes & Schwarz Logo" />
				<h1 className="text-4xl font-bold">DUT Dashboard</h1>
			</header>
			<section className="flex my-8">
				<div className="w-1/5 text-center">
					<p className="text-gray-500">Measurements</p>
					<CountUp
						className="text-6xl font-bold"
						end={demos[demoId].meas}
						delay={0.4}
					/>
					<CountUp
						className="block text-gray-500"
						end={demos[demoId].meas_time.toFixed(2)}
						suffix=" seconds"
						delay={0.4}
					/>
				</div>
				<div className="w-1/5 text-center">
					<div className="text-gray-500">Calibration</div>
					<CountUp
						className="text-6xl font-bold"
						end={demos[demoId].calib}
						delay={0.4}
					/>
					<CountUp
						className="block text-gray-500"
						end={demos[demoId].calib_time.toFixed(2)}
						suffix=" seconds"
						delay={0.4}
					/>
				</div>
				<div className="w-1/5 text-center">
					<div className="text-gray-500">Ports</div>
					<CountUp
						className="text-6xl font-bold"
						end={demos[demoId].ports}
						delay={0.4}
					/>
				</div>
				<div className="w-1/5 text-center">
					<div className="text-gray-500">Failed devices</div>
					<CountUp
						className="text-6xl font-bold"
						end={demos[demoId].failed_devices}
						delay={0.4}
					/>
				</div>
				<div className="w-1/5 text-center">
					<div className="text-gray-500">Success rate</div>
					<CountUp
						className="text-6xl font-bold"
						end={
							(1 -
								demos[demoId].failed_devices /
									demos[demoId].total_devices) *
							100
						}
						suffix="%"
						delay={0.4}
					/>
				</div>
			</section>
			<section className="flex">
				<menu className="w-1/4 graphs">
					<ul>
						<li
							className={`${
								graph === "covariance"
									? "bg-blue-5 text-gray-400"
									: "bg-blue-3 text-gray-700"
							} p-4 my-4 cursor-pointer hover:bg-blue-5 hover:text-gray-400`}
							onClick={() => handleGraphChange("covariance")}
						>
							Covariance matrix
						</li>
						<li
							className={`${
								graph === "model_details"
									? "bg-blue-5 text-gray-400"
									: "bg-blue-3 text-gray-700"
							} p-4 my-4 cursor-pointer hover:bg-blue-5 hover:text-gray-400`}
							onClick={() => handleGraphChange("model_details")}
						>
							Model details
						</li>
						<li
							className={`${
								graph === "pass_or_fail"
									? "bg-blue-5 text-gray-400"
									: "bg-blue-3 text-gray-700"
							} p-4 my-4 cursor-pointer hover:bg-blue-5 hover:text-gray-400`}
							onClick={() => handleGraphChange("pass_or_fail")}
						>
							Pass or fail
						</li>
					</ul>
					<div className="relative mt-8">
						<select
							className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							id="demoSelect"
							onChange={() => handleDemoSelect()}
							defaultValue={demoId}
						>
							<option value={0}>Demo 0</option>
							<option value={1}>Demo 1</option>
							<option value={2}>Demo 2</option>
							<option value={3}>Demo 3</option>
							<option value={4}>Demo 4</option>
						</select>
						<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
							<svg
								className="fill-current h-4 w-4"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
							>
								<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
							</svg>
						</div>
					</div>
					<div className="my-4">
						<div className="my-2">
							<span>Seed:</span>
							<br />
							<strong className="text-4xl">{demos[demoId].seed}</strong>
						</div>
						<div className="my-2">
							<span>Expected Yield:</span>
							<br />
							<strong className="text-4xl">
								{demos[demoId].exp_yield}
							</strong>
						</div>
					</div>
				</menu>
				{graph === "covariance" && (
					<div className="mx-auto flex justify-center">
						<XYPlot
							className="mx-2 my-4"
							width={450}
							height={450}
							yDomain={[demos[demoId].covr_mtrx.length, 0]}
						>
							<XAxis />
							<YAxis />
							<HeatmapSeries data={covr} />
						</XYPlot>
					</div>
				)}
				{graph === "model_details" && (
					<div className="mx-auto flex justify-center">
						<img
							style={{ height: 500 }}
							src={model1}
							alt="Model 1 image"
						/>
						<img
							style={{ height: 500 }}
							src={model2}
							alt="Model 2 image"
						/>
					</div>
				)}
				{graph === "pass_or_fail" && (
					<div className="mx-auto flex justify-center">
						<XYPlot className="mx-2 my-4" width={900} height={450}>
							<XAxis style={{ line: { stroke: "#00214A" } }} />
							<YAxis style={{ line: { stroke: "#00214A" } }} />
							<LineSeries color="#F16329" strokeWidth={1} data={pof} />
							<LineSeries color="white" data={poft} />
						</XYPlot>
					</div>
				)}
			</section>
			<footer className="text-center text-sm text-gray-600 my-8">
				<div className="mb-2">
					<strong>#HACKATUM2019</strong> project
				</div>
				<span className="mx-2">Oluwatobiloba Olalusi</span>
				<span className="mx-2">Ali Gharaee</span>
				<span className="mx-2">Abhishek Malik</span>
				<span className="mx-2">Vitaliy Rusinov</span>
			</footer>
		</main>
	);
};

export default App;
