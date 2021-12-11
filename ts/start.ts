import { v4 as uuidv4 } from 'uuid';

const diary = [
	{
		id: uuidv4(),
		text: 'Tutorial #1\n\nThis is my minimalistic diary!\nIt saves all your entries in your local storage.',
		time: new Date(Date.now()).toLocaleString().slice(0, -3),
		changed: false,
		timeOfChange: null,
	},
	{
		id: uuidv4(),
		text: "Tutorial #2\n\nYou can:\n1) Read your entry (book icon)\n2) Start editing your entry (pencil icon)\n3) Delete your entry (bin icon) [You can restore it later if you want!]\n4) Permanently delete your entry (cross icon) [You won't be able to restore it later!]",
		time: new Date(Date.now()).toLocaleString().slice(0, -3),
		changed: false,
		timeOfChange: null,
	},
	{
		id: uuidv4(),
		text: 'Tutorial #3\n\nThere is also newline support as you can see \n\n:)\n',
		time: new Date(Date.now()).toLocaleString().slice(0, -3),
		changed: false,
		timeOfChange: null,
	},
];

const bin = [
	{
		id: uuidv4(),
		text: 'Tutorial #4 \n\nThis is your bin!\nYou can restore your entries or delete them permanently.\nYou can also read your entries from here too.',
		time: new Date(Date.now()).toLocaleString().slice(0, -3),
		changed: false,
		timeOfChange: null,
	},
];

export { diary, bin };
