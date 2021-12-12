import Svg from './Svg';
export const Bin = ({
	bin,
	setShowEntry,
	entryEditing,
	restoreEntry,
	shredEntry,
}) => {
	return (
		<div className={'flex justify-center'}>
			<div className={'w-full overflow-hidden'}>
				<div className={'text-4xl mb-3'}>Bin</div>
				{bin.map((Entry) => (
					<div
						key={Entry.id}
						className="Entry hover:bg-yellow-100 transition-all mb-3"
					>
						<div className="Entry-text hover:cursor-pointer">
							<div>
								<div>
									{Entry.changed ? (
										<div>
											<span className={'underline'}>{Entry.timeOfChange}</span>
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
	);
};
