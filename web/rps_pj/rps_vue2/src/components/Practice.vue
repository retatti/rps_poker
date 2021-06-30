<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>じゃんけんポーカー</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <!--  -->
      <Game />
      <Test />
    </v-main>
  </v-app>
</template>

<script>
import Game from './Game.vue'
import Test from './Test.vue'


  export default {
    data: () => ({ drawer: null }),
    components: {
      Game,
      Test
    }
  }
</script>