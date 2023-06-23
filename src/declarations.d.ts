declare module "*.svg" {
	export const ReactComponent: string;
	export default ReactComponent;
}

declare module "*.scss" {
	const content: Record<string, string>;
	export default content;
}
