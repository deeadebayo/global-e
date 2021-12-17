const getResultsBtn = document.getElementById('getResults')
const resultsTable = document.getElementById('results-table')

let retrievedUsers = []
const getRandomUsers = fetch('https://randomuser.me/api/?results=10')
	.then(res => res.json())
	.then(({ results }) => retrievedUsers.push(...results))
	.catch(err => console.warn(`Here's the error: ${err}`))

const htmlTagMaker = (
	element,
	attribute,
	attributeValue,
	text = false,
	contentText = ''
) => {
	let result = document.createElement(element)
	result.setAttribute(attribute, attributeValue)
	text ? (result.textContent = contentText) : result
	return result
}

getResultsBtn.addEventListener('click', () => {
	let sessionUsers = retrievedUsers?.map(
		({ name: { first, last }, email, picture: { thumbnail } }) => {
			return { first, last, email, thumbnail }
		}
	)

	if (sessionUsers.length > 0) {
		let { first, last, email, thumbnail } =
			sessionUsers[sessionUsers.length - 1]

		let resultsWrapper = htmlTagMaker('div', 'class', 'results__result-item')

		let imageWrapperDetails = htmlTagMaker(
			'div',
			'class',
			'results__result-item__image',
			false
		)

		let personNameDetails = htmlTagMaker(
			'div',
			'class',
			'results__result-item__name',
			true,
			`${first} ${last}`
		)

		let emailDetails = htmlTagMaker(
			'div',
			'class',
			'results__result-item__email',
			true,
			email
		)

		imageWrapperDetails.append(htmlTagMaker('img', 'src', thumbnail))
		resultsWrapper.append(imageWrapperDetails, personNameDetails, emailDetails)
		resultsTable.append(resultsWrapper)
		retrievedUsers.pop()
	} else {
		alert(
			'Random User Generator Jam is actively enhancing our webapp to support more randomly generated users. Come work for us!'
		)
	}
})
