<template>
  <div>
    <h2 class="title">你买的什么书？”</h2>
    <p class="answer">——“编程。”</p>
    <p class="question">“C++ 还是 Java？”</p>
    <p class="answer">——“沈从文。”</p>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.title {
  font-weight: 700;
  font-size: 16px;
}

.answer,
.question {
  margin-top: 16px;
}

.title,
.question {
  color: @primary;
}

.answer {
  color: @info;
}
</style>
