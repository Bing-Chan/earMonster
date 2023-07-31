/*
 * @Author: dengjihua
 * @description: no des
 * @LastEditors: dengjihua
 * @LastEditTime: 2020-07-29 13:57:41
 * @Date: 2020-07-14 13:45:17
 */ 
export default {
    name: 'table-head',
    inject: ['table'],
    data () {
        return {
            columns: [],
            sortType: '',
            sortColumn: ''
        }
    },
    props: {
        store: {
            require: true
        }
    },
    methods: {
        getHeaderCellStyle (column) {
            let attrs = {};
            if (column.width) {

                attrs['style'] = {width: column.width + 'px'};

                attrs['class'] = 'planArriveTime'
            }

            if (column.class) attrs['class'] = attrs['class'] ? attrs['class'] + ' ' + column.class : column.class;

            return attrs;
        },
        getSortClassName (prop) {
            
            if (prop !== this.sortColumn || !this.sortType) return {class: 'icon-sort-default'}

            if (this.sortType === 'DESC') return {class: 'icon-sort-desc'}

            if (this.sortType === 'ASC') return {class: 'icon-sort-asc'}

        },
        handlerSort (column) {

            if (column.sortable) {
                
                this.sortType = this.sortType === 'DESC' ? 'ASC' : 'DESC';

                this.sortColumn = column.prop

                this.table.$emit('sort', {sortColumn: column.prop, sortType: this.sortType})

            }
        }
    },
    created() {
        this.columns = this.store.getColumns()
        let {sortType, sortColumn} = this.table.defaultSort
        this.sortType = sortType || ''
        this.sortColumn = sortColumn || ''
    },
    render (h) {
        let columns = this.store.getColumns();
        return (

            <ul class="list-head">
                {
                    columns.map(column => <li onClick={() => this.handlerSort(column)} {...this.getHeaderCellStyle(column)}>
                        {column.label}
                        {
                            column.sortable && (
                                <i {...this.getSortClassName(column.prop)}></i>
                            )
                        }
                    </li>)
                }
               
           </ul>
        )
    }
}
