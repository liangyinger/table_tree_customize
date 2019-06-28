<template lang="html">
  <div id="example">
    <ul class="switch-list">
      <li class="switch-item" v-for="item in propList">
        <span>{{ item.name }}: </span>
        <zk-switch v-model="props[item.name]"></zk-switch>
      </li>
    </ul>
    <zk-table
      ref="table"
      sum-text="sum"
      index-text="#"
      :data="data"
      :columns="columns"
      :stripe="props.stripe"
      :border="props.border"
      :show-header="props.showHeader"
      :show-summary="props.showSummary"
      :show-row-hover="props.showRowHover"
      :show-index="props.showIndex"
      :tree-type="props.treeType"
      :is-fold="props.isFold"
      :expand-type="props.expandType"
      :selection-type="props.selectionType"
      @checkbox-click="handleRadioClick">
      <template slot="$expand" scope="scope">
        {{ `My name is ${scope.row.name},
           this rowIndex is ${scope.rowIndex}.`
         }}
      </template>
      <template slot="likes" scope="scope">
        {{ scope.row.likes.join(',') }}
      </template>
      <!-- <template slot="lastyear" scope="scope">
        {{`${scope.row.i}`}}
         <Input   v-model="value"  style="width: 100px" />
         <input type="" name="" >
      </template> -->
      <!-- <zkinput> -->
         <template slot="lastyear" scope="scope">
            <!-- <zkinput></zkinput> -->
            <Input v-model="scope.row.lastyear"  style="width: 200px"   @on-change="changeInputText(value)"/>
         </template>
     <!-- </zkinput> -->
    </zk-table>
   <!-- <div>
      <p>{{this.value}}</p>
      <Input v-model="value"  style="width: 200px" />
    </div>  -->
    <div>选中的数据为{{collect}}  共{{collect.length}}条</div>
  </div>
</template>

