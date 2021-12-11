import Svg from './Svg';

export const Nav = ({ setShowBin, setShowEntry, setShowAllEntries }) => {
	return (
		<nav
			className={
				'mt-10 w-5/12 mx-auto flex justify-evenly border-4 border-gray-800 rounded-full overflow-hidden hover:cursor-pointer'
			}
		>
			<div // Home
				onClick={() => {
					setShowBin(false);
					setShowEntry(false);
					setShowAllEntries(false);
				}}
				className={'flex-grow hover:bg-yellow-100 transition-all'}
			>
				<Svg
					pathD="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
					home={true}
				/>
			</div>
			<div // Показать все записи
				onClick={() => {
					setShowBin(false);
					setShowEntry(false);
					setShowAllEntries(true);
				}}
				className={'flex-grow hover:bg-yellow-300 transition-all'}
			>
				<Svg
					pathD="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
					home={true}
				/>
			</div>
			<div // Корзина
				onClick={() => {
					setShowBin(true);
					setShowEntry(false);
					setShowAllEntries(false);
				}}
				className={'flex-grow hover:bg-gray-300 transition-all'}
			>
				<Svg
					pathD="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
					home={true}
				/>
			</div>
		</nav>
	);
};
