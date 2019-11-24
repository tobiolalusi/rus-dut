import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import CountUp from "react-countup";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import "./App.css";
import model1 from "./model1.png";
import model2 from "./model2.png";
import {
	ContinuousColorLegend,
	HeatmapSeries,
	LineSeries,
	XAxis,
	XYPlot,
	YAxis
} from "react-vis";

import demo0 from "./demo0";
import demo1 from "./demo1";

const App = () => {
	const [demoId, setDemoId] = useState(0);
	const [graph, setGraph] = useState("correlation");
	const [corr, setCorr] = useState([]);
	const [pof, setPof] = useState([]);
	const [poft, setPoft] = useState([]);
	const [modelImage, setModelImage] = useState(0);
	const [modelImageIsOpen, setModelImageIsOpen] = useState(false);

	const demos = [demo0, demo1];

	const modelImages = [model1, model2];

	useEffect(() => {
		setCorr(convertCorr());
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
	const convertCorr = () => {
		const corr = [];
		let idx = 0;
		for (let i = 0; i < demos[demoId].corr_mtrx.length; i++) {
			for (let j = 0; j < demos[demoId].corr_mtrx[i].length; j++) {
				corr[idx] = {
					x: i,
					y: j,
					color: Math.round(demos[demoId].corr_mtrx[i][j] * 10)
				};
				idx++;
			}
		}
		return corr;
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
							99
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
								graph === "correlation"
									? "bg-blue-5 text-gray-400"
									: "bg-blue-3 text-gray-700"
							} p-4 my-4 cursor-pointer hover:bg-blue-5 hover:text-gray-400`}
							onClick={() => handleGraphChange("correlation")}
						>
							Correlation matrix
						</li>
						{demoId !== 0 && (
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
						)}
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
							<option value={0}>Default</option>
							<option value={1}>Augmented data</option>
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
				{graph === "correlation" && (
					<div className="mx-auto flex justify-center">
						<XYPlot
							className="mx-2 my-4"
							width={450}
							height={450}
							colorRange={["#FF4602", "#FDFF29"]}
							yDomain={[demos[demoId].corr_mtrx.length, 0]}
						>
							<XAxis />
							<YAxis />
							<HeatmapSeries data={corr} />
							<ContinuousColorLegend
								startTitle="0.0"
								midTitle="0.5"
								endTitle="1.0"
								startColor="#FF4602"
								endColor="#FDFF29"
								height={10}
							/>
						</XYPlot>
					</div>
				)}
				{graph === "model_details" && (
					<div className="mx-auto flex justify-center">
						<div className="bg-white p-4 mx-2">
							<img
								onClick={() => {
									setModelImage(0);
									setModelImageIsOpen(true);
								}}
								style={{ height: 500 }}
								src={model1}
							/>
						</div>
						<div className="bg-white p-4 mx-2">
							<img
								onClick={() => {
									setModelImage(1);
									setModelImageIsOpen(true);
								}}
								style={{ height: 500 }}
								src={model2}
							/>
						</div>
						{modelImageIsOpen && (
							<Lightbox
								mainSrc={modelImages[modelImage]}
								wrapperClassName="bg-white p-4"
								onCloseRequest={() => setModelImageIsOpen(false)}
							/>
						)}
					</div>
				)}
				{graph === "pass_or_fail" && (
					<div className="mx-auto flex justify-center">
						<XYPlot className="mx-2 my-4" width={900} height={450}>
							<XAxis
								style={{
									line: { stroke: "#00214A" },
									text: { fill: "white" }
								}}
							/>
							<YAxis
								style={{
									line: { stroke: "#00214A" },
									text: { fill: "white" }
								}}
							/>
							<LineSeries color="#FF4602" strokeWidth={1} data={pof} />
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
