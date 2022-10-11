// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests

server.post("/posts", (req, res) => {
  const { author, title, contents } = req.body;
  if (!author || !title || !contents) {
    const error = {
      error: "No se recibieron los parámetros necesarios para crear el Post",
    };
    res.status(STATUS_USER_ERROR).json(error);
  } else {
    let i = 1;
    const post = {
      id: i,
      author,
      title,
      contents,
    };
    posts.push(post);
    res.json(post);
    i++;
  }
});

server.post("/posts/author/:author", (req, res) => {
  const { title, contents } = req.body;
  const { author } = req.params;
  if (!author || !title || !contents) {
    const error = {
      error: "No se recibieron los parámetros necesarios para crear el Post",
    };
    res.status(STATUS_USER_ERROR).json(error);
  } else {
    let i = 1;
    const post = {
      id: i,
      author,
      title,
      contents,
    };
    posts.push(post);
    res.json(post);
    i++;
  }
});

server.get("/posts", (req, res) => {
  if (req.url.includes("term")) {
    let filteredPostsTitle = [];
    let filteredPostsContent = [];
    const { term } = req.query;
    for (const post of posts) {
      if (post.title.includes(term)) {
        filteredPostsTitle.push(post);
      } else if (post.contents.includes(term)) {
        filteredPostsContent.push(post);
      }
    }
    if (term === "title") res.json(filteredPostsTitle);
    else res.json(filteredPostsContent);
  } else res.json(posts);
});

server.get("/posts/:author", (req, res) => {
  const { author } = req.params;
  let postsFromAuthor = [];
  for (const post of posts) {
    if (post.author === author) {
      postsFromAuthor.push(post);
    }
  }
  if (postsFromAuthor.length) res.json(postsFromAuthor);
  else {
    const error = {
      error: "No existe ningun post del autor indicado",
    };
    res.status(STATUS_USER_ERROR).json(error);
  }
});

server.get("/posts/:author/:title", (req, res) => {
  const { author, title } = req.params;
  let matchedPosts = [];
  for (const post of posts) {
    if (post.author === author && post.title === title) {
      matchedPosts.push(post);
    }
  }
  if (matchedPosts.length) res.json(matchedPosts);
  else {
    const error = {
      error: "No existe ningun post con dicho titulo y autor indicado",
    };
    res.status(STATUS_USER_ERROR).json(error);
  }
});

server.put("/posts", (req, res) => {
  const { id, author, title, contents } = req.body;
  if (!id || !title || !contents || !author) {
    const error = {
      error:
        "No se recibieron los parámetros necesarios para modificar el Post",
    };
    return res.status(STATUS_USER_ERROR).json(error);
  } else {
    for (const post of posts) {
      if (post.id === id) {
        updatedPost = {
          ...post,
          author,
          title,
          contents,
        };
        return res.json(updatedPost);
      }
    }
    const error = {
      error: "No se recibió el id correcto para modificar el Post",
    };
    res.status(STATUS_USER_ERROR).json(error);
  }
});

server.delete("/posts", (req, res) => {
  const { id } = req.body;
  posts.forEach((post, i) => {
    if (post.id === id) {
      posts.splice(i, 1);
      res.json({ success: true });
    }
  });
  const error = {
    error: "No se recibió el id correcto",
  };
  res.status(STATUS_USER_ERROR).json(error);
});

server.delete("/author", (req, res) => {
  const { author } = req.body;
  const deletedPosts = [];
  posts.forEach((post, i) => {
    if (post.author === author) {
      deletedPosts.push(...posts.splice(i, 1));
    }
  });
  if (deletedPosts.length) res.json(deletedPosts);
  else {
    const error = {
      error: "No existe el autor indicado",
    };
    res.status(STATUS_USER_ERROR).json(error);
  }
});

module.exports = { posts, server };
