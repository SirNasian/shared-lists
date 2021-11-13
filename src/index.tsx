import React from "react";
import ReactDOM from "react-dom";
import { Box, Container, Divider, Paper, Typography } from "@mui/material";
import { Editor, Overview } from "./pages";

type PAGE = "overview" | "editor";

const Page = ({ page }: { page: PAGE }) => {
	switch (page) {
		case "overview": return <Overview />;
		case "editor":   return <Editor />;
	}
};

const calculatePageViewHeight = (): string => {
	const titleElement = document.getElementById("title");
	const titleHeight = titleElement ? titleElement.clientHeight : 0;
	return `calc(100vh - (${titleHeight}px + 56px))`; // TODO: calculate the magic 56px (margins and padding)
};

// TODO: find a better way to do this
const getBodyWidth = (): number => document.getElementsByTagName("body")[0].clientWidth;

const ContentWrapper = ({
	children,
	smallDevice,
} : {
	children: any; // TODO: specify the correct type here
	smallDevice: boolean;
}) => smallDevice ? (
	<React.Fragment>
		{children}
	</React.Fragment>
) : (
	<Container maxWidth="sm">
		<Paper>
			{children}
		</Paper>
	</Container>
);

const App = () => {
	const [title, setTitle] = React.useState<string>("Shared Lists");
	const [page, setPage] = React.useState<PAGE>("overview");
	const [pageHeight, setPageHeight] = React.useState<string>(calculatePageViewHeight());
	const [bodyWidth, setBodyWidth] = React.useState<number>(getBodyWidth());

	React.useEffect(() => {
		setPageHeight(calculatePageViewHeight());
		setBodyWidth(getBodyWidth()); // TODO: ideally this should be called on resize
	}, []);

	return (
		<Box display="flex" flexDirection="column" height="calc(100vh - 16px)" justifyContent="center">
			<ContentWrapper smallDevice={bodyWidth < 600}>
				<Box p={1}>
					<Typography id="title" variant="h4" align="center">{title}</Typography>
					<Divider />
					<Box maxHeight={pageHeight} overflow="scroll" mt={1}>
						<Page page={page} />
					</Box>
				</Box>
			</ContentWrapper>
		</Box>
	);
};

ReactDOM.render(<App />, document.querySelector("#react"));
