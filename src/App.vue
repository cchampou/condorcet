<template>
  <div>
    <Navbar v-if="isAuth"></Navbar>

    <div class="container mx-auto">
      <Notifications :notifications="notifications" />

      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Navbar from "./components/Navbar";
import Notifications from "./components/Notifications";

export default {
  name: "App",
  components: {
    Navbar,
    Notifications
  },
  computed: {
    ...mapState("app", ["notifications"]),
    ...mapGetters("user", ["isAuth"]),
    canGoBack() {
      return this.$route.path !== "/polls";
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
