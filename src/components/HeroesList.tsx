import { useEffect, useRef, useState } from 'react';
import type { Hero } from '../types/hero';
import { Link } from 'react-router-dom';
import { useMessages } from '../context/MessageContext';

const apiUrl = import.meta.env.VITE_API_URL;

const HeroesList = () => {
	const [heroes, setHeroes] = useState<Hero[]>([]);
	const { addMessage } = useMessages();

	const fetched = useRef(false);

	useEffect(() => {
		if (!fetched.current) {
			fetch(`${apiUrl}/heroes`)
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					setHeroes(data);
					addMessage('Heroes loaded');
				});
			fetched.current = true;
		}
	}, [addMessage]);

	return (
		<>
			<div className='flex gap-3'>
				<h2 className='text-2xl'>My heroes</h2>
				<Link to='/heroes/create' className='btn'>
					Create new
				</Link>
			</div>
			<ul className='flex flex-col gap-2 my-3'>
				{heroes.map((hero) => (
					<Link
						key={hero.id}
						className='flex cursor-pointer'
						to={`/heroes/${hero.id}`}
					>
						<span className='bg-slate-700 text-white rounded-l p-2'>
							{hero.id}
						</span>
						<span className='p-2 bl-slate-300 rounded-r w-full'>
							{hero.name}
						</span>
					</Link>
				))}
			</ul>
		</>
	);
};

export default HeroesList;
