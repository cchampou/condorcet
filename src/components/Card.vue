<template>
  <div>
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ question }}</div>
      <p class="text-gray-700 text-base">
        {{ description }}
      </p>
    </div>
    <div class="px-6 py-4">
      <button
        class="bg-yellow-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click.prevent="$emit('onShare', id)"
      >
        Partager
      </button>
      <button
        v-if="isOwner"
        class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click.prevent="$emit('onDelete', id)"
      >
        Supprimer
      </button>
      <button
        v-if="isOwner"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click.prevent="$emit('onToggleStatus', id)"
      >
        {{ isActive ? "Fermer" : "Ré-ouvir" }}
      </button>
      <button
        v-if="isJoinable"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click.prevent="$emit('onJoin', id)"
      >
        Rejoindre
      </button>
      <router-link
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        tag="button"
        :to="{
          name: isActive ? 'poll_show' : 'poll_result',
          params: { id: id }
        }"
        >{{ isActive ? "Voter" : "Résultats" }}</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    question: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },

    isOwner: {
      type: Boolean,
      required: true
    },
    isActive: {
      type: Boolean,
      required: true
    },
    isJoinable: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style></style>
