<template>
    <div class="post-comment-rating">
        <i @click="up"
           class="fas fa-sort-up"
           :class="{ active: user_use_rating === 1 }"
        ></i>
        <span v-if="!is_loading"
              :class="{ 'text-red-600': comment_rating < 0 }"
        >
            {{ comment_rating }}
        </span>
        <span v-else>
            <i class="fa fa-spinner fa-pulse"></i>
        </span>
        <i @click="down"
           class="fas fa-sort-down"
           :class="{ active: user_use_rating === 2 }"
        ></i>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { commentPostUp, commentPostDown } from '@/services/post_service';

export default {
    name: "PostCommentRating",
    props: {
        id: {
            type: Number,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        use_rating: {
            type: Number,
            required: true,
        }
    },
    data() {
        return {
            comment_rating: this.rating,
            user_use_rating: this.use_rating,
            is_loading: false,
        }
    },
    computed: {
        ...mapGetters(['auth']),
    },
    methods: {
        async up(){
            if(!this.auth || this.is_loading){
                return true;
            }

            this.is_loading = true;

            try {
                const resCommentPostUp = await commentPostUp(this.id);
                this.comment_rating = resCommentPostUp.rating;
                this.user_use_rating = resCommentPostUp.use_rating;
                this.is_loading = false;
            }catch (e) {
                console.log(e);
                this.is_loading = false;
            }
        },
        async down(){
            if(!this.auth || this.is_loading){
                return true;
            }

            this.is_loading = true;

            try {
                const resCommentPostUp = await commentPostDown(this.id);
                this.comment_rating = resCommentPostUp.rating;
                this.user_use_rating = resCommentPostUp.use_rating;
                this.is_loading = false;
            }catch (e) {
                console.log(e);
                this.is_loading = false;
            }
        },
    }
}
</script>

<style scoped>
.post-comment-rating{
    @apply text-gray-500 flex items-center w-16 justify-between mr-2 text-sm
}

.post-comment-rating>i.fa-sort-up{
    @apply cursor-pointer mt-3 hover:text-green-500
}

.post-comment-rating>i.fa-sort-down{
    @apply cursor-pointer -mt-3 hover:text-red-600
}

.post-comment-rating>i{
    @apply text-2xl
}

.post-comment-rating i.fa-sort-up.active{
    @apply text-green-600
}

.post-comment-rating i.fa-sort-down.active{
    @apply text-red-600
}
</style>