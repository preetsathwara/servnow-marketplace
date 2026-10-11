# ServNow Demo Website

A responsive React + Vite home-service marketplace demo with an Apple-inspired titanium / graphite visual system, tactile metal controls, and a consistent set of locally bundled service-character illustrations. It includes category filtering, search, saved services, a booking flow, demo checkout, and customer dashboard. The visual system uses editorial Playfair Display headings, Inter UI text, and JetBrains Mono for time/reference values; the service cards include repeated editorial and interface titles following the supplied type scale.

## Requirements
- Node.js 18 or newer
- npm

## Run locally
1. Extract `servnow Demo.zip`.
2. Open the extracted `servnow-demo` folder in VS Code.
3. Open a terminal in that folder.
4. Run:

   In **Windows PowerShell**, run these commands directly (do not put `bash` before `npm`):
   ```powershell
   npm install
   npm run dev
   ```

5. Open the local URL printed by Vite (usually `http://localhost:5173`).

## Production build
```bash
npm run build
npm run preview
```

## Included interactions
- Filter by Plumbing, Cleaning, Electrical, Handyman, or All Services.
- Search service names and descriptions.
- Save and unsave favorites.
- Select a service, enter an address, choose a date, and select a visually highlighted Morning, Afternoon, or Evening time slot. The address/date inputs and time-slot cards use the same ivory-and-forest-green theme as the rest of the interface.
- Review service price in Indian rupees (₹200), 8% demo tax, and the total at checkout (₹216).
- Choose UPI or Cash on Delivery at checkout. The chosen method is shown in the order summary and booking dashboard.
- For the UPI demo flow, enter a sample-format UPI ID (for example, `name@upi`) to exercise form validation; no payment request is sent.
- Cash on Delivery creates a booking marked as due after service; no cash is collected by the website.
- Quick rebook any service from the dashboard.

## Important demo notes
- Payment methods are currently frontend demos only. UPI does not open a UPI app, send a collect request, or transfer funds. To accept real UPI payments, integrate a provider (for example, Razorpay or Cashfree) with server-side order creation, signature/webhook verification, and merchant configuration.
- Cash on Delivery is recorded in the demo dashboard as payment due after service; the site does not collect or reconcile cash.
- Booking records exist only in the current page session and are not persisted to a database.
- All character illustrations are included locally in `public/characters`. The three typography families load from Google Fonts when online; system-font fallbacks keep the layout usable offline.
- Do not enter real payment credentials or personal financial details into the demo.


### Typography

The typography uses Playfair Display for editorial serif headlines and upper service-card titles, Inter for navigation, interface text and pricing, and JetBrains Mono for timestamps or receipt references. These fonts load from Google Fonts when online and fall back to system fonts when unavailable.
