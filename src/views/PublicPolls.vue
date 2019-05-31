<template>
  <div v-if="polls">
    <div v-for="poll in polls" :key="poll.id">
      <button @click="joinPoll">Rejoindre</button>
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
    joinPoll() {}
  }
};
</script>

<style></style>
