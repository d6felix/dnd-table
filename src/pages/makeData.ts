import { faker } from "@faker-js/faker";

export type Person = {
	userId: string;
	firstName: string;
	lastName: string;
	age: number;
	visits: number;
	progress: number;
	status: "relationship" | "complicated" | "single";
	subRows?: Person[];
};

const newPerson = (): Person => {
	return {
		userId: faker.string.uuid(),
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		age: faker.number.int(40),
		visits: faker.number.int(1000),
		progress: faker.number.int(100),
		status: faker.helpers.shuffle<Person["status"]>([
			"relationship",
			"complicated",
			"single",
		])[0],
	};
};

export function makeData(length: number): Person[] {
	return Array.from({ length })
		.fill("")
		.map(() => newPerson());
}
