import { useState, useEffect } from 'react';
import Header from './Header';
import OneEntry from './OneEntry';
import { Bin } from './Bin';
import { AllEntries } from './AllEntries';
import { Home } from './Home';
import { Nav } from './Nav';
import * as start from '../ts/start';
import type { entryType } from '../types/entryType';
import { v4 as uuidv4 } from 'uuid';
import { fetchStorage } from '../ts/fetchStorage';
import { setStorage } from '../ts/setStorage';

export const Diary = () => {
	const [entries, setEntries] = useState<entryType[]>(start.diary);
	const [entry, setEntry] = useState<string>('');
	const [entryEditing, setEntryEditing] = useState(null);
	const [editingText, setEditingText] = useState<string>('');
	const [bin, setBin] = useState<entryType[]>(start.bin);
	const [showAllEntries, setShowAllEntries] = useState<boolean>(false);
	const [showBin, setShowBin] = useState<boolean>(false);
	const [showEntry, setShowEntry] = useState<entryType | false>(false);

	useEffect(() => fetchStorage(setEntries, setBin), []);
	useEffect(() => setStorage(entries, bin), [entries, bin]);

	function handleSubmit() {
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

	return (
		<div className={'mb-10'}>
			<main
				className={
					'mx-auto mt-10 w-11/12 px-8 py-4 shadow-md bg-yellow-50 box-border '
				}
			>
				<Header />
				{showEntry ? ( // Просмотр одной заметки
					<OneEntry
						entry={showEntry}
						showEntry={showEntry}
						setShowEntry={setShowEntry}
					/>
				) : (
					<div>
						{showBin ? (
							<Bin
								bin={bin}
								setShowEntry={setShowEntry}
								entryEditing={entryEditing}
								restoreEntry={restoreEntry}
								shredEntry={shredEntry}
							/>
						) : (
							<div>
								{showAllEntries ? (
									<AllEntries // Просмотр всех заметок
										entries={entries}
										entryEditing={entryEditing}
										setEditingText={setEditingText}
										setShowEntry={setShowEntry}
										deleteEntry={deleteEntry}
										setEntryEditing={setEntryEditing}
										submitEdits={submitEdits}
									/>
								) : (
									<Home // Просмотр последних трех заметок
										entry={entry}
										entries={entries}
										setEntry={setEntry}
										deleteEntry={deleteEntry}
										entryEditing={entryEditing}
										handleSubmit={handleSubmit}
										setEditingText={setEditingText}
										setEntryEditing={setEntryEditing}
										setShowEntry={setShowEntry}
										submitEdits={submitEdits}
									/>
								)}
							</div>
						)}
					</div>
				)}
			</main>
			<Nav
				setShowBin={setShowBin}
				setShowEntry={setShowEntry}
				setShowAllEntries={setShowAllEntries}
			/>
		</div>
	);
};
