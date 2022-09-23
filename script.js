const formEl = document.querySelector('form');
const inputEl = document.querySelector('#query');

async function getResults() {
	const containerEl = document.querySelector('#rso');

	const allEls = containerEl.querySelectorAll('div link[rel=prerender]');
	console.log(allEls);
	console.log(containerEl);

	return ['cook', 'cook'];
}

async function handleFormSubmit(e) {
	e.preventDefault();

	const tab = await chrome.tabs.create({
		url: `https://www.google.com/search?q=${inputEl.value ?? ''}`,
	});

	console.log(tab);
	await new Promise(resolve => setTimeout(resolve, 2000));
	// await new Promise(resolve => setTimeout(resolve, 2000));
	const data = await chrome.scripting.executeScript({
		target: { tabId: tab.id },
		func: getResults,
	});
	console.log(data);
}
formEl.addEventListener('submit', handleFormSubmit);
