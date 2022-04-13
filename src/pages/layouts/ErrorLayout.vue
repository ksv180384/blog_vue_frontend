<template>
    <Header/>
    <main>
        <div class="content">
            <router-view/>
        </div>
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