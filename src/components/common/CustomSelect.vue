<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false" :style="`height: ${height}; line-height: ${height}; width: ${width}`">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ !selected.name ? '選擇縣市' : selected.name }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="
          selected = option;
          open = false;
          $emit('input', option);
        "
      >
        {{ option.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
    width: {
      type: String,
      default: null,
    },
    height: {
      type: String,
      default: null,
    }
  },
  data() {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
        ? this.options[0]
        : null,
      open: false,
    };
  },
};
</script>

<style scoped>
.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
}

.custom-select .selected {
  background-color: #0a0a0a;
  border-radius: 50px;
  color: #fff;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .selected.open {
  border-radius: 15px 15px 0px 0px;
}

.custom-select .selected:after {
  position: absolute;
  content: "";
  top: 50%;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: #fff transparent transparent transparent;
}

.custom-select .items {
  color: #fff;
  border-radius: 0px 0px 15px 15px;
  overflow: hidden;
  position: absolute;
  background-color: #0a0a0a;
  left: 0;
  right: 0;
  z-index: 1;
  height: 250px;
  overflow: auto;
}

.custom-select .items div {
  color: #fff;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .items div:hover {
  background-color: #FED801;
  color: #000;
}

.selectHide {
  display: none;
}
</style>