<script>
  import ZkSwitch from './Switch/Switch';
  import zkinput from  './Switch/input.vue'
  import {getTree} from './treedata';

  export default {
    name: 'example',
    components: {
      ZkSwitch,zkinput
    },
    data() {
      return {
        // value:'wwww',
        collect:[],
        props: {
          stripe: false,
          border: false,
          showHeader: true,
          showSummary: false,
          showRowHover: true,
          showIndex: false,
          treeType: true,
          isFold: true,
          expandType: false,
          selectionType: true,
        },
        data: [
          {
            name: 'Jack',
            sex: 'male',
            likes: ['football', 'basketball'],
            score: 10,
            children: [
              {
                name: 'Ashley',
                sex: 'female',
                likes: ['football', 'basketball'],
                score: 20,
                children: [
                  {
                    name: 'Ashley',
                    sex: 'female',
                    likes: ['football', 'basketball'],
                    score: 20,
                  },
                  {
                    name: 'Taki',
                    sex: 'male',
                    likes: ['football', 'basketball'],
                    score: 10,
                    children: [
                      {
                        name: 'Ashley',
                        sex: 'female',
                        likes: ['football', 'basketball'],
                        score: 20,
                      },
                      {
                        name: 'Taki',
                        sex: 'male',
                        likes: ['football', 'basketball'],
                        score: 10,
                        children: [
                          {
                            name: 'Ashley',
                            sex: 'female',
                            likes: ['football', 'basketball'],
                            score: 20,
                          },
                          {
                            name: 'Taki',
                            sex: 'male',
                            likes: ['football', 'basketball'],
                            score: 10,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                name: 'Taki',
                sex: 'male',
                likes: ['football', 'basketball'],
                score: 10,
              },
            ],
          },
          {
            name: 'Tom',
            sex: 'male',
            likes: ['football', 'basketball'],
            score: 20,
            children: [
              {
                name: 'Ashley',
                sex: 'female',
                likes: ['football', 'basketball'],
                score: 20,
                children: [
                  {
                    name: 'Ashley',
                    sex: 'female',
                    likes: ['football', 'basketball'],
                    score: 20,
                  },
                  {
                    name: 'Taki',
                    sex: 'male',
                    likes: ['football', 'basketball'],
                    score: 10,
                  },
                ],
              },
              {
                name: 'Taki',
                sex: 'male',
                likes: ['football', 'basketball'],
                score: 10,
                children: [
                  {
                    name: 'Ashley',
                    sex: 'female',
                    likes: ['football', 'basketball'],
                    score: 20,
                  },
                  {
                    name: 'Taki',
                    sex: 'male',
                    likes: ['football', 'basketball'],
                    score: 10,
                  },
                ],
              },
            ],
          },
          {
            name: 'Tom',
            sex: 'male',
            likes: ['football', 'basketball'],
            score: 20,
          },
          {
            name: 'Tom',
            sex: 'male',
            likes: ['football', 'basketball'],
            score: 20,
            children: [
              {
                name: 'Ashley',
                sex: 'female',
                likes: ['football', 'basketball'],
                score: 20,
              },
              {
                name: 'Taki',
                sex: 'male',
                likes: ['football', 'basketball'],
                score: 10,
              },
            ],
          },
        ],
        columns: [
          {
            label: 'name',
            prop: 'name',
            width: '400px',
          },
          {
            label: 'sex',
            prop: 'sex',
            minWidth: '50px', 
          },
          {
            label: 'score',
            prop: 'score',

          },
          {
            label: 'likes',
            prop: 'likes',
            minWidth: '200px',
            type: 'template',
            template: 'likes',
          },
          {
            label: '去年',
            prop: 'lastyear',
            minWidth: '100px',
            type: 'template',
            template: 'lastyear',
          },
        ],
        columns1: [
          {
            label: "姓名",
            prop: "name",
            width: "200px"
          },
          {
            label: "年龄",
            prop: "age",
            width: "100px",
          },
          {
            label: "性别",
            prop: "sex",
            width: "100px"
          },
          {
            label: "上年实际",
            prop: "lastyear",
            minWidth: "150px",
            type:'template',
            template:"lastyear"
          },
          {
            label: "本年预计",
            prop: "thisyear",
            minWidth: "150px"
          }
        ],
        dataSourceAll: [
          {
            id: 1,
            parentId: "",
            name: "爷爷",
            age: 18,
            sex: "男",
            lastyear:'sdjsd'
          },
          {
            id: 11,
            parentId: 1,
            name: "爸爸",
            age: 18,
            sex: "男"
          },
          {
            id: 111,
            parentId: 11,
            name: "姐姐",
            age: 18,
            sex: "女",
            ss: ""
          },
          {
            id: 1111,
            parentId: 111,
            name: "姐姐的女儿",
            age: 18,
            sex: "女",
            ss: ""
          },
          {
            id: 1112,
            parentId: 111,
            name: "姐姐的儿zi",
            age: 18,
            sex: "男",
            ss: ""
          },
          {
            id: 112,
            parentId: 11,
            name: "哥哥",
            age: 18,
            sex: "男",
            ss: ""
          },
          {
            id: 12,
            parentId: 1,
            name: "叔叔",
            age: 18,
            sex: "男",
            ss: ""
          },
          {
            id: 121,
            parentId: 12,
            name: "堂姐",
            age: 18,
            sex: "女",
            ss: ""
          },
          {
            id: 122,
            parentId: 12,
            name: "堂哥",
            age: 18,
            sex: "男",
            ss: ""
          },
          {
            id: 2,
            parentId: "",
            name: "姥爷",
            age: 18,
            sex: "男",
            ss: ""
          },
          {
            id: 21,
            parentId: 2,
            name: "妈妈",
            age: 18,
            sex: "女"
          },
          {
            id: 22,
            parentId: 2,
            name: "舅舅",
            age: 18,
            sex: "男"
          }
        ]
      };
    },
    computed: {
      propList() {
        return Object.keys(this.props).map(item => ({
          name: item,
        }));
      },
      data1(){
         return getTree(this.dataSourceAll, 0,this.columns1);
      } 
    },
    methods: {
      handleRadioClick(option) {
        // console.log(this.$refs['table'].getCheckedProp())
        this.collect = this.$refs['table'].getCheckedProp()
      },
      changeInputText(e){
        debugger
         console.log(e)
      }
    },
    mounted(){
      
    }
  };
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }

  .switch-list {
    margin: 20px 0;
    list-style: none;
    overflow: hidden;
  }

  .switch-item {
    margin: 20px;
    float: left;
  }
</style>
