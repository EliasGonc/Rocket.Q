const Database = require("../db/config")

module.exports = {
	async create(req, res) {
		const db = await Database()
		const password = req.body.password
		let roomId = Math.floor(Math.random() * Math.pow(10, 6))

		await db.run(`INSERT INTO rooms (
			id,
			password
		) VALUES (
			${roomId},
			${password}
		)
		`)
		await db.close()
		res.redirect(`/room/${roomId}`)
	}
}