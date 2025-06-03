import { useEffect, useState } from 'react';

export default function Commands() {
	const [data, setData] = useState([]);
	useEffect(() => {
		fetch('commands.json')
			.then((res) => res.json())
			.then((d) => setData(d));
	}, []);
	return (
		<>
			<div className="flex pt-6 items-center justify-center w-full px-4  bg-secondary">
				<div className="mx-auto mb-[60px] max-w-[510px] text-center">
					<h2 className="text-3xl font-bold leading-[1.2] sm:text-4xl md-text-[40px]">Bot Commands</h2>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 bg-secondary gap-2 md:gap-4 lg:gap-8 px-4 lg:px-24">
				{data.map((category) => (
					<table className="table text-white border animate-fade-down" key={category.category}>
						<caption className="text-2xl font-bold text-primary">{category.category}</caption>
						<thead className="text-white border-white">
							<tr className="border-white">
								<th>Name</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
							{category.commands.map((command) => (
								<tr className="border-white" key={command.name}>
									<td>{command.name}</td>
									<td>{command.description}</td>
								</tr>
							))}
						</tbody>
					</table>
				))}
			</div>
		</>
	);
}
