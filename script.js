const formEl = document.querySelector('form');
const inputEl = document.querySelector('#query');

function sleep(ms = 1) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function getResults() {
	for (let i = 0; i < 10000; i++) {
		console.log('something' + i);
	}
	return ['cook', 'cook'];
	const containerEl = document.querySelector('#rso');

	const allEls = containerEl.querySelectorAll('div link[rel=prerender]');
	console.log(allEls);
	console.log(containerEl);
}

async function handleFormSubmit(e) {
	e.preventDefault();

	const tab = await chrome.tabs.create({
		url: `https://www.google.com/search?q=${inputEl.value ?? ''}`,
	});

	await sleep();

	const data = await chrome.scripting.executeScript({
		target: { tabId: tab.id },
		func: getResults,
	});
	console.log(data[0].result);
}
formEl.addEventListener('submit', handleFormSubmit);
