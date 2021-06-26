const Database = require('../db/config')

module.exports = {
	async index(req, res) {
		const db = await Database()
		const roomId = req.params.room
		const questionId = req.params.question
		const action = req.params.action
		const password = req.body.questionPassword

		const sql = "SELECT password FROM rooms WHERE id = ?"
		const correctPassword = await db.get(sql, [roomId])
		if(password == correctPassword.password) {
			if(action == "check") {
				const readSql = "UPDATE questions SET is_read = 1 WHERE id = ?"
				await db.run(readSql, [questionId])
			} else if(action == "delete") {
				const deleteSql = "DELETE FROM questions WHERE id = ?"
				await db.run(deleteSql, [questionId])
			}
			res.redirect(`/room/${roomId}`)
		} else {
			res.render('incorrect-password', {roomId: roomId})
		}
		// console.log(`room = ${roomId}, questionId = ${questionId}, action = ${action}, password = ${password}, correctPassword = ${correctPassword}`)
	},

	async create(req, res) {
		const db = await Database()
		const question = req.body.newQuestion
		const roomId = req.params.room

		await db.run(`
			INSERT INTO questions(
				room,
				content,
				is_read
			) VALUES (
				${roomId},
				"${question}",
				0
			)
		`)

		res.redirect(`/room/${roomId}`)
	}
}