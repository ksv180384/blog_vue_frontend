<template>
    <div class="content-right-card">
        <div class="right-card-header">Авторизация</div>
        <div class="w-5/6 mx-auto">
            <form action="#" @submit.prevent="submitLogin">
                <div class="form-group" :class="{ error: error_response }">
                    <label for="inputLogin">Email</label>
                    <input id="inputLogin"
                           type="text"
                           v-model.trim="email"
                           :disabled="isDisabled"
                           placeholder="Введите email"

                    />
                    <small class="error" v-if="error_response">
                        {{ error_response }}
                    </small>
                </div>
                <div class="form-group"
                     :class="{ error: error_response }"
                >
                    <label for="inputPassword">Пароль</label>
                    <input id="inputPassword"
                           type="password"
                           v-model.trim="password"
                           :disabled="isDisabled"
                           placeholder="Введите пароль"
                    />
                </div>
                <div class="text-center mt-6">
                    <button class="btn btn-primary"
                            type="submit"
                            :disabled='isDisabled'
                    >Войти</button>
                </div>
            </form>

            <div class="text-center my-3">
                <a href="#"
                   @click.prevent="registrationToggle"
                   class="link font-semibold uppercase"
                >Регистрация</a>
            </div>
            <hr>
            <SocialLogin/>
        </div>
    </div>
</template>

<script>

import api from '@/api';
import useVuelidate from '@vuelidate/core';
import SocialLogin from "@/components/SocialLogin";

export default {
    setup(){
        return { v$: useVuelidate() }
    },
    data(){
        return {
            email: '',
            password: '',
            isDisabled: false,
            error_response: null,
        }
    },
    methods: {
        registrationToggle() {
            this.$store.commit('registrationToggle');
        },
        submitLogin(){
            this.error_response = null;
            if(this.v$.$invalid){
                this.v$.$touch();
                return true;
            }

            const dataForm = { email: this.email, password: this.password };
            this.isDisabled = true;
            api.post('login', dataForm)
                .then(response => {
                    this.$store.commit('setAuth', true);
                    this.$store.commit('setUser', response.user);
                    localStorage.setItem('user_token', response.user.token);
                    this.isDisabled = false;
                }).catch(error => {
                    console.log(error.response);
                    this.error_response = error.response.data.message;
                    this.isDisabled = false;
                });
        }
    },
    components: {SocialLogin},
}
</script>