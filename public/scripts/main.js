import Modal from './modal.js'

const modal = Modal()
const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalConfirmButton = document.querySelector('.modal .buttons button')

const checkButtons = document.querySelectorAll(".actions a.check")

checkButtons.forEach(checkButton => {
	checkButton.addEventListener("click", handleClick)
});

const deleteButtons = document.querySelectorAll(".actions a.delete")

deleteButtons.forEach(deleteButton => {
	deleteButton.addEventListener("click", (event) => handleClick(event, false))
})

function handleClick(event, check = true) {
	event.preventDefault()
	const text = check ? "Marcar como lida" : "Excluir"
	const slug = check ? "check" : "delete"
	const roomId = document.querySelector("#room-id").dataset.id
	const questionId = event.target.dataset.id

	const form = document.querySelector(".modal form")
	form.setAttribute("action", `/room/${roomId}/${questionId}/${slug}`)

	modalTitle.innerHTML = text
	modalDescription.innerHTML = `Tem certeza que deseja ${text.toLowerCase()} esta pergunta?`
	modalConfirmButton.innerHTML = `Sim, ${text.toLowerCase()}`
	check ? modalConfirmButton.classList.remove("red")
		  : modalConfirmButton.classList.add("red")
	modal.open()
}