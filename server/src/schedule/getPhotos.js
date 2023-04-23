const schedule = require('node-schedule')



const getPhotos = schedule.scheduleJob('0 21 * * *', async function(){
    const db = require('./db/connection')
    const axios = require('axios')

    try {
		let photos = await axios({
			method: 'get',
			url: 'https://api.pexels.com/v1/search?query=cat&orientation=square',
			headers: {
				'Authorization': 'uyvEjCA3TR1PdonVGWqK9ZeS0baA0UCTcEzdWueaTfm8bSTtWoE7AjFp'
			}
		}).then(data => data.data.photos)

		let queryToInsertPhotos = ''

		photos.forEach(photo => {
			if(photo.alt.includes("'")) photo.alt = photo.alt.replace("'", "")
			if(photo.src.original.includes("'")) photo.src.original =  photo.src.original.replace("'", "")
			if(photo.src.tiny.includes("'")) photo.src.tiny = photo.src.tiny.replace("'", "")
			if(photo.photographer.includes("'")) photo.photographer = photo.photographer.replace("'", "")
			if(photo.photographer_url.includes("'")) photo.photographer_url = photo.photographer_url.replace("'", "")
			if(photo.url.includes("'")) photo.url = photo.url.replace("'", "")

			if(queryToInsertPhotos.length) queryToInsertPhotos = queryToInsertPhotos + ', '
			let query = `('${photo.alt}', '${photo.src.original}', '${photo.src.tiny}', '${photo.photographer}', '${photo.photographer_url}', '${photo.url}')`
			queryToInsertPhotos = queryToInsertPhotos + query
		});

		const connection = await db.connectToDatabase()
		await connection.execute(
			`INSERT INTO photos (title, url, tiny_url, photographer, photographer_url, website)
			VALUES ${queryToInsertPhotos}`
		)
		.then(data => data[0])
		.catch(error => { throw new Error(error.message) })

		return res.status(201)
	} catch (error) {
		return res.status(500).json(error.message)
	}
})


module.exports = {
    getPhotos
} 