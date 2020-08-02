import {
  SET_POSTS_LOADING,
  SET_SINGLE_POST,
  GET_ALL_POSTS,
  REMOVE_SINGLE_POST,
  EDIT_POST,
  SET_EFFECT,
} from "./types";

import M from "materialize-css";

import postNotifySound from "../../audio/post-notify.mp3";

import io from "socket.io-client";
import config from "../../config";
import removeBadWords from "../../helpers/removeBadWords";

let socket;

const audio = new Audio(postNotifySound);

export const setPostsLoading = (loading) => (dispatch) => {
  dispatch({ type: SET_POSTS_LOADING, payload: loading });
};

export const startSocket = () => (dispatch) => {
  if (window.Notification) {
    Notification.requestPermission();
  }

  socket = io(config[process.env.NODE_ENV].endpoint);

  socket.on("init", (posts) => {
    dispatch({ type: GET_ALL_POSTS, payload: posts.reverse() });
    setPostsLoading(false)(dispatch);
  });

  socket.on("push", (msg) => {
    if (window.Notification) {
      new Notification(msg.content);
    }

    audio.play();

    dispatch({ type: SET_SINGLE_POST, payload: msg });
  });

  socket.on("remove", (postId) => {
    dispatch({ type: REMOVE_SINGLE_POST });
  });

  socket.on("edited", (msg) => {
    dispatch({ type: EDIT_POST, payload: msg });
  });

  socket.on("effect", (effect) => {
    startEffect(effect)(dispatch);
  });
};

export const startEffect = (effect) => (dispatch) => {
  dispatch({ type: SET_EFFECT, payload: effect });
};

export const sendEffect = (effect) => (dispatch) => {
  socket.emit("effect", effect);

  startEffect(effect)(dispatch);
};

export const uploadImage = (user, imageUrl, imageAlt) => (dispatch) => {
  const newPost = {
    name: user.name,
    userId: user.id,
    userAuthorized: user.authorized,
    imageUrl: imageUrl,
    imageAlt: imageAlt,
  };

  socket.emit("imageUpload", newPost);

  dispatch({ type: SET_SINGLE_POST, payload: newPost });
};

export const sendPost = (post, user) => (dispatch) => {
  const filteredContent = removeBadWords(post.content);

  const newPost = {
    name: user.name,
    content: filteredContent,
    userId: user.id,
    userAuthorized: user.authorized,
    color: post.color,
  };

  socket.emit("message", newPost);

  dispatch({ type: SET_SINGLE_POST, payload: newPost });
};

export const editPost = (e, post, user) => (dispatch) => {
  const filteredContent = removeBadWords(e.target.value);

  const newPost = {
    ...post,
    name: user.name,
    userId: user.id,
    userAuthorized: user.authorized,
    content: filteredContent,
  };

  socket.emit("edit", newPost);

  dispatch({ type: EDIT_POST, payload: newPost });
};

export const deletePost = (postId) => (dispatch) => {
  if (window.confirm("Are you sure you want to delete this post?")) {
    socket.emit("delete", {
      postId,
    });

    dispatch({ type: REMOVE_SINGLE_POST, payload: postId });

    M.toast({ html: "Post deleted", classes: "green" });
  } else {
    M.toast({ html: "Whew, that was close...", classes: "blue" });
  }
};
