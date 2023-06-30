import Form from "react-bootstrap/Form";

interface CheckGroupProps {
	control: {
		checked: boolean;
		label: string;
		onChange: (event: unknown) => void;
	}[];
	className?: string;
}

export function CheckGroup({ control, className }: CheckGroupProps) {
	return (
		<Form className={className}>
			<label>
				Hide columns
				{control.map((item) => (
					<div key={`checkbox-${item.label}`} className="mb-1">
						<Form.Check type={"checkbox"} {...item} />
					</div>
				))}
			</label>
		</Form>
	);
}

export default CheckGroup;
