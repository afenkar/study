/**
 * mock 数据：真实项目换成 wx.request
 * 面试可以说：开发期 mock，联调后替换 api 层
 */
const booths = [
  {
    id: "b1",
    name: "陶土小作坊",
    tag: "手作",
    seats: 8,
    desc: "现场拉坯体验，约 40 分钟，适合新手。",
  },
  {
    id: "b2",
    name: "慢煮咖啡车",
    tag: "美食",
    seats: 5,
    desc: "手冲试喝与豆子零售，名额有限。",
  },
  {
    id: "b3",
    name: "街头原声",
    tag: "音乐",
    seats: 20,
    desc: "快闪观演预约，无需器材。",
  },
  {
    id: "b4",
    name: "亲子绘本角",
    tag: "亲子",
    seats: 12,
    desc: "故事会 + 简笔画，建议家长陪同。",
  },
];

function getBooths() {
  return booths.map(({ id, name, tag, seats }) => ({ id, name, tag, seats }));
}

function getBoothById(id) {
  return booths.find((b) => b.id === id) || null;
}

module.exports = {
  getBooths,
  getBoothById,
};
