const appBase = process.env.PREPROD_APP_URL ?? "";
const token = (value) => (appBase ? `${appBase}/l/${value}` : `https://magic-link.onir-cms.tech/l/${value}`);

export default {
  simple: token("6jz9EpfYfGyh-gwRr6JOoaTcqwc1nQgX"),
  immersive: token("kp_CX9lKNdHhLOLO-h-W9Fj1G3s1xbiL"),
  sponsor: token("PRoc__QYCoD6781oNeRruH_LEkZ5wmK7"),
};
