const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: (req, file, cb) => {
        const fileName = req.body.name
        cb(null, fileName);
    }
})

const upload = multer({ storage: storage })
module.exports = upload