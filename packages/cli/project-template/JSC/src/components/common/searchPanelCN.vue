<template>
    <div id="searchPanel">
        <div class="search-box">
            <i class="icon-search"></i>
            <input class="input-text" v-model.trim="keyword" placeholder="输入组织" type="search">
        </div>
        <div v-show="showOrgSelectDialog" class="org-list" ref="orgList">
            <ul v-if="orgSelectList.length !== 0">
                <li v-for="(item,index) in orgSelectList" :key="index"
                    @click="handlerSelectOrgCode(item)">
                    {{item.name}}
                </li>
            </ul>
            <div v-else class="none-data">
                暂无搜索结果
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState, mapMutations} from 'vuex'
    import {querySelectCaiNiaoOrg} from '@/api/FullLink'
    import utils from '@/utils/utils'

    export default {
        props: {
            orgType: {
                type: String,
                default: ''
            },
            orgCode: {
                type: String,
                default: ''
            },
            headerTabType: { // 用于三错
                type: String,
                default: ''
            },
        },
        data() {
            return {
                keyword: '',
                orgSelectList: [],
                showOrgSelectDialog: false,
            }
        },
        computed: {
            ...mapState('common', ['currentDate', 'customStartDay', 'customEndDay', 'activeType', ]),
        },
        mounted() {
            window.addEventListener('touchstart', this.handlerSelectDialog)
        },
        methods: {
            // 组织机构查询
            querySelectOrg(keyword) {
                if (!keyword) {
                    return this.showOrgSelectDialog = false;
                }
                let params = {
                    orgType: this.orgType,      //查询维度:  ‘region’ 省区 ‘center’ 中心 ‘branch’ 分公司，'orgCenter' 直营中心，'customCenter' 非直营中心
                    keyword: keyword,			//查询关键词 输入code 或者 name 进行模糊查询
                    orgCode: this.orgCode,
                    queryDate: this.currentDate,
                  //  queryType: this.activeType,
                };

                querySelectCaiNiaoOrg(params).then(res => {
                    this.orgSelectList = res.data;
                    // this.showOrgSelectDialog = res.data.orgSelectList.length !== 0;
                    this.showOrgSelectDialog = true;
                })
            },
            //选择组织(回传)
            handlerSelectOrgCode(item) {
                this.$emit('handlerSelectOrgCode', item);
                this.showOrgSelectDialog = false;
                this.keyword = '';
            },
            //隐藏组织弹窗
            handlerSelectDialog(event) {
                if (this.showOrgSelectDialog) {
                    if (!this.$refs.orgList.contains(event.target)) {
                        this.showOrgSelectDialog = false;
                        this.keyword = '';
                    }
                }
            },

        },
        watch: {
            keyword() {
                utils.throttle(() => {
                    this.querySelectOrg(this.keyword);
                }, 300);
            },
        },
        destroyed() {
            window.removeEventListener('touchstart', this.handlerSelectDialog)
        },
    }
</script>
<style lang="scss" scoped>
    #searchPanel {
        display: inline-block;

        .none-data {
            text-align: center;
            color: #999999;
            background-color: #fff;
        }
    }
</style>


