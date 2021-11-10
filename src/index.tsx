import React from "react";
import ReactDOM from "react-dom";

import { Editor, Overview } from "./pages";

type PAGE = "overview" | "editor";

const App = () => {
	const [page, setPage] = React.useState<PAGE>("overview");
	switch (page) {
		case "overview": return <Overview />;
		case "editor":   return <Editor />;
	}
};

ReactDOM.render(<App />, document.querySelector("#react"));
