import Form from "react-bootstrap/Form";

interface CheckGroupProps {
	control: {
		checked: boolean;
		label: string;
		onChange: (event: unknown) => void;
	}[];
}

export function CheckGroup({ control }: CheckGroupProps) {
	return (
		<Form>
			{control.map((item) => (
				<div key={`checkbox-${item.label}`} className="mb-3">
					<Form.Check type={"checkbox"} {...item} />
				</div>
			))}
		</Form>
	);
}

export default CheckGroup;
