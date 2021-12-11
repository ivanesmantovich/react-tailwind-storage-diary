import React, { useState, useEffect, createContext, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './Header';
import OneEntry from './OneEntry';
import Svg from './Svg';
import * as start from '../ts/start';

export type entryType = {
	id: number;
	text: string;
	time: string;
	changed: boolean;
	timeOfChange: null | string;
};

export const OneEntryContext = createContext<any | undefined>(undefined);

export const Diary = () => {
	const [entries, setEntries] = useState<entryType[]>(start.diary);
	const [entry, setEntry] = useState<string>('');
	const [entryEditing, setEntryEditing] = useState(null);
	const [editingText, setEditingText] = useState<string>('');
	const [bin, setBin] = useState<entryType[]>(start.bin);
	const [showAllEntries, setShowAllEntries] = useState<boolean>(false);
	const [showBin, setShowBin] = useState<boolean>(false);
	const [showEntry, setShowEntry] = useState<entryType | false>(false);

	useEffect(() => {
		const jsonEntries = localStorage.getItem('Entries');
		const jsonBin = localStorage.getItem('Bin');
		const loadedEntries = JSON.parse(jsonEntries);
		if (loadedEntries) {
			setEntries(loadedEntries);
		}
		const loadedBin = JSON.parse(jsonBin);
		if (loadedBin) {
			setBin(loadedBin);
		}
	}, []);

	useEffect(() => {
		const jsonEntries = JSON.stringify(entries);
		localStorage.setItem('Entries', jsonEntries);
		const jsonBin = JSON.stringify(bin);
		localStorage.setItem('Bin', jsonBin);
	}, [entries, bin]);

	function handleSubmit(e) {
		e.preventDefault();
		if (entry == '') return;

		const newEntry: entryType = {
			id: uuidv4(),
			text: entry,
			time: new Date(Date.now()).toLocaleString().slice(0, -3),
			changed: false,
			timeOfChange: null,
		};
		setEntries([...entries].concat(newEntry));
		setEntry('');
	}

	function deleteEntry(id) {
		setBin([...bin].concat([...entries].filter((entry) => entry.id === id)));
		setEntries([...entries].filter((entry) => entry.id !== id));
	}

	function restoreEntry(id) {
		setEntries(
			[...entries].concat([...bin].filter((entry) => entry.id === id))
		);
		setBin([...bin].filter((entry) => entry.id !== id));
	}

	function shredEntry(id) {
		setBin([...bin].filter((entry) => entry.id !== id));
	}

	function submitEdits(id) {
		const updatedEntries = [...entries].map((Entry) => {
			if (Entry.id === id) {
				Entry.text = editingText;
				Entry.changed = true;
				Entry.timeOfChange = new Date(Date.now()).toLocaleString().slice(0, -3);
			}
			return Entry;
		});
		setEntries(updatedEntries);
		setEntryEditing(null);
	}

	const value = { showEntry, setShowEntry };

	return (
		<div className={'mb-10'}>
			{/*Main приложение*/}
			<main
				className={
					'mx-auto mt-10 w-11/12 px-8 py-4 shadow-md bg-yellow-50 box-border '
				}
			>
				<Header />
				{/*Просмотр одной заметки*/}
				{showEntry ? (
					<OneEntryContext.Provider value={value}>
						<OneEntry entry={showEntry} />
					</OneEntryContext.Provider>
				) : (
					<div>
						{showBin ? (
							//  Корзина
							<div className={'flex justify-center'}>
								<div className={'w-full overflow-hidden'}>
									<div className={'text-4xl mb-3'}>Bin</div>
									{bin.map((Entry) => (
										<div
											key={Entry.id}
											className="Entry hover:bg-yellow-100 transition-all mb-3"
										>
											<div className="Entry-text">
												<div>
													<div>
														{Entry.changed ? (
															<div>
																<span className={'underline'}>
																	{Entry.timeOfChange}
																</span>
																<span className={'text-sm'}> (Changed)</span>
															</div>
														) : (
															<div className={'underline'}>{Entry.time}</div>
														)}
													</div>
													<div
														onClick={() => {
															setShowEntry(Entry);
														}}
													>
														{Entry.text}
													</div>
												</div>
											</div>
											<div className="Entry-actions flex justify-evenly">
												{/*Прочитать*/}
												{Entry.id === entryEditing ? (
													<></>
												) : (
													<Svg
														runOnClick={setShowEntry}
														onClickArg={Entry}
														pathD="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
													/>
												)}
												{/*Восстановить запись*/}
												{Entry.id === entryEditing ? (
													<></>
												) : (
													<Svg
														runOnClick={restoreEntry}
														onClickArg={Entry.id}
														pathD="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
													/>
												)}
												{/*Окончательно удалить запись*/}
												{Entry.id === entryEditing ? (
													<></>
												) : (
													<Svg
														runOnClick={shredEntry}
														onClickArg={Entry.id}
														pathD="M6 18L18 6M6 6l12 12"
													/>
												)}
											</div>
										</div>
									))}
								</div>
							</div>
						) : (
							// Корзина
							<div>
								{showAllEntries ? (
									// Список всех записей
									<div>
										<div className={'flex justify-center'}>
											<div className={'w-full overflow-hidden'}>
												<div className={'text-4xl mb-3'}>List of Entries</div>
												{entries.map((Entry) => (
													<div
														key={Entry.id}
														className="Entry hover:bg-yellow-100 transition-all mb-3"
													>
														<div className="Entry-text">
															{Entry.id === entryEditing ? (
																<textarea
																	placeholder="Editing..."
																	rows={15}
																	className={
																		'border focus:border-4 border-gray-800 outline-none resize-none transition-all w-full'
																	}
																	onChange={(e) =>
																		setEditingText(e.target.value)
																	}
																	defaultValue={Entry.text}
																/>
															) : (
																<div
																	onClick={() => {
																		setShowEntry(Entry);
																	}}
																>
																	<div>
																		{Entry.changed ? (
																			<div>
																				<span className={'underline'}>
																					{Entry.timeOfChange}
																				</span>
																				<span className={'text-sm'}>
																					{' '}
																					(Changed)
																				</span>
																			</div>
																		) : (
																			<div className={'underline'}>
																				{Entry.time}
																			</div>
																		)}
																	</div>
																	<div>{Entry.text}</div>
																</div>
															)}
														</div>
														<div className="Entry-actions flex justify-evenly">
															{/*Прочитать*/}
															{Entry.id === entryEditing ? (
																<></>
															) : (
																<Svg
																	runOnClick={setShowEntry}
																	onClickArg={Entry}
																	pathD="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
																/>
															)}
															{/*Отредактировать запись*/}
															{Entry.id === entryEditing ? (
																<Svg
																	runOnClick={submitEdits}
																	onClickArg={Entry.id}
																	pathD="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
																/>
															) : (
																<Svg
																	runOnClick={setEntryEditing}
																	onClickArg={Entry.id}
																	secondRunOnClick={setEditingText}
																	secondOnClickArg={Entry.text}
																	pathD="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
																/>
															)}
															{/*Отменить изменения*/}
															{Entry.id === entryEditing ? (
																<Svg
																	runOnClick={setEntryEditing}
																	onClickArg={null}
																	pathD="M10 19l-7-7m0 0l7-7m-7 7h18"
																/>
															) : (
																<></>
															)}
															{/*Удалить запись*/}
															{Entry.id === entryEditing ? (
																<></>
															) : (
																<Svg
																	runOnClick={deleteEntry}
																	onClickArg={Entry.id}
																	pathD="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
																/>
															)}
														</div>
													</div>
												))}
											</div>
										</div>
									</div>
								) : (
									// Список всех записей
									// Home
									<div>
										<div className={'lg:grid lg:grid-cols-10 mt-10'}>
											<form className={'lg:col-span-6'} onSubmit={handleSubmit}>
												<textarea
													id={'newEntry'}
													placeholder="Remember, be nice!"
													rows={15}
													className={
														'lg:w-10/12 w-full border focus:border-4 border-gray-800 outline-none resize-none transition-all'
													}
													onChange={(e) => setEntry(e.target.value)}
													value={entry}
												/>
												<div>
													<button
														className={
															'blinkingUnderline text-2xl hover:text-3xl'
														}
														type="submit"
													>
														Write an Entry
													</button>
												</div>
											</form>
											<div className={'flex justify-center lg:col-span-4'}>
												<div className={'w-full overflow-hidden'}>
													<div
														className={'text-4xl lg:mt-0 lg:mb-3 mt-10 mb-3'}
													>
														Last three entries
													</div>
													{entries.slice(-3).map((Entry) => (
														<div
															key={Entry.id}
															className="Entry hover:bg-yellow-100 transition-all mb-3 hover:cursor-pointer"
														>
															<div className="Entry-text">
																{Entry.id === entryEditing ? (
																	<textarea
																		placeholder="Editing..."
																		rows={15}
																		className={
																			'border focus:border-4 border-gray-800 outline-none resize-none transition-all w-full'
																		}
																		onChange={(e) =>
																			setEditingText(e.target.value)
																		}
																		defaultValue={Entry.text}
																	/>
																) : (
																	<div
																		onClick={() => {
																			setShowEntry(Entry);
																		}}
																	>
																		<div>
																			{Entry.changed ? (
																				<div>
																					<span className={'underline'}>
																						{Entry.timeOfChange}
																					</span>
																					<span className={'text-sm'}>
																						{' '}
																						(Changed)
																					</span>
																				</div>
																			) : (
																				<div className={'underline'}>
																					{Entry.time}
																				</div>
																			)}
																		</div>
																		<div>{Entry.text}</div>
																	</div>
																)}
															</div>
															<div className="Entry-actions flex justify-evenly">
																{/*Прочитать*/}
																{Entry.id === entryEditing ? (
																	<></>
																) : (
																	<Svg
																		runOnClick={setShowEntry}
																		onClickArg={Entry}
																		pathD="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
																	/>
																)}
																{/*Отредактировать*/}
																{Entry.id === entryEditing ? (
																	<Svg
																		runOnClick={submitEdits}
																		onClickArg={Entry.id}
																		pathD="M5 13l4 4L19 7"
																	/>
																) : (
																	<Svg
																		runOnClick={setEntryEditing}
																		onClickArg={Entry.id}
																		secondRunOnClick={setEditingText}
																		secondOnClickArg={Entry.text}
																		pathD="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
																	/>
																)}
																{/*Отменить изменения*/}
																{Entry.id === entryEditing ? (
																	<Svg
																		runOnClick={setEntryEditing}
																		onClickArg={null}
																		pathD="M10 19l-7-7m0 0l7-7m-7 7h18"
																	/>
																) : (
																	<></>
																)}
																{/*Удалить запись*/}
																{Entry.id === entryEditing ? (
																	<></>
																) : (
																	<Svg
																		runOnClick={deleteEntry}
																		onClickArg={Entry.id}
																		pathD="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
																	/>
																)}
															</div>
														</div>
													))}
												</div>
											</div>
										</div>
									</div>
									// Home
								)}
							</div>
						)}
					</div>
				)}
				{/*Запись или список записей/корзина*/}
			</main>
			{/*Main приложение*/}
			{/*Nav приложение*/}
			<nav
				className={
					'mt-10 w-5/12 mx-auto flex justify-evenly border-4 border-gray-800 rounded-full overflow-hidden hover:cursor-pointer'
				}
			>
				{/*Home*/}
				<div
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
				{/*Home*/}
				{/*Показать все записи*/}
				<div
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
				{/*Показать все записи*/}
				{/*Корзина*/}
				<div
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
				{/*Корзина*/}
			</nav>
			{/*Nav приложение*/}
		</div>
	);
};
