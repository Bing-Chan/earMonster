/*
 * @Author: dengjihua
 * @description: no des
 * @LastEditors: dengjihua
 * @LastEditTime: 2020-07-29 13:57:34
 * @Date: 2020-07-28 14:19:00
 */ 

export default {
    name: 'table-body',
    inject: ['table'],
    props: {
        store: {
            require: true
        }
    },
    methods: {
        getBodyCellStyle (column) {
            let attrs = {};

            if (column.width) {

                attrs['style'] = {width: column.width + 'px'};

                attrs['class'] = 'planArriveTime'
            }

            if (column['text-align']) attrs['style'] = attrs['style'] ? {...attrs['style'], 'text-align': column.align} : {'text-align': column.align};

            if (this.table.cellClassName) attrs['class'] = attrs['class'] ? attrs['class'] + ' ' + this.table.cellClassName : this.table.cellClassName;

            return attrs
        },

        loadMore () {
            if (this.table.infiniteScroll) this.table.$emit('loadMore');
        }
    },
    render () {
        let tableData = this.table.tableData
        let columns = this.store.getColumns()
        /**
         * v-infinite-scroll="loadMore"
            infinite-scroll-disabled="pageLoading"
            infinite-scroll-distance="20"
         */
        return (
            <div 
            class="infiniteScroll"
            v-infinite-scroll={this.loadMore}
            infinite-scroll-disabled={this.table.pageLoading}
            infinite-scroll-distance={20}
            >
                {
                    tableData.map((row, index) => (
                        <ul class="list-body" ref={index === tableData.length - 1 ? 'lastRow' : ''} onClick={() => this.table.$emit('rowClick', row)}>
                            {
                                columns.map((column, columnIndex) => <li {...this.getBodyCellStyle(column)}>{column.renderCell(row, index, columnIndex)}</li>)
                            }
                        </ul>
                    ))
                }
                {
                    this.table.pageLoading ? <div class="loading-panel"><mt-spinner type="fading-circle" size={30} /></div> : (

                        tableData.length === 0 ? (
                            <ul class="list-foot">
                                {
                                    this.table.searchType === 1 ? <li>暂无搜索结果<span class="refresh-btn">返回</span></li> : <li>暂无数据</li>
                                }
                            </ul>
                        ) : <div class="loading-panel"><div class="no-more">我也是有底线的...</div></div>
                    )
                }
            </div>
        )
    }
}
