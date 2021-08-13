import fs from 'fs'
import path from 'path'
export default class {
	constructor (req, res) {
		this.req = req
		this.res = res

		this.res.json = function (jsonObject) {
			this.writeHead(200, { 'Content-Type': 'application/json' })
			this.write( jsonObject )
			return this.end()
		}

		this.res.render = function (htmlName) {
			this.writeHeader(200, {'Content-Type' : 'text/html'})
			this.write(
				fs.readFileSync(path.join(process.cwd(), 'views', htmlName + '.html'))
			)
			return this.end()
		}

	}

	get (path, callback) {
		if(this.req.url.toLowerCase() === path.toLowerCase() && this.req.method.toUpperCase() === 'GET') {
			return callback(this.req, this.res)
		}
	}

	post (path, callback) {
		if(this.req.url.toLowerCase() === path.toLowerCase() && this.req.method.toUpperCase() === 'POST') {
			return callback(this.req, this.res)
		}
	}

	put (path, callback) {
		if(this.req.url.toLowerCase() === path.toLowerCase() && this.req.method.toUpperCase() === 'PUT') {
			return callback(this.req, this.res)
		}
	}

	delete (path, callback) {
		if(this.req.url.toLowerCase() === path.toLowerCase() && this.req.method.toUpperCase() === 'DELETE') {
			return callback(this.req, this.res)
		}
	}
	static (folderName) {
		let extname = path.extname(this.req.url).toLowerCase()
		if(!extname) return
		let contentTypes = {
			  '.html': 'text/html',
			  '.js': 'text/javascript',
			  '.css': 'text/css',
			  '.json': 'application/json',
			  '.png': 'image/png',
			  '.jpg': 'image/jpg',
			  '.gif': 'image/gif',
			  '.svg': 'image/svg+xml',
			  '.wav': 'audio/wav',
			  '.mp4': 'video/mp4',
			  '.woff': 'application/font-woff',
			  '.ttf': 'application/font-ttf',
			  '.eot': 'application/vnd.ms-fontobject',
			  '.otf': 'application/font-otf',
			  '.wasm': 'application/wasm'
		  }
		let contentType = contentTypes[extname] || 'application/octet-stream'
	
		try {
		  let buffer = fs.readFileSync( path.join(process.cwd(), folderName, this.req.url ) )
		  this.res.writeHead(200, { 'Content-Type': contentType })
		  this.res.write(buffer)
		  return this.res.end()
		} catch(error) {
		  this.res.writeHead(404)
		  this.res.write(error.message)
		  return this.res.end()
		}
	  }
	

}

