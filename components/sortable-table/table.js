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
    render(h) {
        var _this = this;
        var ths = [];
        var trs = [];
        var cols = [];
        // 表格主体内容数据处理
        this.currentData.forEach((row) => {
            var tds = [];
            this.currentColumns.forEach((cell) => {
                tds.push(h("td", row[cell.key]));
            });
            trs.push(h("tr", tds));
        });
        // 表头数据处理
        this.currentColumns.forEach((col, index) => {
            if (col.sortable) {
                ths.push(
                    h("th", [
                        h("span", col.title),
                        // 升序
                        h(
                            "a",
                            {
                                class: {
                                    on: col.sortType === "asc",
                                },
                                on: {
                                    click() {
                                        _this.handleSortByAsc(index);
                                    },
                                },
                            },
                            "↑"
                        ),
                        // 降序
                        h(
                            "a",
                            {
                                class: {
                                    on: this.sortType === "desc",
                                },
                                on: {
                                    click() {
                                        _this.handleSortByDesc(index);
                                    },
                                },
                            },
                            "↓"
                        ),
                    ])
                );
            } else {
                ths.push(h("th", col.title));
            }
            if (col.width) {
                cols.push(
                    h("col", {
                        style: {
                            width: col.width + "px",
                        },
                    })
                );
            } else {
                cols.push(h("col"));
            }
        });
        return h("table", [
            h("colgroup", cols),
            h("thead", [h("tr", ths)]),
            h("tbody", trs),
        ]);
    },
});
