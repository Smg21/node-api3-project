const express = require('express');

const Users = require('./users-model');
const Posts = require('../posts/posts-model');
const { validateUserId, validateUser, validatePost} = require('../middleware/middleware')

const router = express.Router();

router.get('/', (req, res) => {

  Users.get().then(urs => {
    res.json(urs);
  })
});

router.get('/:id', validateUserId, (req, res) => {

    res.json(req.user);
});

router.post('/', validateUser, (req, res) => {


  Users.insert(req.userName).then(usr => {
    res.json(usr);
  }).catch((err) => {
    res.send(err)
  })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {

Users.update(req.params.id, req.userName).then(change => {
  console.log(change);
  res.json(change);
}).catch(err => res.send(err));
});

router.delete('/:id', validateUserId, (req, res) => {

  Users.remove(req.user.id).then(del => {
    res.json(req.user);
  }).catch(err => res.send(err))
});

router.get('/:id/posts', validateUserId, (req, res) => {

  Posts.get().then(posts => {
    const postById = posts.filter(post => {
      if(post.user_id === req.user.id) return post;
    });
    res.json(postById)
  }).catch(err => res.send(err))
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {

  Posts.insert({text: req.post, user_id: req.user.id }).then(post => {
    res.json(post);
  }).catch(err => res.send(err))
});


module.exports = router;