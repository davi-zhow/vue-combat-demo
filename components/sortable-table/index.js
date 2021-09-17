var app = new Vue({
    el: "#app",
    data: {
        columns: [
            {
                title: "姓名",
                width: 300,
                key: "name",
            },
            {
                title: "年龄",
                key: "age",
                sortable: true,
            },
        ],
        data: [
            {
                name: "王二小",
                age: 12,
                birthday: "2009-09-09",
                address: "北京市朝阳区芍药居",
            },
            {
                name: "张晓光",
                age: 25,
                birthday: "1996-09-09",
                address: "北京市海淀区西二旗",
            },
            {
                name: "李晓红",
                age: 30,
                birthday: "1991-09-09",
                address: "上海市浦东新区世纪大道",
            },
            {
                name: "周小伟",
                age: 31,
                birthday: "1990-09-09",
                address: "深圳市南山区深南大道",
            },
        ],
    },
    methods: {
        handleAddData() {
            this.data.push({
                name: "刘冰",
                age: 21,
                birthday: "2020-09-09",
                address: "深圳市南山区深南大道",
            });
        },
    },
});
