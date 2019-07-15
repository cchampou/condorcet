<template>
  <Loader>
    <div class="flex flex-wrap">
      <div
        v-for="poll in publicPolls"
        :key="poll.id"
        class="w-full md:w-1/2 lg:w-1/3"
      >
        <Card
          class="md:mx-2"
          v-bind="poll"
          :userId="userId"
          :isJoinable="true"
          @onJoin="joinPoll"
        />
      </div>
    </div>
  </Loader>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { db } from "../firebase";
import Card from "../components/Card";
import Loader from "../components/Loader";

export default {
  name: "PublicPolls",
  components: {
    Card,
    Loader
  },
  computed: {
    ...mapGetters("user", ["userId"]),
    ...mapGetters("poll", ["publicPolls"])
  },
  created() {
    this.fetchPublicPolls();
  },
  methods: {
    ...mapActions("poll", ["fetchPublicPolls"]),
    async joinPoll(id) {
      try {
        const users = (await db
          .collection("polls")
          .doc(id)
          .get()).data().users;

        db.collection("polls")
          .doc(id)
          .update({ users: [...users, this.userId] });
      } catch (error) {
        this.addNotification({
          status: "error",
          message: "Nous n'avons pas pu te faire rejoindre ce scrutin"
        });
      }
    }
  }
};
</script>

<style></style>
