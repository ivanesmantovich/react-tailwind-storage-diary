export const fetchStorage = (setEntries, setBin) => {
	const jsonEntries = localStorage.getItem('Entries');
	const jsonBin = localStorage.getItem('Bin');
	const loadedEntries = JSON.parse(jsonEntries);
	const loadedBin = JSON.parse(jsonBin);
	if (loadedEntries) setEntries(loadedEntries);
	if (loadedBin) setBin(loadedBin);
};
