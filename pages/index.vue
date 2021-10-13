<template>
  <div class="w-screen h-screen bg-background items-center justify-center flex">
    <Alert v-if="alert.show" :message="alert.message" :isError="alert.error" />

    <form
      @submit="sendInvite"
      class="
        flex flex-col
        bg-white
        p-10
        rounded-xl
        shadow-2xl
        items-center
        space-y-8
        max-w-md
        text-lg
        text-gray-700
      "
    >
      <img :src="orgAvatar" class="h-44 rounded-lg" alt="" />

      <p class="text-center">
        You've been invited to join the
        <b class="capitalize">{{ $config.orgName }}</b> org on GitHub! Drop in
        your username to receive your invite!
      </p>

      <div v-if="$config.enableDiscord" class="flex flex-col space-y-4 w-full">
        <label class="block text-md font-medium" for="discord"
          >Discord Username</label
        >
        <input
          name="discord"
          type="text"
          required
          v-model="discord"
          class="
            focus:ring-accent
            focus:border-accent
            block
            w-full
            rounded-md
            sm:text-sm
            border-gray-300
            py-3
            px-3
          "
          placeholder="Enter your Discord username"
        />
      </div>

      <div class="flex flex-col space-y-4 w-full">
        <label class="block text-md font-medium" for="github"
          >Github Username</label
        >
        <input
          name="github"
          type="text"
          required
          v-model="github"
          class="
            focus:ring-accent
            focus:border-accent
            block
            w-full
            rounded-md
            sm:text-sm
            border-gray-300
            py-3
            px-3
          "
          placeholder="Enter your GitHub username"
        />
      </div>

      <button
        type="submit"
        class="flex w-full py-4 text-white font-medium items-center justify-center space-x-3 rounded-md shadow-lg bg-accent filter hover:brightness-90"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          v-if="!loading"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 animate-spin text-white"
          v-else-if="loading"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>

        <p>Send me an Invite!</p>
      </button>
    </form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      loading: false,
      discord: "",
      github: "",
      orgAvatar: ""
    };
  },
  computed: {
    alert() {
      return this.$store.state.alert;
    }
  },
  async fetch() {
    const res = await this.$http.$get("/api/org");
    this.orgAvatar = res.url;
  },
  methods: {
    ...mapMutations(["setAlert"]),
    async sendInvite(e) {
      e.preventDefault();
      this.loading = true;

      console.log(
        `Sending invite to user with Discord: ${this.discord} and GitHub: ${this.github}`
      );

      const res = await this.$http.$post("/api/add", {
        github: this.github,
        discord: this.discord
      });

      console.log(res);

      this.loading = false;
      this.setAlert({
        show: true,
        error: res.error,
        message: res.message
      });
    }
  }
};
</script>
