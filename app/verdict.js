// Verdicts: the "is it really a deal" signal. Each deal in data.js carries a
// verdict chosen when its price was checked, plus the evidence in its `why`.
// This file only turns those verdicts into labels and numbers for the page.

export const VERDICTS = {
  true: { label: "TRUE DEAL", blurb: "A real low — the deepest cut, a record price, or half off a real usual price." },
  strong: { label: "STRONG PRICE", blurb: "A solid cut worth buying — a good price, just not the lowest ever." },
  routine: { label: "ROUTINE SALE", blurb: "A small cut on a real price. Fine if you need it now, not a reason to rush." },
  weak: { label: "WEAK — CHECK FIRST", blurb: "The discount looks big against the list price, but the price is still high against its own history." },
};

export function verdictLabel(v) {
  return (VERDICTS[v] || VERDICTS.routine).label;
}

export function verdictBlurb(v) {
  return (VERDICTS[v] || VERDICTS.routine).blurb;
}

// Verdicts rank true first, then strong, routine, weak — so the best deals
// sort to the top by default.
export const VERDICT_RANK = { true: 0, strong: 1, routine: 2, weak: 3 };

export function usd(n) {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function usdShort(n) {
  return Number.isInteger(n) ? "$" + n.toLocaleString("en-US") : usd(n);
}

export function percentOff(d) {
  return Math.round((1 - d.price / d.was) * 100);
}

export function saved(d) {
  return d.was - d.price;
}

// "Nov 27, 7:20 AM UTC" from an ISO timestamp (the year is on the page).
export function checkedLabel(iso) {
  const dt = new Date(iso);
  return dt.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  }) + " UTC";
}
