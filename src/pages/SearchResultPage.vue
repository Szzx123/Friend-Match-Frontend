<template>
  <user-card-list :user-list="userList" :loading="loading"/>
  <van-empty v-if="!userList || userList.length < 1" description="Search result is empty" />
</template>

<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showToast, Toast} from "vant";

const route = useRoute();
import qs from "qs";
import UserCardList from "../components/UserCardList.vue";
//钩子
const { tags } = route.query;
const userList = ref([]);
const loading = ref(true);
onMounted( async ()=> {
  loading.value = true;
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },
    // paramsSerializer: params => {
    //  return qs.stringify(params, { indices: false})
    // }
    paramsSerializer: {
      serialize:function(params) {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      }
    }
  })
  .then(function (response) {
    console.log('/user/search/tags succeed', response);
    showToast('Request successfully');
    return response?.data;
  })
  .catch(function (error) {
    console.log('/user/search/tags error', error);
    showToast('Request Failure');
  })
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
  loading.value = false;
})

</script>

<style scoped>

</style>

