<template>
    <div class="content-right-card">
        <div class="right-card__user-info-block">
            <img :src="user.avatar" :alt="user.name" />
            <div>
                <strong>{{ user.name }}</strong>

                <div class="mt-4">
                    <div>
                        <router-link to="/user/profile">Мой профиль</router-link>
                    </div>
                    <div>
                        <router-link to="/user/my-posts">Мои посты</router-link>
                    </div>
                    <div>
                        <router-link to="/post/create">Добавить пост</router-link>
                    </div>
                </div>
            </div>

            <div class="profile-exit">
                <button @click="logout" title="Выход"><i class="fas fa-sign-out-alt"></i></button>
            </div>
            
        </div>
        <div class="w-5/6 mx-auto">
        </div>
    </div>

</template>

<script>
import api from "@/api";
import router from "@/router/indexRouter";

export default {
    data() {
        return {}
    },
    computed: {
        user(){
            return this.$store.getters.user;
        },
    },
    methods: {
        logout(){

            api.post('logout', {})
                .then(() => {
                    this.$store.commit('setAuth', false);
                    this.$store.commit('setUser', null);
                    localStorage.setItem('user_token', null);
                    router.push('/');
                }).catch(error => {
                    console.log(error);
                });
        }
    }
}
</script>

<style scoped>

</style>