<template>
  <template v-if="user">
    <van-cell title="Avatar" is-link>
      <img :src="user.avatarUrl" alt="" style="height: 46px">
    </van-cell>
    <van-cell title="Nickname" is-link :value="user.username" @click="toEdit('username', user.username, '昵称')"/>
    <van-cell title="Account" :value="user.userAccount"/>
    <van-cell title="Gender" is-link :value="user.gender" @click="toEdit('gender', user.gender, '性别')"/>
    <van-cell title="Tel." is-link :value="user.phone" @click="toEdit('phone', user.phone, '电话')"/>
    <van-cell title="Email" is-link :value="user.email" @click="toEdit('email', user.email, '邮箱')"/>
    <van-cell title="No." :value="user.planetCode"/>
    <van-cell title="Registration Time" :value="user.createTime"/>
  </template>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import myAxios from "../plugins/myAxios";
import {showToast} from "vant";
import {getCurrentUser} from "../services/user";
// const user = {
//   id: 1,
//   username: 'shadong',
//   userAccount: 'shadong',
//   avatarUrl: 'http://n.sinaimg.cn/translate/392/w596h596/20181121/YhGL-hnyuqhi6990815.jpg',
//   gender: '男',
//   phone: '123444',
//   email: 'dewe@123.com',
//   planetCode: '1234',
//   createTime: new Date(),
// };
const user = ref();
//首次加载触发执行 每次刷新
onMounted(async ()=> {
  user.value= await getCurrentUser();

})

const router = useRouter();



const toEdit = (editKey: string, currentValue: string, editName: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      currentValue,
      editName
    }
  })
}

</script>

<style scoped>

</style>