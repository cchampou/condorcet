<template>
  <div v-if="polls">
    <div v-for="poll in polls" :key="poll.id">
      <h3>{{ poll.question }}</h3>
      <button @click="joinPoll(poll.id)">Rejoindre</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { db } from "../firebase";

export default {
  name: "PublicPolls",
  data() {
    return {
      polls: null
    };
  },
  computed: {
    ...mapGetters("user", ["userId"])
  },
  async created() {
    let polls = [];

    const underPolls = await db
      .collection("polls")
      .where("isPublic", "==", true)
      .where("owner", ">", this.userId)
      .get();
    const overPolls = await db
      .collection("polls")
      .where("isPublic", "==", true)
      .where("owner", "<", this.userId)
      .get();
    underPolls.forEach(poll => {
      polls.push({ id: poll.id, ...poll.data() });
    });
    overPolls.forEach(poll => {
      polls.push({ id: poll.id, ...poll.data() });
    });

    this.polls = polls;
  },
  methods: {
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
