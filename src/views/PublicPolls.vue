<template>
  <div v-if="polls" class="flex flex-wrap">
    <div v-for="poll in polls" :key="poll.id" class="w-full md:w-1/2 lg:w-1/3">
      <Card
        class="md:mx-2"
        v-bind="poll"
        :isJoinable="true"
        @onJoin="joinPoll"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import { db } from "../firebase";
import Card from "../components/Card";

export default {
  name: "PublicPolls",
  components: {
    Card
  },
  computed: {
    ...mapGetters("user", ["userId"]),
    ...mapState({
      polls: state => {
        return state.poll.all;
      }
    })
  },
  created() {
    this.listenPolls(this.userId);
  },
  methods: {
    ...mapActions("poll", ["listenPolls"]),
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
