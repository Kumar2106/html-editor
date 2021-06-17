/** @format */

import "./App.css";
import SaveIcon from "@material-ui/icons/Save";
import BrightnessMediumRoundedIcon from "@material-ui/icons/BrightnessMediumRounded";
import { useState } from "react";
import ReactAce from "react-ace";
import brace from "brace";
import "brace/theme/twilight";
import "brace/theme/xcode";
import "brace/mode/html";
import Parser from "html-react-parser";

function App() {
	const [theme, set_theme] = useState("xcode");
	const [data, set_data] = useState("");
	const [code, set_code] = useState("");

	//function to run the html code
	function runCode() {
		set_code(data);
	}

	//function to change the theme of the html editor
	function changetheme() {
		if (theme === "xcode") {
			set_theme("twilight");
		} else {
			set_theme("xcode");
		}
		console.log("Change theme is called");
	}

	//function to save the html document
	function saveFile() {
		const blob = new Blob([data], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.download = "File.html";
		link.href = url;
		link.click();
	}
	return (
		<div className="app">
			<div className="header">
				{/** Save Icon  */}
				<div
					onClick={() => {
						saveFile();
					}}
				>
					<SaveIcon className="save__icon" />
				</div>

				{/** Change Theme Icon  */}
				<div>
					<BrightnessMediumRoundedIcon
						className="theme__icon"
						onClick={() => changetheme()}
					/>
				</div>

				{/** Run Button */}
				<div
					onClick={() => {
						runCode();
					}}
				>
					<p className="run__icon">Run</p>
				</div>
			</div>

			<div className="editor__container">
				<div className="html__editor">
					<ReactAce
						theme={theme}
						mode="html"
						placeholder="Write your html code"
						fontSize={18}
						setOptions={{
							enableBasicAutocompletion: true,
							enableSnippets: true,
							enableEmmet: true,
						}}
						value={data}
						onChange={(e) => {
							set_data(e);
							console.log(data);
						}}
					/>
				</div>

				<div
					className="html__output"
					dangerouslySetInnerHTML={{ __html: code }}
				></div>
			</div>
		</div>
	);
}

export default App;
