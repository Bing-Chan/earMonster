/*
 * @Author: dengjihua
 * @description: no des
 * @LastEditors: dengjihua
 * @LastEditTime: 2020-07-28 17:04:02
 * @Date: 2020-07-14 14:39:40
 */ 

let columnIdSeed = 0
export default {
    name: 'yto-table-column',
    computed: {
        tableColumnId () {
            return 'columnId-' + (columnIdSeed++)
        },
        table () {
            return this.$parent
        }
    },
    props: {
        label: String,
        prop: String,
        width: String,
        align: String,
        type: String,
        className: String,
        sortable: Boolean,
        show: Boolean,
        click: Boolean,
        fixed: String
    },
    methods: {
        renderCell (data, rowIndex, columnIndex) {
            
            if (this.type === 'index') return rowIndex;
            
            if (this.$scopedSlots.default) {

                return this.$scopedSlots.default({
                    $index: rowIndex, 
                    row: data, 
                    $value: this.prop ? data[this.prop] : null, 
                    $prop: this.prop || null,
                    $columnIndex: columnIndex
                });
            }

            if (this.prop) return data[this.prop];

            return null;
        }
    },
    created () {
        let column = {
            tableId: this.table.tableId,
            columnId: this.tableColumnId,
            label: this.label,
            prop: this.prop,
            width: this.width,
            slots: this.$slots.default,
            align: this.align,
            renderCell: this.renderCell,
            type: this.type,
            class: (this.table.headerCellClassName ? this.table.headerCellClassName + ' ' : '') + (this.className ? '' + this.className : ''),
            sortable: this.sortable,
            show: this.show,
            click: this.click
        }
        this.table.store.insertColumn(column)
    },
    render (h) {

        return h('div', this.$slots.default)
    }
}
