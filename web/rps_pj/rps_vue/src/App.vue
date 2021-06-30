<template>
  <div>
    <Header />
    <Game />
  </div>
</template>

<script>
import Game from './components/Game.vue'
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Game,
    Header
  }
}
</script>

<style>
</style>
