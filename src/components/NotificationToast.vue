<template>
    <div role="alert" :class="[
        'notification',
        status === 'error' ? 'notification--error' : null,
        status === 'success' ? 'notification--success' : null,
        status === 'info' ? 'notification--info' : null,
        message && message.length > 0 ? 'notification--slide' : null,
    ]">
        <p class="notification__text">
            {{ message }}
        </p>
        <button data-testid="close-notification" title="close" ref="closeButton" class="notification__button"
            @click="$emit('clear-notification')">
            &#10005;
        </button>
    </div>
</template>

<script setup>
defineProps({
    status: {
        type: String,
        default: null
    },
    message: {
        type: String,
        default: null
    }
})
</script>

<style>
.notification {
    transition: all 900ms ease-out;
    opacity: 0;
    z-index: 300001;
    transform: translateY(-100vh);
    box-sizing: border-box;
    padding: 10px 15px;
    width: 100%;
    max-width: 730px;
    display: flex;
    position: fixed;
    top: 20px;
    right: 15px;
    justify-content: flex-start;
    align-items: center;
    border-radius: 8px;
    min-height: 48px;
    box-sizing: border-box;
    color: #fff;
}

.notification--slide {
    transform: translateY(0px);
    opacity: 1;
}

.notification__text {
    margin: 0;
    margin-left: 17px;
    margin-right: auto;
}

.notification--error {
    background-color: #fdecec;
}

.notification--error .notification__text {
    color: #f03d3e;
}

.notification--success {
    background-color: #e1f9f2;
}

.notification--success .notification__text {
    color: #146354;
}

.notification--info {
    background-color: #9AC7F5;
}

.notification__button {
    border: 0;
    background-color: transparent;
    cursor: pointer;
}
</style>