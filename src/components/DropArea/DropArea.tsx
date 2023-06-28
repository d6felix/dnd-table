import { useDrop } from "react-dnd";
import { DragType } from "~components/DragElement/DragElement";
import classNames from "classnames";
import { PropsWithChildren } from "react";

type DropAreaProps = PropsWithChildren<{
	type: string;
	indexDropArea: number;
}>;

export const DropArea = ({ children, type, indexDropArea }: DropAreaProps) => {
	const [collectedProps, drop] = useDrop({
		accept: [],
		drop: (item: DragType, monitor) => {},
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
		}),
	});

	return (
		<div ref={drop} className={classNames("drop__area")}>
			{children}
		</div>
	);
};

export default DropArea;
