import { PropsWithChildren } from "react";
import { useDrag } from "react-dnd";

type DragElementProps = PropsWithChildren<{
	className?: string;
	type: string;
	index: number;
}>;

export type DragType = {
	type: string;
	index: number;
};

export function DragElement({
	children,
	className = "",
	type,
	index,
}: DragElementProps) {
	const [{ isDragging }, drag] = useDrag({
		type,
		item: { type, index },
		collect: (monitor) => {
			return {
				isDragging: !!monitor.isDragging(),
			};
		},
	});
	return <div ref={drag}>{children}</div>;
}

export default DragElement;
