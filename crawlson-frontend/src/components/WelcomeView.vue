<template>
    <h3>Welcome {{getUsername()}}</h3>
  
  </template>
  
  <script>
  import { GET_USER_INFO } from "../store/storeconstants";
  export default {
    name: 'WelcomeVIew',
    data() {
      return {
      }
    },
    methods:{
      getUsername() {
        let user = this.$store.getters[`auth/${GET_USER_INFO}`];
        return user.first_name + " " + user.last_name;
    }, 
    }
  }
  </script>