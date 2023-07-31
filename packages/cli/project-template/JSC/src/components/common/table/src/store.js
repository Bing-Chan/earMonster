/*
 * @Author: dengjihua
 * @description: no des
 * @LastEditors: dengjihua
 * @LastEditTime: 2020-07-28 15:11:41
 * @Date: 2020-07-14 16:42:30
 */ 
export default class TableStore {
    constructor (tableId) {
        this.storeId = 'store-' + tableId
        this.columns = []
        this.columnLabelMap = {}
    }
    insertColumn (column) {
        this.columns.push(column)
        this.columnLabelMap[column.columnId] = column.label
    }
    getColumns () {
        return this.columns
    }
    updateColumn() {
        this.columns = []
        this.columnLabelMap = {}
    }
}
