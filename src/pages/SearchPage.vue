<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索标签"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>
  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length === 0" >请选择标签</div>
  <van-row gutter="16" style="padding: 0 16px">
    <van-col v-for="tag in activeIds">
      <van-tag closeable size="small" type="primary" @close="doClose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>
  <van-divider content-position="left">选择标签</van-divider>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />
  <div style="padding: 12px">
    <van-button block type="primary" @click="toSearchResult">
      搜索
    </van-button>
  </div>

</template>

<script setup>
  import {useRouter} from "vue-router";

  const router = useRouter();
  import { ref } from 'vue';
  import { showToast } from 'vant';
  const originTagList = [
    {
      text: 'Gender',
      children: [
        {text: 'Male', id: 'Male'},
        {text: 'Female', id: 'Female'},
      ],
    },
    {
      text: 'Background',
      children: [
        {text: 'Bachelor', id: 'Bachelor'},
        {text: 'Master', id: 'Master'},
        {text: 'Doctor', id: 'Doctor'},
      ],
    },
    {
      text: 'Technique',
      children: [
        {text: 'Python', id: 'Python'},
        {text: 'Java', id: 'Java'},
        {text: 'C', id: 'C'},
        {text: 'C++', id: 'C++'},
        {text: 'C#', id: 'C#'},
        {text: 'Golang', id: 'Golang'},
        {text: 'JS', id: 'JS'},
        {text: 'SQL', id: 'SQL'},
        {text: 'PHP', id: 'PHP'},
        {text: 'R', id: 'R'},
      ],
    },

  ];
  let tagList = ref(originTagList);

  const searchText = ref('');

  const onSearch = (val) => {
    tagList.value = originTagList.map(parentTag => {
      const tempChildren =  [...parentTag.children];
      const tempParentTag = {...parentTag};
      tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
      return tempParentTag;
    })
  };

  const onCancel = () => {
    searchText.value = '';
    tagList.value = originTagList;
  };

  const activeIds = ref([]);
  const activeIndex = ref(0);


  const doClose = (tag) => {
    activeIds.value = activeIds.value.filter(item => {
      return item !== tag;
    })
  }
  /**
   * 执行搜索
   */
  const toSearchResult = () => {
    router.push({
      path: '/user/list',
      query: {
        tags: activeIds.value,
      },
    })
  }

</script>

<style scoped>

</style>