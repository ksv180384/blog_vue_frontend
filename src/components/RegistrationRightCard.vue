<template>
    <div class="content-right-card">
        <div class="right-card-header">Регистрация</div>
        <div class="w-5/6 mx-auto">
            <form action="#" @submit.prevent="submitRegistration">
                <div class="form-group" :class="{ error: v$.email.$dirty && v$.email.$errors.length || error_response && error_response.email }">
                    <label for="inputLogin">Email</label>
                    <input id="inputLogin"
                           type="text"
                           v-model.trim="email"
                           placeholder="Введите email"
                    />
                    <small class="error" v-if="v$.email.$dirty && v$.email.$errors.length">
                        {{ v$.email.$errors[0].$message }}
                    </small>
                    <small class="error" v-if="error_response && error_response.email">
                        {{ error_response.email[0] }}
                    </small>
                </div>
                <div class="form-group" :class="{ error: v$.name.$dirty && v$.name.$errors.length || error_response && error_response.name }">
                    <label for="inputLogin">Имя</label>
                    <input id="inputName"
                           type="text"
                           v-model.trim="name"
                           placeholder="Введите имя"
                    />
                    <small class="error" v-if="v$.name.$dirty && v$.name.$errors.length">
                        {{ v$.email.$errors[0].$message }}
                    </small>
                    <small class="error" v-if="error_response && error_response.name">
                        {{ error_response.name[0] }}
                    </small>
                </div>
                <div class="form-group"
                     :class="{ error: v$.password.$dirty && (v$.password.$errors.length || v$.password_confirmation.$errors.length) }"
                >
                    <label for="inputPassword">Пароль</label>
                    <input id="inputPassword"
                           type="password"
                           v-model.trim="password"
                           placeholder="Введите пароль"
                    />
                    <small class="error" v-if="v$.password.$dirty && v$.password.$errors.length">
                        {{ v$.password.$errors[0].$message }}
                    </small>
                    <small class="error" v-if="error_response && error_response.password">
                        {{ error_response.password[0] }}
                    </small>
                </div>
                <div class="form-group"
                     :class="{ error: v$.password_confirmation.$dirty && (v$.password_confirmation.$errors.length || v$.password.$errors.length) }"
                >
                    <label for="inputPasswordConfirm">Подтвердите пароль</label>
                    <input id="inputPasswordConfirm"
                           type="password"
                           v-model="password_confirmation"
                           placeholder="Подтвердите пароль"
                    />
                    <small class="error" v-if="v$.password_confirmation.$dirty && v$.password_confirmation.$errors.length">
                        {{ v$.password_confirmation.$errors[0].$message }}
                    </small>
                </div>
                <div class="text-center mt-6">
                    <button class="btn btn-primary">Зарегистрироваться</button>
                </div>
                <div class="text-center my-3">
                    <a href="#"
                       @click.prevent="registrationToggle"
                       class="link font-semibold uppercase"
                    >Авторизоваться</a>
                </div>
                <hr>
                <SocialLogin/>
            </form>
        </div>
    </div>
</template>

<script>

import { required, email, minLength, sameAs, helpers } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import SocialLogin from "@/components/SocialLogin";
import api from '@/api';


export default {
    setup(){
        return { v$: useVuelidate() }
    },
    data(){
        return {
            email: '',
            name: '',
            password: '',
            password_confirmation: '',
            error_response: null,
        }
    },
    methods: {
        registrationToggle() {
            this.$store.commit('registrationToggle');
        },
        submitRegistration(){
            console.log(this.password);
            console.log(this.password_confirmation);

            if(this.v$.$invalid){
                this.v$.$touch();
                return true;
            }

            const dataForm = { email: this.email, name: this.name, password: this.password, password_confirmation: this.password_confirmation };
            this.isDisabled = true;
            api.post('registration', dataForm)
                .then(response => {
                    this.$store.commit('setAuth', true);
                    this.$store.commit('setUser', response.user);
                    localStorage.setItem('user_token', response.user.token);
                    this.isDisabled = false;
                }).catch(error => {
                    console.log(error.response.data.errors);
                    this.error_response = error.response.data.errors;
                    console.log(this.error_response.email.length);
                    this.isDisabled = false;
            });
        }
    },
    validations() {
        return {
            email: {
                required: helpers.withMessage(() => `Введите Email.`, required),
                email: helpers.withMessage(() => `Неверный Email.`, email)
            },
            name: {
                required: helpers.withMessage(() => `Введите имя.`, required),
            },
            password: {
                required: helpers.withMessage(() => `Введите Пароль.`, required),
                minLength: helpers.withMessage(({$params}) => `Пароль должен содержать не менее ${$params.min} символов.`, minLength(6)),
            },
            password_confirmation: {
                sameAs: helpers.withMessage(() => 'Неверно подтвержден пароль.', sameAs(this.password))
            }
        }
    },
    components: {SocialLogin},
}
</script>

<style scoped>

</style>