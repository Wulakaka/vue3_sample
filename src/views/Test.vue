<template>
  <div>测试rem</div>
  <input type="text" placeholder="测试" />
</template>

<script>
export default {
  name: "Test",
};
</script>

<style scoped lang="scss">
div {
  width: 100px;
  height: 100px;
  background: aquamarine;
}
::placeholder {
  color: red;
}
</style>
