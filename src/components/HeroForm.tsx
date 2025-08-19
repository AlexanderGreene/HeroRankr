import type { FormEvent } from 'react';
import { useMessages } from '../context/MessageContext';
import type { Hero } from '../types/hero';
import { useNavigate } from 'react-router-dom';

type Props = {
	hero?: Hero;
	setHero?: (hero: Hero) => void;
};

const apiUrl = import.meta.env.VITE_API_URL;

const HeroForm = ({ hero, setHero }: Props) => {
	const { addMessage } = useMessages();
	const navigate = useNavigate();

	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const url = hero ? `${apiUrl}/heroes/${hero.id}` : `${apiUrl}/heroes`;
		const method = hero ? 'PUT' : 'POST';

		try {
			const response = await fetch(url, {
				method,
				body: JSON.stringify({ name: formData.get('name') }),
			});

			if (!response.ok)
				throw new Error('Request failed: ' + response.statusText);

			const data = await response.json();
			const message = hero
				? `Hero ${hero.name} updated to ${data.name}`
				: `Hero ${data.name} created`;
			addMessage(message);
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			hero && setHero ? setHero(data) : navigate(`/heroes/${data.id}`);
		} catch (error) {
			console.error(error);
			addMessage('Failed to update hero');
		}
	};
	return (
		<div className='mt-3'>
			<h2 className='text-2xl'>{hero ? 'Edit Hero' : 'Create Hero'}</h2>
			<form onSubmit={onSubmit}>
				<label>Hero name</label>
				<div className='flex gap-3'>
					<input
						type='text'
						placeholder='name'
						className='border border-gray-300 rounded-lg p-2 w-1/4'
						defaultValue={hero?.name || ''}
						name='name'
					/>
					<button type='submit' className='btn'>
						{hero ? 'Update' : 'Create'}
					</button>
				</div>
			</form>
		</div>
	);
};

export default HeroForm;
