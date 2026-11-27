// HTML for the deal list and the expanded detail of one deal.
// Every value from the data is escaped before it reaches the page.

import { checkedLabel, percentOff, saved, usd, usdShort, verdictLabel } from "./verdict.js";

const escape = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export function dealRow(d, open) {
  const pct = percentOff(d);
  return `<article class="deal verdict-${d.verdict}" data-id="${escape(d.id)}">
  <button class="deal-main" data-open="${escape(d.id)}" aria-expanded="${open ? "true" : "false"}">
    <span class="deal-title">${escape(d.title)}</span>
    <span class="deal-meta">${escape(d.store)} · ${escape(d.category)}</span>
    <span class="deal-price">${usdShort(d.price)} <s>${usdShort(d.was)}</s></span>
    <span class="deal-off">−${pct}%</span>
    <span class="deal-save">save ${usd(saved(d))}</span>
    <span class="deal-badge">${verdictLabel(d.verdict)}</span>
  </button>
  ${open ? dealDetail(d) : ""}
</article>`;
}

export function dealDetail(d) {
  return `<div class="detail">
  <p class="detail-why"><strong>Why this verdict:</strong> ${escape(d.why)}</p>
  <dl class="detail-facts">
    <dt>Store</dt><dd>${escape(d.store)}</dd>
    <dt>Sale price</dt><dd>${usd(d.price)}</dd>
    <dt>Usual price</dt><dd>${usd(d.was)}</dd>
    <dt>You save</dt><dd>${usd(saved(d))} (${percentOff(d)}% off)</dd>
    <dt>Price checked</dt><dd>${checkedLabel(d.checked)}</dd>
    <dt>Read in</dt><dd>${escape(d.source)}</dd>
  </dl>
  <p><a class="shop-link" href="${escape(d.url)}" target="_blank" rel="noopener">Shop it at ${escape(d.store)} ↗</a>
  <span class="detail-note">Link opens the store's search for this product. Prices move on Black Friday — confirm at checkout.</span></p>
</div>`;
}

export function emptyList() {
  return `<p class="empty">No deal matches those filters. Clear the search or widen the discount to see the full board.</p>`;
}
