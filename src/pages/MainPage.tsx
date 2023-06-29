//import { css } from "@linaria/core";S
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
import { Table } from "react-bootstrap";

const defaultColumns: ColumnDef<Person>[] = [
	{
		header: "Name",
		footer: (props) => props.column.id,
		columns: [
			{
				accessorKey: "firstName",
				header: "First Name",
				footer: (props) => props.column.id,
			},
			{
				accessorKey: "lastName",
				header: "Last Name",
				footer: (props) => props.column.id,
			},
		],
	},
	{
		header: "Info",
		footer: (props) => props.column.id,
		columns: [
			{
				accessorKey: "age",
				header: () => "Age",
				footer: (props) => props.column.id,
			},
			{
				header: "More Info",
				footer: (props) => props.column.id,
				columns: [
					{
						accessorKey: "visits",
						header: () => "Visits",
						footer: (props) => props.column.id,
					},
					{
						accessorKey: "status",
						header: "Status",
						footer: (props) => props.column.id,
					},
					{
						accessorKey: "progress",
						header: "Profile Progress",
						footer: (props) => props.column.id,
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
		<tr
			ref={previewRef} //previewRef could go here
			style={{ opacity: isDragging ? 0.5 : 1 }}
		>
			<td ref={dropRef}>
				<button ref={dragRef}>🟰</button>
			</td>
			{row.getVisibleCells().map((cell) => (
				<td key={cell.id}>
					{flexRender(cell.column.columnDef.cell, cell.getContext())}
				</td>
			))}
		</tr>
	);
};

export function MainPage() {
	const [columns] = useState(() => [...defaultColumns]);
	const [data, setData] = useState(() => makeData(20));

	const reorderRow = (draggedRowIndex: number, targetRowIndex: number) => {
		data.splice(targetRowIndex, 0, data.splice(draggedRowIndex, 1)[0]);
		setData([...data]);
	};

	const rerender = () => setData(() => makeData(20));

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getRowId: (row) => row.userId, //good to have guaranteed unique row ids/keys for rendering
		debugTable: true,
		debugHeaders: true,
		debugColumns: true,
	});

	return (
		<div className="p-2">
			<div className="h-4" />
			<div className="flex flex-wrap gap-2">
				<button onClick={() => rerender()} className="border p-1">
					Regenerate
				</button>
			</div>
			<div className="h-4" />
			<Table striped bordered hover>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							<th />
							{headerGroup.headers.map((header) => (
								<th key={header.id} colSpan={header.colSpan}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
										  )}
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
				<tfoot>
					{table.getFooterGroups().map((footerGroup) => (
						<tr key={footerGroup.id}>
							<th />
							{footerGroup.headers.map((footer) => (
								<th key={footer.id} colSpan={footer.colSpan}>
									{footer.isPlaceholder
										? null
										: flexRender(
												footer.column.columnDef.footer,
												footer.getContext()
										  )}
								</th>
							))}
						</tr>
					))}
				</tfoot>
			</Table>
		</div>
	);
}

export default MainPage;
