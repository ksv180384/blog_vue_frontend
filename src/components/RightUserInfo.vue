<template>
    <div class="content-right-card">
        <div class="right-card__user-info-block">
            <img :src="user.avatar" :alt="user.name" />
            <div>
                <strong>{{ user.name }}</strong>

                <div class="menu">
                    <div>
                        <router-link to="/user/profile" active-class="active">Мой профиль</router-link>
                    </div>
                    <div>
                        <router-link to="/user/my-posts" active-class="active">Мои посты</router-link>
                    </div>
                    <div>
                        <router-link to="/post/create" active-class="active">Добавить пост</router-link>
                    </div>
                </div>
            </div>

            <div class="profile-exit">
                <button @click="logout"
                        title="Выход"
                >
                    <i class="fas fa-sign-out-alt"></i> Выход
                </button>
            </div>
        </div>
    </div>

</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import { userLout } from "@/services/user_service";
import { removeLocalStorageUserData } from "@/helpers";

export default {
    data() {
        return {}
    },
    computed: {
        ...mapGetters(['user']),
    },
    methods: {
        ...mapMutations(['setAuth', 'setUser']),
        async logout(){
            try {
                await userLout();
                this.setAuth(false);
                this.setUser(null);
                removeLocalStorageUserData();
            } catch (e) {
                console.log('Error');
            }
        }
    }
}
</script>

<style>
.right-card__user-info-block{
    @apply flex justify-between flex-col
}

.right-card__user-info-block>img{
    @apply w-full object-cover rounded
}

.right-card__user-info-block>div{
    @apply flex-grow px-4 relative
}

.right-card__user-info-block>div>strong{
    @apply my-3 block text-center
}

.profile-exit{
    @apply border-t-2 mt-2 pt-2
}

.menu{
    @apply text-left
}

.menu a.active{
    @apply text-blue-400 border-blue-500 border-b;
}
</style>