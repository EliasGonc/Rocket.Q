const Database = require("../db/config")

module.exports = {
	async create(req, res) {
		const db = await Database()
		const password = req.body.password
		let roomId, roomIdExists;
		const sql = "SELECT id FROM rooms WHERE id = ?"

		do {
			roomIdExists = [];
			roomId = Math.floor(Math.random() * Math.pow(10, 6))
			roomIdExists = await db.each(sql, [roomId], (err, row) => {
				if(err) {
					throw err;
				}
				return(true)
			})
		} while(roomIdExists);

		await db.run(`INSERT INTO rooms (
			id,
			password
		) VALUES (
			${roomId},
			'${password}'
		)
		`)
		await db.close()
		res.redirect(`/room/${roomId}`)
	},

	async open(req, res) {
		const db = await Database()
		const roomId = req.params.room
		const unreadQuestionsSql = "SELECT * FROM questions WHERE room = ? AND is_read = 0"
		const readQuestionsSql = "SELECT * FROM questions WHERE room = ? AND is_read = 1"
		const unreadQuestions = await db.all(unreadQuestionsSql, [roomId])
		const readQuestions = await db.all(readQuestionsSql, [roomId])
		let noQuestions = false
		if(readQuestions.length == 0 && unreadQuestions.length == 0) {
			noQuestions = true
		}

		res.render("room", {roomId: roomId, unreadQuestions: unreadQuestions, readQuestions: readQuestions, noQuestions: noQuestions})
	},

	enter(req, res) {
		const roomId = req.body.roomId
		res.redirect(`/room/${roomId}`)
	}
		
}