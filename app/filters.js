// Filtering and sorting for the deal list. Pure functions over the deal array,
// so the page can re-render on every keystroke without touching the data.

import { VERDICT_RANK, percentOff, saved } from "./verdict.js";

export function categoriesOf(deals) {
  const seen = [];
  for (const d of deals) if (!seen.includes(d.category)) seen.push(d.category);
  return seen;
}

export function storesOf(deals) {
  const seen = [];
  for (const d of deals) if (!seen.includes(d.store)) seen.push(d.store);
  return seen;
}

// state: { q, category, store, minOff, verdict, sort }
export function applyFilters(deals, state) {
  const q = (state.q || "").trim().toLowerCase();
  return deals.filter((d) => {
    if (q && !`${d.title} ${d.store} ${d.category}`.toLowerCase().includes(q)) return false;
    if (state.category !== "all" && d.category !== state.category) return false;
    if (state.store !== "all" && d.store !== state.store) return false;
    if (state.verdict !== "all" && d.verdict !== state.verdict) return false;
    if (state.minOff > 0 && percentOff(d) < state.minOff) return false;
    return true;
  });
}

export function applySort(shown, sort) {
  const rows = [...shown];
  if (sort === "discount") rows.sort((a, b) => percentOff(b) - percentOff(a) || saved(b) - saved(a));
  else if (sort === "saving") rows.sort((a, b) => saved(b) - saved(a));
  else if (sort === "price-low") rows.sort((a, b) => a.price - b.price);
  else if (sort === "price-high") rows.sort((a, b) => b.price - a.price);
  else rows.sort((a, b) => VERDICT_RANK[a.verdict] - VERDICT_RANK[b.verdict] || saved(b) - saved(a) || percentOff(b) - percentOff(a));
  return rows;
}
