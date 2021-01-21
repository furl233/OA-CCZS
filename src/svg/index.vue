<template>
    <svg :class="svgClass" aria-hidden="true" mode="open" v-on="$listeners" :style="{width: size,height:size}">
        <use :xlink:href="iconName"/>
    </svg>
</template>
 
<script>
    // 这里添加了一个size prop 是用来在外部控制svg的大小
    export default {
        name: 'SvgIcon',
        props: {
            iconClass: {
                type: String,
                required: true
            },
            className: {
                type: String,
                default: ''
            },
            size: {
                type: String,
                default: '14px'
            }
        },
        computed: {
            iconName() {
                return `#icon-${this.iconClass}`
            },
            svgClass() {
                if (this.className) {
                    return 'svg-icon ' + this.className
                } else {
                    return 'svg-icon'
                }
            }
        }
    }
</script>
 
<style scoped>
    .svg-icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
</style>