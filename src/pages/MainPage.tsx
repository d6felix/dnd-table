import { css } from "@linaria/core";

// Write your styles in `css` tag
const textTest = css`
	color: red;
	font-size: 40px;
	font-weight: 500;
	margin: 30px 60px;
`;

export function MainPage() {
	return <div className={textTest}>text</div>;
}

export default MainPage;
