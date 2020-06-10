<template>
  <div id="app">

    <Alert></Alert>
    <Heading></Heading>
    <Navigation></Navigation>

    <transition name="slide" mode="out-in">
      <router-view/>
    </transition>

  </div>
</template>

<script>
// @ is an alias to /src
import Navigation from '@/components/Navigation.vue'
import Alert from '@/components/Alert.vue'
import Heading from '@/components/Heading.vue'

export default {
  name: 'App',
  components: {
    Alert,
    Navigation,
    Heading
  }
}
</script>

<style>
/* code for transitions between routes */
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.1s, transform .1s;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(1%);
}
/* end */

* {
  /* handige code */
  padding: 0;
  margin: 0;
  box-sizing: border-box;

  text-decoration: none;
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
}

::selection {
  background-color: #FF7B7B;
}

a, button, .closeButton {
    cursor: pointer;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  margin: auto;
  width: 1000px;
}

#nav a.router-link-exact-active {
  background-color: #B73434;
}

/* moet achteraan staan! */
@media only screen and (max-width: 1000px) {
    #app {
        width: 100%;
    }
}
</style>
