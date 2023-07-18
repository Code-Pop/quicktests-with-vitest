<template>
  <div class="post-container">
    <PostCard v-if="createdPost" :title="createdPost.title" :body="createdPost.body" />
    <form v-else @submit="handleSubmit" data-testid="post-form" class="create-post-form">
      <div class="post-title">
        <label for="title">Title</label>
        <input data-testid="title-input" type="text" name="title" v-model="formData.title" />
      </div>
      <div class="post-body">
        <label for="body">Content</label>
        <textarea data-testid="body-input" name="body" v-model="formData.body" rows="5" />
      </div>
      <button type="submit" :disabled="loading" class="create-post-btn">
        {{ loading ? "Creating..." : "Create Post" }}
      </button>
    </form>
    <NotificationToast v-if="error" status="error" :message="error" @clear-notification="clearErrorNotification" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

import PostCard from "./components/PostCard.vue";
import NotificationToast from "./components/NotificationToast.vue";

function getUserId(max = 10) {
  return Math.floor(Math.random() * max);
}

const formData = ref({
  title: "",
  body: "",
});
const createdPost = ref(null);
const loading = ref(false);
const error = ref(null);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.value.title) {
    error.value = "Please input post title";
    return;
  }

  if (!formData.value.body) {
    error.value = "Please input post body";
    return;
  }

  loading.value = true;
  createdPost.value = null;
  try {
    const { data } = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      {
        userId: getUserId(),
        title: formData.value.title,
        body: formData.value.body,
      }
    );
    createdPost.value = data;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const clearErrorNotification = () => {
  error.value = null;
};
</script>

<style scoped>
.post-container {
  max-width: 560px;
  margin: 5rem auto;
}

.create-post-form label {
  color: #fff;
}

.create-post-form input,
.create-post-form textarea {
  margin-top: 8px;
  padding: 12px;
}

.post-title {
  display: flex;
  flex-direction: column;
}

.post-body {
  display: flex;
  flex-direction: column;
  margin-top: 14px;
}

.create-post-btn {
  display: block;
  margin: 16px auto;
  background-color: #fff;
  padding: 8px;
  cursor: pointer;
}
</style>