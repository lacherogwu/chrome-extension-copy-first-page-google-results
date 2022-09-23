const formEl = document.querySelector('form');
const inputEl = document.querySelector('#query');
const feedbackEl = document.querySelector('.feedback');

function copyToClipboard(text) {
	navigator.clipboard.writeText(text);
}

function sleep(ms = 1) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function getResults() {
	const searchContainer = document.querySelector('#search');
	const items = searchContainer.querySelectorAll('.MjjYud');

	const urls = [];
	items.forEach(element => {
		const a = element.querySelector('.yuRUbf a');
		if (!a) return;
		urls.push(a.href);
	});

	return urls;
}

let submitted = false;
async function handleFormSubmit(e) {
	if (submitted || !inputEl.value) return;
	submitted = true;
	feedbackEl.textContent = '';
	e.preventDefault();
	try {
		const tab = await chrome.tabs.create({
			url: `https://www.google.com/search?q=${inputEl.value ?? ''}`,
			active: false,
		});

		await sleep(1000);

		const data = await chrome.scripting.executeScript({
			target: { tabId: tab.id },
			func: getResults,
		});
		await chrome.tabs.remove(tab.id);
		copyToClipboard(data[0].result.join('\n'));
		feedbackEl.textContent = 'copied successfully';
		inputEl.value = '';
	} catch (err) {
		console.log(err);
		feedbackEl.textContent = 'something went wrong';
	}
	submitted = false;
}
formEl.addEventListener('submit', handleFormSubmit);
