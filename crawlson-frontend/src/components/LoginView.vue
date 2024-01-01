<template>
<div class="container">
    <div class="bg"></div>
    <div class="card flex justify-content-center">
        <div class="card-body">
            <h3 style="margin-top: 10px;">Login to <strong>Crawlson</strong></h3>
            <Form @submit="onSubmit" class="flex flex-column gap-2">
            <div class="in3">
                <InputGroup :class="{ 'p-invalid': emailErrorMsg }">
                    <InputGroupAddon>
                        <i class="pi pi-envelope"></i>
                    </InputGroupAddon>
                    <span class="p-float-label">
                        <InputText id="email" @keyup="checkEmailField" placeholder="Email" v-model="email" name="email" :class="{ 'p-invalid': emailErrorMsg }" aria-describedby="email-text-error" />
                        <label for="email">Email</label>
                    </span>
                </InputGroup>
                <small id="email-text-error" v-if="emailError" class="p-error">{{emailErrorMsg}}</small>
            </div>

            <div class="in3">
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-key"></i>
                    </InputGroupAddon>
                    <span class="p-float-label">
                        <Password placeholder="Password" @keyup="checkPasswordField" v-model="password" name="password" :feedback="false" toggleMask :class="{ 'p-invalid': passwordErrorMsg }" aria-describedby="password-text-error" />
                        <label for="password">Password</label>
                    </span>
                </InputGroup>
                <small v-if="passwordError" id="password-text-error"  class="p-error">{{passwordErrorMsg}}</small>
            </div>

            <div class="form-group in3">
                <Button label="Login" type="submit" class="login-button"/>
            </div>

            <div >
                <p>Don't have an account? <a href=#>Create new account</a></p>
            </div>


            </Form>
            <Toast group="br" />
        </div>
    </div>
</div>
</template>

<script>
import { SET_AUTHENTICATION, SET_JWT_TOKEN, SET_USER_INFO } from "../store/storeconstants";
import axios from "axios";
import { Form, Field, ErrorMessage } from 'vee-validate';

import { useToast } from 'primevue/usetoast';
import { watch } from "vue";
import { useStore } from "vuex";

export default {
    setup() {
        const store = useStore();
        const toast = useToast();

        watch(
            () => store.getters.getErrorMessage,
             (message, prevMessage) => {
              console.log("error message", message);
              if (message) {
                toast.add({
                  severity: "error",
                  summary: "Error",
                  detail: message,
                  group: "br",
                  life: 6000,
                });
              }
            }
          );

          watch(
            () => store.getters.getInfoMessage,
             (message, prevMessage) => {
              console.log("info message", message);
              if (message) {
                toast.add({
                  severity: "info",
                  summary: "Update",
                  detail: message,
                  group: "br",
                  life: 6000,
                });
              }
            }
          );
    },
    name: 'LoginView',

    components: {
      Form,
      Field,
      ErrorMessage,
    },
    data() {
      return {
        email: "",
        password: "",
        output: "",
        emailError: "",
        emailErrorMsg: "",
        passwordErrorMsg: "",
        passwordError: ""
      }
    },
    methods: {
      checkEmailField() {
        if (this.email != "")
        {
            this.emailError = false;
            this.emailErrorMsg = "";
        } else {
            this.emailError = true;
            this.emailErrorMsg = "Email is required.";
        }
      },
      checkPasswordField() {
        if (this.password != "")
        {
            this.passwordError = false;
            this.passwordErrorMsg = "";
        } else {
            this.passwordError = true;
            this.passwordErrorMsg = "Password is required.";
        }
      },
      async onSubmit() {
        //make sure email OR password are not empty
        if( this.email != "" && this.password != "" ) {

            // const instance = axios.create({
            //     baseURL: 'http://localhost:9000http://localhost:9000',
            //     timeout: 2000,
            // });

            // try {
                axios.post( "http://127.0.0.1:3300/api/v1/auth/login", {
                    email: this.email,
                    password: this.password
                }
                ).then( (response) => {
                    if( response && response.data && response.data.token != "" )
                    {
                        this.output = "Authentication complete"
                        this.$store.commit( `auth/${SET_JWT_TOKEN}`, response.data.token );
                        this.$store.commit( `auth/${SET_AUTHENTICATION}`, true );
                        this.$store.commit( `auth/${SET_USER_INFO}`, response.data.user );

                        this.$router.push( '/home')
                    } else {
                      this.$store.commit("setErrorMessage", "Unexpected error. Refresh the page and try again." );
                      console.log( response )
                    }
                }).catch((errors) => {
                    this.$store.commit( `auth/${SET_AUTHENTICATION}`, false );
                    this.$store.commit( `auth/${SET_JWT_TOKEN}`, "" );
                    this.$store.commit( `auth/${SET_USER_INFO}`, {} );

                    this.$store.commit("setErrorMessage", "Can't reach the server." );

                    console.log(errors);
                });

                console.log(new Date().toUTCString());
                console.log("post call passed")
            // }
            // catch (err) {
            //     console.log(new Date().toUTCString());
            //     console.log("post call failed")
            // }
        } else {
            if( this.email == "" )
            {
                this.emailError = true;
                this.emailErrorMsg = "Email is required.";
            }

            if( this.password == "" )
            {
                this.passwordError = true;
                this.passwordErrorMsg = "Password is required.";
            }

          this.$store.commit( `auth/${SET_AUTHENTICATION}`, false );
          this.output = "Email and password can not be empty";
        }
      },
    },
  }
  </script>

<style>
.forgot-password {
    padding: 0px;
}
.login-button {
    width: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.in3 {
  padding-top: 20px;
  padding-right: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
}
.card-body {
    width: 490px;
    margin-top: 100px;
    z-index: 9;
    background: #fff;
    align-items: center;
    box-shadow: 0 3px 20px 0 rgba(0,0,0,.1);
    padding: 2rem;
}
body {
    margin:0;
    padding:0;
}
.bg {
    position: absolute;
    background-position: center;
    background-image: url('/houses_logo.jpeg');
    width: 100%;
    height: 180px;
    margin:0;
    padding:0;
}
.h3, h3 {
    font-size: 1.75rem;
}
.container {
    position: relative;
}
</style>
