<script setup lang="ts">
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  showProgress: true,
  steps: [
    { element: '#title', popover: { title: 'My title', description: 'This is a beautiful title.' } },
    { element: '#description', popover: { title: 'Lorem Ipsum', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' } },
    { element: '#btn-home', popover: { title: 'Home button', description: 'To return to the homepage click on this button' } },
    { element: '#btn-driver', popover: { title: 'Driver button launcher', description: 'To relaunch driver click on this button' } },
  ],
  onDestroyStarted: () => {
    localStorage.setItem("driverjs", "true");
    driverObj.destroy();
  },
});

onMounted(() => {
  const driver: string = localStorage.getItem("driverjs") || "false";
  if (driver === "false") {
    driverObj.drive();
  }
})

</script>

<template>
  <div id="body">
    <div class="container">
      <h1 id="title">
        This is the title
      </h1>
      <span id="description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin bibendum, dui vel interdum sodales, quam elit feugiat diam, ac ultrices tellus tortor et nisi. Sed eget mollis orci, ac egestas nisl. Mauris a vehicula sem. Morbi id elit vel nunc lobortis elementum eu non dui. Morbi blandit, sapien a egestas auctor, libero orci ornare odio, id mattis ligula tortor sed nulla. Fusce vitae turpis malesuada nibh ornare vulputate quis ut est. Quisque posuere, quam sit amet porttitor dictum, leo mauris ullamcorper eros, quis eleifend velit mauris sit amet felis. Suspendisse potenti. Pellentesque molestie velit et odio suscipit, sed vehicula massa gravida.

        Ut rutrum ante non ligula luctus imperdiet. Nam dolor sem, dignissim eget congue in, ornare vitae nisl. Donec non leo non sapien interdum porttitor. Integer purus turpis, cursus ut purus id, semper pulvinar risus. Cras feugiat arcu et velit aliquet, vitae sodales leo volutpat. Integer consequat ex non lectus tincidunt ornare. Sed mattis ex nec porttitor consequat. Duis vulputate ut purus nec pellentesque. Phasellus consectetur finibus odio, id efficitur augue pretium sit amet. Nullam purus metus, elementum sit amet libero non, faucibus pellentesque nunc. Aenean urna neque, faucibus quis sem vestibulum, vulputate ultrices neque. Pellentesque viverra molestie tellus id vestibulum. Aliquam cursus augue eget convallis suscipit. Maecenas sed ex porta, molestie orci consectetur, interdum metus. Sed elementum faucibus venenatis.
      </span>
      <br />
      <v-btn id="btn-driver" @click="() => driverObj.drive()">Relaunch Driver</v-btn>
    </div>
  </div>
</template>

<style lang="css" scoped>
#body {
  display: flex;
  justify-content: center;
  width: 100%;
}
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: min(70vh, 80%);
  max-width: 600px;
}
</style>
