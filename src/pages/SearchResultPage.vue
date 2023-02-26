<template>
  <user-card-list :user-list="userList" />
  <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空" />
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

onMounted( async ()=> {
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
    showToast('请求成功');
    return response?.data;
  })
  .catch(function (error) {
    console.log('/user/search/tags error', error);
    showToast('请求失败');
  })
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
})



const mockUser = {
  id: 1,
  username: '鱼皮',
  userAccount: 'yupi',
  profile: '哈哈哈哈',
  avatarUrl: 'https://img2.baidu.com/it/u=1790834130,1952230725&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  gender: 0,
  phone: '12345',
  email: '1253728@qq.com',
  userRole: 0,
  planetCode: '123',
  tags: ['java', 'emo'],
  createTime: new Date().toDateString()
}

// const userList = ref([mockUser]);

</script>

<style scoped>

</style>