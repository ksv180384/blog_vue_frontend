<template>
    <Header/>
    <main>
        <router-view/>
    </main>
</template>

<script>

import Header from "@/components/Header";

export default {
    name: "ErrorLayout",
    components: {Header}
}
</script>

<style scoped>

</style>