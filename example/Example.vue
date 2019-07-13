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
      :data="data1"
      :columns="columns1"
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
      <!--这里能去到的参数 row, rowIndex, column, columnIndex -->
         <template slot="name" slot-scope="scope">
           <div style="display:inline-block;">{{`${scope.row.name}(可自定义模版)`}}</div>
           <!-- <Poptip trigger="hover" title="Title" content="content">
               <div>{{`${scope.row.name}模版`}}</div>
           </Poptip> -->
         </template>
         <!--这里能取到的参数 column, columnIndex -->
         <template slot="nameHeader" slot-scope="scope">
            <div>{{`${scope.column.label}(可自定义模版)`}}</div>
         </template>
         <!--<template slot="lastyear" slot-scope="scope">
             <Input type="text"/>
         </template>
         <template slot="thisyear" slot-scope="scope">
             <Radio>Radio</Radio>
            <textAreaMade></textAreaMade>
         </template> -->
         <!-- <template v-for="(item,index) in columns1" :slot="item.template ? item.template :'' "  slot-scope="scope">
             <Input type="text" v-show="scope.row.state === 1"/>
             <Radio v-show="scope.row.state === 2">Radio</Radio>
             <textAreaMade  v-show="scope.row.state === 9"></textAreaMade>
             <tableUpload2  v-show="scope.row.state === 3"></tableUpload2>
          </template> -->
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
            width: "200px",
            type:'template',
            template:"name",
            renderHeader:'nameHeader'
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
            index:'1',
            parentId: "",
            name: "爷爷",
            age: 18,
            sex: "男",
            lastyear:'sdjsd'
          },
          {
            id: 11,
            index:'2',
            parentId: 1,
            name: "爸爸",
            age: 18,
            sex: "男"
          },
          {
            id: 111,
            index:'3',
            parentId: 11,
            name: "姐姐",
            age: 18,
            sex: "女",
            ss: ""
          },
          {
            id: 1111,
            parentId: 111,
            index:'4',
            name: "姐姐的女儿",
            age: 18,
            sex: "女",
            ss: ""
          },
          {
            id: 1112,
            index:'5',
            parentId: 111,
            name: "姐姐的儿zi",
            age: 18,
            sex: "男",
            ss: ""
          },
          {
            id: 112,
            index:'6',
            parentId: 11,
            name: "哥哥",
            age: 18,
            sex: "男",
            ss: ""
          },
          {
            id: 12,
            index:'7',
            parentId: 1,
            name: "叔叔",
            age: 18,
            sex: "男",
            ss: ""
          },
          {
            id: 121,
            index:'8',
            parentId: 12,
            name: "堂姐",
            age: 18,
            sex: "女",
            ss: ""
          },
          {
            id: 122,
            index:'9',
            parentId: 12,
            name: "堂哥",
            age: 18,
            sex: "男",
            ss: ""
          },
          {
            id: 2,
            index:'10',
            parentId: "",
            name: "姥爷",
            age: 18,
            sex: "男",
            ss: ""
          },
          {
            id: 21,
            index:'11',
            parentId: 2,
            name: "妈妈",
            age: 18,
            sex: "女"
          },
          {
            id: 22,
            index:'12',
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
