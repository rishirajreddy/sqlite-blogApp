const db = require("../models");
const Post = db.posts;
const User = db.users;
const {getPagination} = require("../services/posts");
const {filterPostData} = require("../services/posts");
const {format} = require("date-fns");

exports.createPost = async(req,res) => {
    const {title, body, category} = req.body;
    const user = await User.findOne({where: {username: req.decoded.username}});

    Post.create({
        title,
        body,
        category,
        userId: user.id,
        createdAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss')    
    })
    .then((result) => {
        res.status(200).send(result)
        console.log("Data Inserted")})
    .catch(err => {
        res.send(err.message);
        console.log(err)})
}


exports.getUserPosts = async(req,res) => {
    User.findAll({
        attributes:['id','email', 'username'],
        include:[{
            model: Post,
            attributes: ['id', 'title','body', 'category']
        }],
        where: {id: 4}
    }).then((result) => {
        res.json(result)
    }).catch(err =>{
        console.log(err);
        res.send(err.message)
    })
}

exports.getAllPosts = async(req, res) => {
    const {page, size} = req.query;
    const {limit, offset} = getPagination(page, size);
    
    Post.findAll({
        attributes: ['id', 'title','body', 'category'],
        include: [{
            model:User,
            attributes: ['id', 'email','username']
        }],
        limit,
        offset
    })
        .then((result) => {
            res.json(result)
        })
        .catch(err => {
            console.log(err.message);
        })
}

exports.getPost = async(req,res) => {
    const postData = await Post.findOne(
        {
        attributes:['id', 'title','body','category'],
        include: [{
            model:User,
            attributes: ['id','username','email']
        }],
        where: {id: req.params.id}
    })

      let post_body = filterPostData(postData);

        postData.set({
            body: post_body
        })

        await postData.save()
            .then((result) => {
            res.status(200).json({msg:"Post Updated", data: result})
        })
        .catch(err => {
            res.send(err.message);
            console.log(err.message);})

}

exports.updatePost = async(req,res) => {
    Post.update({
        body: req.body.body,
        updatedAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
    },
    {
        attributes: ['id', 'title', 'body', 'category'],
        include: [{
            model: User,
            attributes: ['id','email', 'username']
        }],
        where: {id: req.params.id}
    }
    )
        .then((data) => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.send(err.message);
            console.log(err.message);
        })
}

exports.deletePost = async(req, res) => {
    Post.destroy({
        where: {id: req.params.id}
    })
    .then((result) => {
        res.status(200).json({data:result, msg:"Post Deleted!!"});
        console.log("Deleted");
    })
    .catch(err => {
        res.send(err.message);
        console.log(err.message);
    })
}