exports.getPosts = (req, res, next) => {
    res.status(200).json([ // 200 - OK
        { id: 1, title: "First Post", description: "First post description pr." },
        { id: 2, title: "Second Post", description: "Second post description pr." }
    ])
}

// postman => POST => body => raw => json
// need middleware - app.use(bodyParser.json());
exports.createPost = (req, res, next) => {
    res.status(201).json({ // 201 - successfully create resourse
        message: "Post created.",
        data: req.body //come from postman
    })
}