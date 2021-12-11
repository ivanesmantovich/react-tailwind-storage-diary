export const Textarea = ({setEditingText, Entry}) => {
	return (
		<textarea
			placeholder="Editing..."
			rows={15}
			className={
				'border focus:border-4 border-gray-800 outline-none resize-none transition-all w-full'
			}
			onChange={(e) => setEditingText(e.target.value)}
			defaultValue={Entry.text}
		/>
	);
};
