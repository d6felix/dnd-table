import { css } from "@linaria/core";

import {
	ColumnDef,
	Row,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { makeData, Person } from "./makeData";
import { useDrag, useDrop } from "react-dnd";
import { Button, Table } from "react-bootstrap";
import { CheckGroup } from "~components/CheckGroup";

const resizer = css`
	position: absolute;
	right: 0;
	top: 0;
	height: 100%;
	width: 5px;
	background: rgba(0, 0, 0, 0.5);
	cursor: col-resize;
	user-select: none;
	touch-action: none;
	opacity: 0.5;
`;

const th = css`
	background-color: unset !important;
	position: relative;
	text-align: center;
	height: 30px;
`;

const defaultColumns: ColumnDef<Person>[] = [
	{
		accessorKey: "name",
		header: "Name",
		columns: [
			{
				accessorKey: "firstName",
				header: "First Name",
			},
			{
				accessorKey: "lastName",
				header: "Last Name",
			},
		],
	},
	{
		accessorKey: "info",
		header: "Info",
		columns: [
			{
				accessorKey: "age",
				header: "Age",
			},
			{
				header: "More Info",
				columns: [
					{
						accessorKey: "visits",
						header: "Visits",
					},
					{
						accessorKey: "status",
						header: "Status",
					},
					{
						accessorKey: "progress",
						header: "Profile Progress",
					},
				],
			},
		],
	},
];

interface DraggableRowProps {
	row: Row<Person>;
	reorderRow: (draggedRowIndex: number, targetRowIndex: number) => void;
}

const DraggableRow = ({ row, reorderRow }: DraggableRowProps) => {
	const [, dropRef] = useDrop({
		accept: "row",
		drop: (draggedRow: Row<Person>) => reorderRow(draggedRow.index, row.index),
	});

	const [{ isDragging }, dragRef, previewRef] = useDrag({
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
		item: () => row,
		type: "row",
	});

	return (
		<tr ref={previewRef} style={{ opacity: isDragging ? 0.5 : 1 }}>
			<td ref={dropRef}>
				<button ref={dragRef}>🟰</button>
			</td>
			{row.getVisibleCells().map((cell) => (
				<td
					key={cell.id}
					style={{
						width: cell.column.getSize(),
					}}
				>
					{flexRender(cell.column.columnDef.cell, cell.getContext())}
				</td>
			))}
		</tr>
	);
};

export function MainPage() {
	const [columns] = useState(defaultColumns);
	const [data, setData] = useState(makeData(20));
	const [columnVisibility, setColumnVisibility] = useState({});

	const reorderRow = (draggedRowIndex: number, targetRowIndex: number) => {
		data.splice(targetRowIndex, 0, data.splice(draggedRowIndex, 1)[0]);
		setData([...data]);
	};

	const rerender = () => setData(makeData(20));

	const table = useReactTable({
		data,
		columns,
		columnResizeMode: "onChange",
		state: {
			columnVisibility,
		},
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getRowId: (row) => row.userId,
		debugTable: true,
		debugHeaders: true,
		debugColumns: true,
	});

	const checkGroupProps = table.getAllLeafColumns().map((column) => {
		return {
			checked: column.getIsVisible(),
			label: column.id,
			onChange: column.getToggleVisibilityHandler(),
		};
	});

	return (
		<div className="p-2 m-4 d-flex flex-column justify-content-center align-items-center mw-100">
			<h1>Table with fake data</h1>
			<div className="d-flex flex-row gap-4 mb-5">
				<Button onClick={rerender} className="border p-4 h-25">
					Regenerate
				</Button>
				<CheckGroup className="p-0" control={checkGroupProps}></CheckGroup>
			</div>
			<Table
				className="mw-100"
				striped
				bordered
				hover
				style={{
					width: table.getCenterTotalSize(),
				}}
			>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							<th />
							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									colSpan={header.colSpan}
									className={th}
									style={{
										width: header.getSize(),
									}}
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
										  )}
									<div
										{...{
											onMouseDown: header.getResizeHandler(),
											onTouchStart: header.getResizeHandler(),
											className: `${resizer}`,
										}}
									/>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<DraggableRow key={row.id} row={row} reorderRow={reorderRow} />
					))}
				</tbody>
			</Table>
		</div>
	);
}

export default MainPage;
