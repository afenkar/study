/**
 * H5 Demo · 交互
 * - --vh：缓解移动端 100vh 不准
 * - 弹层：滚动锁 + 关闭后短延迟，降低点击穿透
 * - 图片：IntersectionObserver 懒加载
 */

const booths = [
  {
    name: "陶土小作坊",
    meta: "体验制陶 · 剩余 8 席",
    // 占位图：真实项目换成 CDN；这里用渐变 data/外部图演示懒加载
    img: "https://picsum.photos/seed/booth1/320/240",
  },
  {
    name: "慢煮咖啡车",
    meta: "手冲试喝 · 剩余 5 席",
    img: "https://picsum.photos/seed/booth2/320/240",
  },
  {
    name: "街头原声",
    meta: "快闪演出 · 观众免费",
    img: "https://picsum.photos/seed/booth3/320/240",
  },
  {
    name: "亲子绘本角",
    meta: "故事会 · 剩余 12 席",
    img: "https://picsum.photos/seed/booth4/320/240",
  },
];

function setVh() {
  document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
}

setVh();
window.addEventListener("resize", setVh);

const listEl = document.getElementById("booth-list");
listEl.innerHTML = booths
  .map(
    (b) => `
  <li class="booth">
    <img class="booth__img" alt="" data-src="${b.img}" width="160" height="120" />
    <div class="booth__body">
      <p class="booth__name">${b.name}</p>
      <p class="booth__meta">${b.meta}</p>
    </div>
  </li>`
  )
  .join("");

/** 懒加载：进入视口再赋 src */
const lazyImgs = listEl.querySelectorAll("img[data-src]");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        io.unobserve(img);
      });
    },
    { rootMargin: "80px 0px" }
  );
  lazyImgs.forEach((img) => io.observe(img));
} else {
  lazyImgs.forEach((img) => {
    img.src = img.dataset.src;
  });
}

const modal = document.getElementById("modal");
const toast = document.getElementById("toast");
let closeTimer = null;

function openModal() {
  modal.hidden = false;
  document.body.classList.add("is-locked");
}

function closeModal() {
  modal.hidden = true;
  document.body.classList.remove("is-locked");
  // 点击穿透：遮罩关闭瞬间底层可能吃到 touch/click，短延迟再允交互
  clearTimeout(closeTimer);
  document.body.style.pointerEvents = "none";
  closeTimer = setTimeout(() => {
    document.body.style.pointerEvents = "";
  }, 300);
}

function showToast(text) {
  toast.textContent = text;
  toast.hidden = false;
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => {
    toast.hidden = true;
  }, 1800);
}

document.getElementById("btn-rule").addEventListener("click", openModal);
document.getElementById("btn-close-modal").addEventListener("click", closeModal);
modal.querySelector(".modal__mask").addEventListener("click", closeModal);

document.getElementById("btn-scroll-form").addEventListener("click", () => {
  document.getElementById("signup-form").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.getElementById("signup-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  if (!/^1\d{10}$/.test(String(data.phone || ""))) {
    showToast("请填写正确手机号");
    return;
  }
  localStorage.setItem("h5-lab-signup", JSON.stringify({ ...data, at: Date.now() }));
  showToast("报名已保存到本地");
  e.target.reset();
});
