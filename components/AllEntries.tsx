import Svg from './Svg';
import { Textarea } from './Textarea';

export const AllEntries = ({
	entries,
	entryEditing,
	setEditingText,
	setShowEntry,
	submitEdits,
	setEntryEditing,
	deleteEntry,
}) => {
	return (
		<div className={'flex justify-center'}>
			<div className={'w-full overflow-hidden'}>
				<div className={'text-4xl mb-3'}>List of Entries</div>
				{entries.map((Entry) => (
					<div
						key={Entry.id}
						className="Entry hover:bg-yellow-100 transition-all mb-3"
					>
						<div className="Entry-text hover:cursor-pointer">
							{Entry.id === entryEditing ? (
								<textarea
									placeholder="Editing..."
									rows={15}
									className={
										'border focus:border-4 border-gray-800 outline-none resize-none transition-all w-full'
									}
									onChange={(e) => setEditingText(e.target.value)}
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
												<span className={'text-sm'}> (Changed)</span>
											</div>
										) : (
											<div className={'underline'}>{Entry.time}</div>
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
	);
};
