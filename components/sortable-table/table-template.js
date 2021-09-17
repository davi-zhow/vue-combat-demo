Vue.component("vTable", {
    props: {
        columns: {
            type: Array,
            default() {
                return [];
            },
        },
        data: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    data() {
        return {
            currentColumns: [],
            currentData: [],
        };
    },
    watch: {
        data() {
            this.makeData();
            var sortedColumn = this.currentColumns.filter((col) => {
                return col._sortType !== "normal";
            });
            if (sortedColumn.length > 0) {
                if (sortedColumn[0]._sortType === "asc") {
                    this.handleSortByAsc(sortedColumn[0]._index);
                } else {
                    this.handleSortByDesc(sortedColumn[0]._index);
                }
            }
        },
    },
    mounted() {
        this.makeColumns();
        this.makeData();
    },
    methods: {
        // 表头数据格式化
        makeColumns() {
            this.currentColumns = this.columns.map((col, index) => {
                // 添加一个字段标识当前列排序的状态，后续使用
                col._sortType = "normal";
                // 添加一个字段标识当前列在数组中的索引，后续使用
                col._index = index;
                return col;
            });
        },

        // 内容数据格式化
        makeData() {
            this.currentData = this.data.map((row, index) => {
                // 添加一个字段标识当前行在数组中的索引，后续使用
                row._index = index;
                return row;
            });
        },

        // 升序处理
        handleSortByAsc(index) {
            var key = this.currentColumns[index].key;
            //重置表头排序状态
            this.currentColumns.forEach((col) => {
                col._sortType = "normal";
            });
            // 将当前列设置为升序
            this.currentColumns[index]._sortType = "asc";

            // 对列表内容进行排序
            this.currentData.sort((a, b) => {
                return a[key] > b[key] ? 1 : -1;
            });
        },
        //降序处理
        handleSortByDesc(index) {
            var key = this.currentColumns[index].key;
            //重置表头排序
            this.currentColumns.forEach((col) => {
                col._sortType = "normal";
            });
            // 将当前列设置为升序
            this.currentColumns[index]._sortType = "desc";

            // 对列表内容进行排序
            this.currentData.sort((a, b) => {
                return a[key] < b[key] ? 1 : -1;
            });
        },
    },
    template: `
        <table>
            <colgroup>
                <col v-for="(item,index) in currentColumns" :style="{width:item.width + 'px'}" :key="index">
            </colgroup> 
            <thead>
                <th v-for="(item,index) in currentColumns" :key="index">
                    {{item.title}}
                    <template v-if="item.sortable">
                    <span>
                        <a :class="{on:item._sortType === 'asc'}" @click="handleSortByAsc(index)">↑</a>
                    </span>
                    <span>
                        <a :class="{on:item._sortType === 'desc'}" @click="handleSortByDesc(index)">↓</a>
                    </span>
                    </template>
                </th>
            </thead>
            <tbody>
                <tr v-for="(row,index) in currentData" :key="index">
                    <td v-for="(col,index) in currentColumns">
                        {{row[col.key]}}
                    </td>
                </tr>
            </tbody>
    
    `,
});
