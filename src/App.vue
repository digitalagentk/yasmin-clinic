<script setup lang="ts">
import AppNavbar from './components/AppNavbar.vue'
import AppFooter from './components/AppFooter.vue'
import ChatWidget from './components/ChatWidget.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col bg-white text-ink">
    <AppNavbar />

    <main class="flex-1 pt-20">
      <RouterView v-slot="{ Component, route }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>

    <AppFooter />
    <ChatWidget />
  </div>
</template>