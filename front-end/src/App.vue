<template>
  <div id="app">
    <div class="header">
      <router-link to="/">
        <div class="logo">
          <img src="/mj.png" />
        </div>
      </router-link>
      <div class="title">
        <h1>The Meme Board</h1>
      </div>
    </div>
    <div class="content">
      <router-view />
    </div>
    <div class="footer">
      <router-link to="/admin">Admin</router-link>
      <p></p>
      <router-link to="/person">Add Info</router-link>
      <p></p>
      <a
        href="https://github.com/BYU-CS-260-Winter-2020/lab-4-museum-of-ordinary-objects-michaelskonnard"
        >github</a
      >
    </div>
  </div>
</template>

<style>
html {
  box-sizing: border-box;
}

body {
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}

/* Header */
.header {
  display: flex;
  padding: 10px 100px 10px 100px;
  background-color: #ffd446;
  color: #1c454f;
}

.title {
  margin-top: 5px;
  margin-left: 20px;
}

.title h1 {
  font-size: 30px;
}

.content {
  padding: 20px 100px;
  min-height: 500px;
}

/* Footer */
.footer {
  height: 100px;
  padding: 20px 100px 0px 100px;
  background: #ffd446;
  font-size: 12px;
}

.footer a {
  color: #000;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}
</style>
