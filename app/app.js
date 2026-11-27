// Black Friday Verdict: wire the controls, render the list, keep the URL in
// sync so a filtered view can be screenshotted or shared. No network requests:
// every deal lives in data.js, loaded once at page load.

import { deals, CHECKED_AT } from "./data.js";
import { applyFilters, applySort, categoriesOf, storesOf } from "./filters.js";
import { dealRow, emptyList } from "./render.js";
import { checkedLabel, percentOff, saved, usd, verdictLabel } from "./verdict.js";

const list = document.getElementById("deal-list");
const count = document.getElementById("result-count");
const searchInput = document.getElementById("search");
const categoryBar = document.getElementById("categories");
const storeSelect = document.getElementById("store");
const offSelect = document.getElementById("min-off");
const verdictSelect = document.getElementById("verdict");
const sortSelect = document.getElementById("sort");
const clearBtn = document.getElementById("clear-filters");

// Read a preset from the URL (?q=, ?category=, ?store=, ?min-off=, ?verdict=,
// ?sort=, ?open=<deal id>) so a filtered view is a real address, not a trick.
function stateFromUrl() {
  const p = new URLSearchParams(location.search);
  return {
    q: p.get("q") || "",
    category: p.get("category") || "all",
    store: p.get("store") || "all",
    minOff: Number(p.get("min-off") || 0),
    verdict: p.get("verdict") || "all",
    sort: p.get("sort") || "best",
    open: p.get("open") || null,
  };
}

const state = stateFromUrl();

// Board totals, computed from the same data the list shows.
function renderStats() {
  const trueCount = deals.filter((d) => d.verdict === "true").length;
  const totalSaved = deals.reduce((sum, d) => sum + saved(d), 0);
  document.getElementById("stat-deals").textContent = deals.length;
  document.getElementById("stat-true").textContent = trueCount;
  document.getElementById("stat-saved").textContent = usd(totalSaved);
  document.getElementById("stat-checked").textContent = checkedLabel(CHECKED_AT);
}

function renderCategories() {
  const cats = ["all", ...categoriesOf(deals)];
  categoryBar.innerHTML = cats
    .map(
      (c) =>
        `<button type="button" class="chip${state.category === c ? " active" : ""}" data-category="${c}">${
          c === "all" ? "All categories" : c
        }</button>`,
    )
    .join("");
}

function renderStores() {
  storeSelect.innerHTML =
    `<option value="all">All stores</option>` +
    storesOf(deals).map((s) => `<option value="${s}"${state.store === s ? " selected" : ""}>${s}</option>`).join("");
}

function syncControls() {
  searchInput.value = state.q;
  offSelect.value = String(state.minOff);
  verdictSelect.value = state.verdict;
  sortSelect.value = state.sort;
}

function render() {
  window.__shotReady = false;
  const shown = applySort(applyFilters(deals, state), state.sort);
  count.textContent =
    shown.length === deals.length
      ? `${shown.length} deals`
      : `${shown.length} of ${deals.length} deals`;
  list.innerHTML = shown.length === 0 ? emptyList() : shown.map((d) => dealRow(d, state.open === d.id)).join("");
  const params = new URLSearchParams();
  if (state.q) params.set("q", state.q);
  if (state.category !== "all") params.set("category", state.category);
  if (state.store !== "all") params.set("store", state.store);
  if (state.minOff) params.set("min-off", String(state.minOff));
  if (state.verdict !== "all") params.set("verdict", state.verdict);
  if (state.sort !== "best") params.set("sort", state.sort);
  if (state.open) params.set("open", state.open);
  const query = params.toString();
  try {
    history.replaceState(null, "", query ? `?${query}` : location.pathname);
  } catch {
    // file:// origins may refuse history updates; the list already rendered.
  }
  window.__shotReady = true;
}

searchInput.addEventListener("input", () => {
  state.q = searchInput.value;
  render();
});
categoryBar.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-category]");
  if (!btn) return;
  state.category = btn.dataset.category;
  categoryBar.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c === btn));
  render();
});
storeSelect.addEventListener("change", () => {
  state.store = storeSelect.value;
  render();
});
offSelect.addEventListener("change", () => {
  state.minOff = Number(offSelect.value);
  render();
});
verdictSelect.addEventListener("change", () => {
  state.verdict = verdictSelect.value;
  render();
});
sortSelect.addEventListener("change", () => {
  state.sort = sortSelect.value;
  render();
});
clearBtn.addEventListener("click", () => {
  state.q = "";
  state.category = "all";
  state.store = "all";
  state.minOff = 0;
  state.verdict = "all";
  state.sort = "best";
  state.open = null;
  renderCategories();
  syncControls();
  render();
});
list.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-open]");
  if (!btn) return;
  state.open = state.open === btn.dataset.open ? null : btn.dataset.open;
  render();
  if (state.open) {
    const row = list.querySelector(`[data-id="${state.open}"]`);
    if (row) row.scrollIntoView({ block: "nearest" });
  }
});

renderStats();
renderCategories();
renderStores();
syncControls();
render();
if (state.open) {
  const row = list.querySelector(`[data-id="${state.open}"]`);
  if (row) row.scrollIntoView({ block: "start" });
}
