<script setup lang="ts"></script>

<template>
  <v-app class="all-app">
    <v-app-bar class="app-bar">
      <v-tabs background-color="primary" class="app-bar-tab">
        <v-tab class="app-tab" :to="{ name: 'home' }">newjibs</v-tab>
        <v-tab class="app-tab" :to="{ name: 'maps' }">지도</v-tab>
        <v-tab class="app-tab" :to="{ name: 'ranking' }">랭킹</v-tab>
        <v-tab class="app-tab" :to="{ name: 'notices' }">공지사항</v-tab>
        <v-tab class="app-tab" :to="{ name: 'news' }">뉴스</v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
      <v-tabs background-color="primary" slider-color="yellow" class="app-bar-tab">
        <v-tab class="app-tab" :to="{ name: 'user-signup' }">회원가입</v-tab>
        <v-tab class="app-tab" :to="{ name: 'user-login' }">로그인</v-tab>
      </v-tabs>
    </v-app-bar>
  </v-app>

  <!-- <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <router-link class="nav-link active" aria-current="page" :to="{ name: 'home' }">NewJibs</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button> 
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page">Home</a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'home'}">Link</router-link>
          </li>
        </ul>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav> -->
</template>

<style scoped>
.routerLink {
  color: black;
}

.all-app {
  padding: 0;
  margin: 0;
}

.app-bar {
  /* height: 9vh; */
  display: flex;
  align-items: center;
}

.app-bar-tab {
  display: flex;
}

.app-tab {
  font-size: 1.3rem;
}
</style>
