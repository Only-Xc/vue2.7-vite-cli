<template>
  <div>
    <div class="colors">
      <div class="colors-item primary">primary</div>
      <div class="colors-item success">success</div>
      <div class="colors-item warning">warning</div>
      <div class="colors-item danger">danger</div>
      <div class="colors-item info">info</div>
    </div>

    <p class="tips">Less 全局变量在 styles/global/variables.less 中定义</p>

    <p class="one-line">
      Less全局方法：单行文本省略单行文本省略单行文本省略单行文本省略单行文本省略单行文本省略单行文本省略单行文本省略
    </p>
    <p class="more-line">
      Less全局方法：多行文本省略多行文本省略多行文本省略多行文本省略多行文本省略多行文本省略多行文本省略多行文本省略
    </p>

    <p class="tips">Less 全局方法在 styles/global/utils.less 中定义</p>

    <StyleTxt></StyleTxt>

    <p class="tips">
      Vue2.7 样式穿透使用 ::v-deep(selector) :deep(selector) 选择器
    </p>
  </div>
</template>

<script>
import StyleTxt from './components/StyleTxt.vue'
export default {
  components: {
    StyleTxt
  }
}
</script>

<style lang="less" scoped>
.colors {
  margin-bottom: 16px;

  &-item {
    display: inline-block;
    width: 120px;
    margin-right: 16px;
    padding: 16px;
    color: #fff;
    font-size: 14px;
    text-align: center;

    &.primary {
      background-color: @primary;
    }

    &.success {
      background-color: @success;
    }

    &.warning {
      background-color: @warning;
    }

    &.danger {
      background-color: @danger;
    }

    &.info {
      background-color: @info;
    }
  }
}

.one-line {
  width: 300px;
  margin-bottom: 16px;
  .ellipsis();
}

.more-line {
  width: 300px;
  .multi-ellipsis(3);
}

.tips {
  margin: 16px 0;
  padding: 8px 16px;
  font-size: 12px;
  background-color: #fff;
}

::v-deep(.title) {
  color: @danger;
}

:deep(.answer) {
  color: @success;
}
</style>
