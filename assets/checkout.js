/* ═══════════════════════════════════════════════════════════════
   UNBREAKABLE SOLE — Spiffy checkout drawer (mock preview)
   ───────────────────────────────────────────────────────────────
   A slide-in checkout drawer. Shows an on-brand MOCK of the Spiffy
   checkout. To go LIVE, paste your Spiffy checkout URL below — the
   real Spiffy form then replaces the preview inside the drawer.
   The mock price is cosmetic; the live Spiffy form shows real pricing.
   ═══════════════════════════════════════════════════════════════ */
window.US_SPIFFY_CHECKOUT_URL = window.US_SPIFFY_CHECKOUT_URL || ""; // e.g. "https://secure.darrenhardy.com/checkout/unbreakable-sole"
var US_BOOK_PRICE = 24.95;   // placeholder shown in the mock only
var US_BOOK_IMG   = "assets/98c4b7e6_9dc97fc9c0a88c0b3335df172fcbabdd48094a471.webp";

(function () {
  if (window.__usCheckoutInit) return; window.__usCheckoutInit = true;

  var CSS = `
  .us-ck-overlay{position:fixed;inset:0;background:rgba(24,36,44,.55);opacity:0;transition:opacity .34s ease;z-index:99998;}
  .us-ck-overlay.open{opacity:1;}
  body.us-ck-open{overflow:hidden;}
  .us-ck{position:fixed;top:0;right:0;height:100%;width:460px;max-width:100vw;background:#f4f8fb;
    color:#3c4a54;z-index:99999;display:flex;flex-direction:column;transform:translateX(100%);
    transition:transform .34s cubic-bezier(.4,0,.2,1);box-shadow:-16px 0 48px rgba(24,36,44,.28);
    font-family:"proxima-nova","Helvetica Neue",Arial,sans-serif;--blue:#43748f;--gold:#e8bc6c;--yellow:#ffdd60;}
  .us-ck.open{transform:none;}
  .us-ck *{box-sizing:border-box;}
  .us-ck-close{position:absolute;top:12px;right:12px;width:34px;height:34px;border:0;border-radius:50%;
    background:rgba(255,255,255,.18);color:#fff;font-size:17px;line-height:34px;cursor:pointer;z-index:2;transition:background .15s;}
  .us-ck-close:hover{background:rgba(255,255,255,.34);}
  .us-ck-head{background:linear-gradient(135deg,#4a7c98,#3a6480);color:#fff;padding:22px 22px 20px;}
  .us-ck-eyebrow{font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;opacity:.85;
    display:flex;align-items:center;gap:7px;}
  .us-ck-eyebrow::before{content:"";width:7px;height:7px;border-radius:50%;background:var(--gold);box-shadow:0 0 8px var(--gold);}
  .us-ck-title{font-size:23px;font-weight:800;letter-spacing:.01em;margin:7px 0 3px;}
  .us-ck-title span{color:var(--gold);}
  .us-ck-sub{font-size:12.5px;opacity:.9;font-style:italic;line-height:1.4;}
  .us-ck-body{flex:1;overflow-y:auto;padding:18px 22px 26px;}
  .us-ck-flag{font-size:11px;font-weight:600;color:#7a5a12;background:#fdf3d6;border:1px solid #f0dca0;
    border-radius:7px;padding:7px 10px;margin:0 0 16px;text-align:center;}
  .us-ck-prod{display:flex;gap:13px;align-items:center;background:#fff;border:1px solid #e2ebf1;border-radius:11px;padding:12px;margin:0 0 18px;}
  .us-ck-prod img{width:52px;height:auto;border-radius:4px;box-shadow:0 3px 10px rgba(67,116,143,.25);}
  .us-ck-prod .n{font-weight:800;color:#365d73;font-size:15px;line-height:1.2;}
  .us-ck-prod .f{font-size:11.5px;color:#7c8a94;margin-top:2px;}
  .us-ck-prod .p{margin-left:auto;font-weight:800;color:#365d73;font-size:16px;white-space:nowrap;}
  .us-ck-grp{margin:0 0 18px;}
  .us-ck-grp-t{font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--blue);margin:0 0 9px;}
  .us-ck-field{display:block;margin:0 0 9px;}
  .us-ck-field span{display:block;font-size:11.5px;font-weight:600;color:#5a6b76;margin:0 0 4px;}
  .us-ck-field input,.us-ck-field select{width:100%;border:1px solid #cfdbe4;border-radius:8px;padding:10px 11px;
    font-size:14px;color:#2f3d46;background:#fff;font-family:inherit;transition:border-color .12s,box-shadow .12s;}
  .us-ck-field input:focus,.us-ck-field select:focus{outline:0;border-color:var(--blue);box-shadow:0 0 0 3px rgba(67,116,143,.16);}
  .us-ck-r2{display:grid;grid-template-columns:1fr 1fr;gap:9px;}
  .us-ck-r3{display:grid;grid-template-columns:1.4fr .8fr .9fr;gap:9px;}
  .us-ck-qty{display:flex;align-items:center;gap:0;border:1px solid #cfdbe4;border-radius:8px;overflow:hidden;width:fit-content;background:#fff;}
  .us-ck-qty button{width:34px;height:34px;border:0;background:#eef4f8;color:var(--blue);font-size:17px;cursor:pointer;}
  .us-ck-qty button:hover{background:#e0ebf2;}
  .us-ck-qty span{min-width:38px;text-align:center;font-weight:700;color:#365d73;}
  .us-ck-pay label.us-ck-pm{display:flex;align-items:center;gap:10px;border:1.5px solid #d7e2ea;border-radius:9px;
    padding:11px 12px;margin:0 0 8px;cursor:pointer;transition:border-color .12s,background .12s;}
  .us-ck-pm.sel{border-color:var(--blue);background:#eff6fa;}
  .us-ck-pm input{accent-color:var(--blue);}
  .us-ck-pm-name{font-weight:600;font-size:13.5px;color:#3c4a54;}
  .us-ck-pm-mark{margin-left:auto;display:flex;align-items:center;gap:5px;}
  .us-ck-brand{font-size:10px;font-weight:800;padding:2px 5px;border-radius:3px;letter-spacing:.02em;}
  .us-ck-brand.visa{background:#1a1f71;color:#fff;}
  .us-ck-brand.amex{background:#2e77bb;color:#fff;}
  .us-ck-more{font-size:11px;color:#9aa7b0;}
  .us-ck-paypal{font-size:13px;font-weight:800;font-style:italic;}
  .us-ck-paypal i{color:#003087;font-style:italic;}.us-ck-paypal em{color:#009cde;font-style:italic;}
  .us-ck-pm-panel{padding:2px 2px 6px;}
  .us-ck-pm-note{font-size:12px;color:#6b7883;margin:2px 0 4px;}
  .us-ck-sum{background:#fff;border:1px solid #e2ebf1;border-radius:11px;padding:13px 15px;margin:2px 0 16px;}
  .us-ck-sum-row{display:flex;justify-content:space-between;font-size:13px;color:#5a6b76;padding:3px 0;}
  .us-ck-sum-row.tot{border-top:1px solid #e6eef3;margin-top:6px;padding-top:9px;font-size:16px;font-weight:800;color:#365d73;}
  .us-ck-sum-row .free{color:#2e9e6b;font-weight:700;}
  .us-ck-submit{width:100%;border:0;border-radius:44px;background:var(--yellow);color:#1b2126;font-weight:800;
    text-transform:uppercase;letter-spacing:.08em;font-size:15px;padding:15px;cursor:pointer;
    box-shadow:0 8px 22px rgba(67,116,143,.26);transition:transform .12s,box-shadow .12s,background .12s;}
  .us-ck-submit:hover{background:#ffd63f;transform:translateY(-1px);box-shadow:0 12px 26px rgba(67,116,143,.32);}
  .us-ck-trust{padding:12px 22px;font-size:11.5px;color:#78868f;text-align:center;background:#eaf1f6;border-top:1px solid #dde7ee;}
  .us-ck-trust strong{color:#3c4a54;}
  .us-ck-confirm{text-align:center;padding:18px 6px;}
  .us-ck-check{width:66px;height:66px;border-radius:50%;background:#e9f7ef;display:flex;align-items:center;justify-content:center;margin:6px auto 14px;}
  .us-ck-check svg{width:34px;height:34px;fill:none;stroke:#2e9e6b;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;}
  .us-ck-confirm-t{font-size:21px;font-weight:800;color:#365d73;margin:0 0 6px;}
  .us-ck-confirm-s{font-size:13.5px;color:#5a6b76;line-height:1.5;margin:0 0 16px;}
  .us-ck-order{background:#fff;border:1px solid #e2ebf1;border-radius:11px;padding:12px 15px;text-align:left;margin:0 0 16px;}
  .us-ck-order div{display:flex;justify-content:space-between;font-size:13px;padding:3px 0;color:#5a6b76;}
  .us-ck-order strong{color:#365d73;}
  .us-ck-ghost{background:none;border:1.5px solid #c3d2dc;color:#3c4a54;border-radius:44px;padding:11px 26px;font-weight:700;cursor:pointer;font-size:13.5px;}
  .us-ck-ghost:hover{border-color:var(--blue);color:var(--blue);}
  .us-ck-frame{width:100%;height:100%;min-height:560px;border:0;display:block;}
  @media (max-width:520px){.us-ck{width:100vw;}}
  `;

  var money = function (n) { return "$" + n.toFixed(2); };
  var qty = 1;

  var HTML = `
  <button class="us-ck-close" id="usCkClose" aria-label="Close">&#10005;</button>
  <div class="us-ck-head">
    <div class="us-ck-eyebrow">Secure Checkout</div>
    <div class="us-ck-title">UNBREAKABLE <span>SOLE</span></div>
    <div class="us-ck-sub">Finding Joy, Purpose, and Strength in Life&rsquo;s Toughest Miles</div>
  </div>
  <div class="us-ck-body">
    <div class="us-ck-mount" id="usCkMount">
      <div id="usCkPreview">
        <div class="us-ck-flag">Preview &middot; your live Spiffy checkout loads here once connected</div>
        <form id="usCkForm" novalidate>
          <div class="us-ck-prod">
            <img src="${US_BOOK_IMG}" alt="Unbreakable Sole book">
            <div><div class="n">Unbreakable Sole</div><div class="f">Paperback &middot; Signed by the author</div></div>
            <div class="p" id="usCkLinePrice">${money(US_BOOK_PRICE)}</div>
          </div>

          <div class="us-ck-grp">
            <div class="us-ck-grp-t">Quantity</div>
            <div class="us-ck-qty">
              <button type="button" id="usCkMinus" aria-label="Decrease">&minus;</button>
              <span id="usCkQty">1</span>
              <button type="button" id="usCkPlus" aria-label="Increase">+</button>
            </div>
          </div>

          <div class="us-ck-grp">
            <div class="us-ck-grp-t">Contact</div>
            <div class="us-ck-r2">
              <label class="us-ck-field"><span>First name</span><input type="text" autocomplete="given-name"></label>
              <label class="us-ck-field"><span>Last name</span><input type="text" autocomplete="family-name"></label>
            </div>
            <label class="us-ck-field"><span>Email</span><input type="email" placeholder="you@email.com" autocomplete="email"></label>
            <label class="us-ck-field"><span>Phone</span><input type="tel" placeholder="(555) 000-0000" autocomplete="tel"></label>
          </div>

          <div class="us-ck-grp">
            <div class="us-ck-grp-t">Shipping Address</div>
            <label class="us-ck-field"><span>Street address</span><input type="text" autocomplete="address-line1"></label>
            <div class="us-ck-r3">
              <label class="us-ck-field"><span>City</span><input type="text" autocomplete="address-level2"></label>
              <label class="us-ck-field"><span>State</span><input type="text" autocomplete="address-level1"></label>
              <label class="us-ck-field"><span>ZIP</span><input type="text" inputmode="numeric" autocomplete="postal-code"></label>
            </div>
            <label class="us-ck-field"><span>Country</span><select autocomplete="country-name"><option>United States</option><option>Canada</option><option>United Kingdom</option><option>Australia</option></select></label>
          </div>

          <div class="us-ck-grp us-ck-pay">
            <div class="us-ck-grp-t">Payment</div>
            <label class="us-ck-pm" data-method="paypal">
              <input type="radio" name="usCkPay" value="paypal">
              <span class="us-ck-pm-name">PayPal</span>
              <span class="us-ck-pm-mark"><span class="us-ck-paypal"><i>Pay</i><em>Pal</em></span></span>
            </label>
            <div class="us-ck-pm-panel" data-for="paypal" hidden>
              <p class="us-ck-pm-note">You&rsquo;ll be securely redirected to PayPal to complete your order.</p>
            </div>
            <label class="us-ck-pm sel" data-method="card">
              <input type="radio" name="usCkPay" value="card" checked>
              <span class="us-ck-pm-name">Credit / Debit Card</span>
              <span class="us-ck-pm-mark">
                <span class="us-ck-brand visa">VISA</span>
                <svg width="24" height="16" viewBox="0 0 24 16" aria-hidden="true"><circle cx="9.5" cy="8" r="6.5" fill="#EB001B"/><circle cx="14.5" cy="8" r="6.5" fill="#F79E1B"/><path d="M12 3.1a6.5 6.5 0 0 0 0 9.8 6.5 6.5 0 0 0 0-9.8z" fill="#FF5F00"/></svg>
                <span class="us-ck-brand amex">AMEX</span>
                <span class="us-ck-more">&amp; more</span>
              </span>
            </label>
            <div class="us-ck-pm-panel" data-for="card">
              <label class="us-ck-field"><span>Card number</span><input type="text" inputmode="numeric" placeholder="1234 1234 1234 1234" autocomplete="cc-number"></label>
              <div class="us-ck-r2">
                <label class="us-ck-field"><span>Expiry</span><input type="text" placeholder="MM / YY" autocomplete="cc-exp"></label>
                <label class="us-ck-field"><span>CVC</span><input type="text" inputmode="numeric" placeholder="123" autocomplete="cc-csc"></label>
              </div>
            </div>
          </div>

          <div class="us-ck-sum">
            <div class="us-ck-sum-row"><span id="usCkSubLabel">Unbreakable Sole &times; 1</span><span id="usCkSub">${money(US_BOOK_PRICE)}</span></div>
            <div class="us-ck-sum-row"><span>Shipping</span><span class="free">FREE</span></div>
            <div class="us-ck-sum-row tot"><span>Total</span><span id="usCkTotal">${money(US_BOOK_PRICE)}</span></div>
          </div>

          <button type="submit" class="us-ck-submit">Complete Order</button>
        </form>

        <div class="us-ck-confirm" id="usCkConfirm" hidden>
          <div class="us-ck-check"><svg viewBox="0 0 24 24"><polyline points="4 12 10 18 20 6"/></svg></div>
          <p class="us-ck-confirm-t">Order Confirmed</p>
          <p class="us-ck-confirm-s">Your copy of <strong>Unbreakable Sole</strong> is on its way. Get ready to run your toughest miles.</p>
          <div class="us-ck-order">
            <div><span>Confirmation</span><strong id="usCkOrderNo">#US-000000</strong></div>
            <div><span>Quantity</span><strong id="usCkOrderQty">1</strong></div>
            <div><span>Total</span><strong id="usCkOrderTotal">${money(US_BOOK_PRICE)}</strong></div>
          </div>
          <p class="us-ck-confirm-s">A confirmation email with your receipt and tracking is on the way.</p>
          <button type="button" class="us-ck-ghost" id="usCkDone">Back To The Page</button>
        </div>
      </div>
    </div>
  </div>
  <div class="us-ck-trust">&#128274; <strong>Encrypted &amp; Secure</strong> &nbsp;&middot;&nbsp; Powered by Spiffy</div>
  `;

  // inject styles + drawer
  var style = document.createElement('style'); style.textContent = CSS; document.head.appendChild(style);
  var overlay = document.createElement('div'); overlay.className = 'us-ck-overlay'; overlay.id = 'usCkOverlay'; overlay.hidden = true;
  var drawer = document.createElement('aside'); drawer.className = 'us-ck'; drawer.id = 'usCkDrawer';
  drawer.setAttribute('role', 'dialog'); drawer.setAttribute('aria-modal', 'true'); drawer.setAttribute('aria-hidden', 'true');
  drawer.setAttribute('aria-label', 'Checkout — Unbreakable Sole'); drawer.innerHTML = HTML;
  document.body.appendChild(overlay); document.body.appendChild(drawer);

  var $ = function (id) { return document.getElementById(id); };
  var mount = $('usCkMount'), preview = $('usCkPreview'), form = $('usCkForm'),
      confirmView = $('usCkConfirm'), closeBtn = $('usCkClose');
  var lastFocus = null;

  function totals() {
    var sub = US_BOOK_PRICE * qty;
    $('usCkQty').textContent = qty;
    $('usCkLinePrice').textContent = money(US_BOOK_PRICE);
    $('usCkSubLabel').textContent = 'Unbreakable Sole × ' + qty;
    $('usCkSub').textContent = money(sub);
    $('usCkTotal').textContent = money(sub);
  }
  $('usCkPlus').addEventListener('click', function () { if (qty < 20) qty++; totals(); });
  $('usCkMinus').addEventListener('click', function () { if (qty > 1) qty--; totals(); });

  function selectMethod(method) {
    drawer.querySelectorAll('.us-ck-pm').forEach(function (x) { x.classList.toggle('sel', x.getAttribute('data-method') === method); });
    drawer.querySelectorAll('.us-ck-pm-panel').forEach(function (p) { p.hidden = p.getAttribute('data-for') !== method; });
    var r = drawer.querySelector('.us-ck-pm[data-method="' + method + '"] input'); if (r) r.checked = true;
  }
  drawer.querySelectorAll('.us-ck-pm').forEach(function (pm) {
    pm.addEventListener('click', function () { selectMethod(pm.getAttribute('data-method')); });
  });
  selectMethod('card');

  function resetPreview() { form.hidden = false; confirmView.hidden = true; qty = 1; totals(); selectMethod('card'); }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    $('usCkOrderNo').textContent = '#US-' + Math.floor(100000 + Math.random() * 899999);
    $('usCkOrderQty').textContent = qty;
    $('usCkOrderTotal').textContent = money(US_BOOK_PRICE * qty);
    form.hidden = true; confirmView.hidden = false;
    var b = drawer.querySelector('.us-ck-body'); if (b) b.scrollTop = 0;
  });

  function mountSpiffy() {
    if (mount.dataset.mounted || !window.US_SPIFFY_CHECKOUT_URL) return;
    var frame = document.createElement('iframe');
    frame.className = 'us-ck-frame'; frame.src = window.US_SPIFFY_CHECKOUT_URL;
    frame.title = 'Secure checkout — Unbreakable Sole'; frame.setAttribute('allow', 'payment *');
    mount.insertBefore(frame, mount.firstChild);
    if (preview) preview.style.display = 'none';
    mount.dataset.mounted = '1';
  }

  function openDrawer(e) {
    if (e) e.preventDefault();
    lastFocus = document.activeElement;
    overlay.hidden = false; void overlay.offsetWidth;
    overlay.classList.add('open'); drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false'); document.body.classList.add('us-ck-open');
    mountSpiffy(); if (!mount.dataset.mounted) resetPreview();
    closeBtn.focus();
  }
  function closeDrawer() {
    overlay.classList.remove('open'); drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true'); document.body.classList.remove('us-ck-open');
    setTimeout(function () { overlay.hidden = true; }, 360);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.querySelectorAll('[data-open-checkout]').forEach(function (el) {
    el.addEventListener('click', openDrawer);
  });
  $('usCkDone').addEventListener('click', closeDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
  });
})();
