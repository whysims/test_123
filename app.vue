<script>
import "~/assets/css/index.css";
const { x, y } = useMouse();

export const getMousePos = (event) => {
  var doc = document.documentElement || document.body;
  var pos = {
    x: event ? event.pageX : x + doc.scrollLeft - doc.clientLeft,
    y: event ? event.pageY : y + doc.scrollTop - doc.clientTop,
  };
  return pos;
};

export const moveMouse = (event) => {
  var pos = getMousePos(event),
    followMouse = document.getElementById("moving-gradient");
  if (!followMouse) return;
  followMouse.style.backgroundPosition = pos.x + "px " + pos.y + "px";
};

if (document) {
  document.addEventListener("mousemove", moveMouse);
}
</script>
<template>
  <div class="font-Montserrat antialiased min-h-svh bg-slate-100">
    <div class="container mx-auto">
      <NuxtPage />
    </div>
  </div>
</template>
