export const setStorage = (entries, bin) => {
	const jsonEntries = JSON.stringify(entries);
	localStorage.setItem('Entries', jsonEntries);
	const jsonBin = JSON.stringify(bin);
	localStorage.setItem('Bin', jsonBin);
};
