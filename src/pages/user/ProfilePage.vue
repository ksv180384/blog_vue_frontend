<template>
    <section class="pt-28">
        <div class="profile-container">
            <div class="profile-info">
                <div class="px-6">
                    <div class="profile-avatar-container">
                        <img v-if="avatar"
                             :alt="name"
                             :src="avatar"
                        />
                        <div v-else></div>
                    </div>
                    <div class="profile-name-container">
                        <h3>{{ name }}</h3>
                    </div>
                    <div class="profile-about-container">
                        <p>
                            {{ about }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

import {mapGetters} from "vuex";
import store from "@/store/indexStore";
import {setMetaTags} from "@/helpers";

export default {
    name: "Profile",
    async beforeRouteEnter(to, from, next) {
        const resProfileEdit = await store.dispatch('storeProfilePage/loaDataPage', to.params.id);
        setMetaTags(`${resProfileEdit.user.name} - блог`, { description: `${resProfileEdit.user.name} - блог` });
        next();
    },
    computed: {
        ...mapGetters('storeProfilePage', ['name', 'avatar', 'about']),
    },
    methods: {}
}
</script>

<style scoped>
.profile-container{
    @apply w-full px-4 mx-auto;
}

.profile-info{
    @apply relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16;
}

.profile-avatar-container{
    @apply w-full px-4 flex justify-center;
}

.profile-avatar-container > img,
.profile-avatar-container > div{
    @apply shadow-xl rounded w-44 h-44 align-middle border-none absolute -m-36 object-cover;
}

.profile-avatar-container > div{
    @apply bg-white;
}

.profile-name-container{
    @apply text-center mt-12;
}

.profile-name-container h3{
    @apply text-xl font-semibold leading-normal mb-2 mb-2;
}

.profile-about-container{
    @apply flex justify-center mt-10 py-10 border-t border-blue-200 text-center;
}

.profile-about-container > p{
    @apply px-14;
}
</style>