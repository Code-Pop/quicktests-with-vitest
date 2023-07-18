<template>
    <div>
        <h1>{{ title }}</h1>
        <p>{{ body }}</p>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
});
</script>

<style>
h1 {
    font-size: 32px;
    font-weight: 700;
    color: #fff;
}
</style>