Vue.component("tabs", {
    template: `
    <div class="tabs">
        <div class="tabs-bar">
            <!--标签页标题，这里要用v-for-->
            <div 
                :class="tabCls(item)"
                v-for="(item,index) in navList"
                @click="handleChange(index)">
                {{item.label}}
            </div>
        </div>
        <div class="tabs-content">
        <!-- 这里的slot就是嵌套的pane -->
            <slot></slot>
        </div>
    </div>
    `,
    props: {
        value: {
            type: [String, Number],
        },
    },
    data() {
        return {
            // 用于渲染tabs的标题
            navList: [],
            currentValue: this.value,
        };
    },
    watch: {
        value(val) {
            this.currentValue = val;
        },
    },
    methods: {
        getTabs() {
            debugger;
            let slot = this.$slots.default;
            console.log(slot);
            let children = this.$children;
            // 通过遍历子组件，得到所有的pane组件
            return children.filter(function (item) {
                return item.$options.name === "pane";
            });
        },
        updateNav() {
            this.navList = [];
            this.getTabs().forEach((pane, index) => {
                //如果么有给pane设置name,默认设置他的索引
                if (!pane.name) {
                    pane.name = index;
                }
                this.navList.push({
                    label: pane.label,
                    name: pane.name,
                });
                // 如果没有指定要选中的tab，默认选中第一项
                if (!this.currentValue && index === 0) {
                    this.currentValue = pane.name;
                }
                //更新pane显示状态
                pane.show = pane.name === this.currentValue;
            });
        },
        updateStatus() {
            console.log("updateStatus调用");
            this.getTabs().forEach((tab) => {
                return (tab.show = tab.name === this.currentValue);
            });
        },
        tabCls(item) {
            return [
                "tabs-tab",
                {
                    "tabs-tab-active": item.name === this.currentValue,
                },
            ];
        },

        // 点击tab 标题时触发
        handleChange(index) {
            var nav = this.navList[index];
            var name = nav.name;
            // 改变当前选中的tab，并触发下面的watch
            this.currentValue = name;
            this.updateStatus();
            // 更新value
            this.$emit("input", name);
            //触发一个自定义事件，供父级组件使用
            this.$emit("on-click", name);
        },
    },
});
