import React, { useMemo, useState } from 'react';

// ServNow's icon language is drawn in-house with small, native SVG symbols.
// No third-party icon pack, icon font, or external illustration service is used.
const Icon = ({ name, size = 20, className = '' }) => {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    search: <><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.1 4.1"/></>,
    user: <><circle cx="12" cy="7.5" r="3.1"/><path d="M5.2 20c.3-3.7 2.9-5.7 6.8-5.7s6.5 2 6.8 5.7"/></>,
    'arrow-right': <><path d="M4 12h15"/><path d="m13 5 7 7-7 7"/></>,
    'arrow-up-right': <><path d="M6 18 18 6"/><path d="M8 6h10v10"/></>,
    heart: <path d="M20.1 8.7c0 4.1-8.1 9.1-8.1 9.1S3.9 12.8 3.9 8.7A4.1 4.1 0 0 1 12 6.8a4.1 4.1 0 0 1 8.1 1.9Z"/>,
    droplet: <><path d="M12 3.1s-6.7 7.1-6.7 11.4a6.7 6.7 0 0 0 13.4 0C18.7 10.2 12 3.1 12 3.1Z"/><path d="M8.5 15.2a3.7 3.7 0 0 0 3.5 2.6"/></>,
    sparkle: <><path d="m12 2.8 1.8 6.1L20 11l-6.2 2.1L12 19.2l-1.8-6.1L4 11l6.2-2.1L12 2.8Z"/><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"/></>,
    bolt: <path d="M13.7 2.8 5.8 13h5.7l-1.2 8.2L18.2 10h-5.8l1.3-7.2Z"/>,
    hammer: <><path d="m14.3 5.3 4.4 4.4"/><path d="m10.8 3.8 3-1.1 6.5 6.5-1.1 3-3.2-1.1-6.3-6.3 1.1-1Z"/><path d="m13.8 10.8-8.5 8.5a1.7 1.7 0 0 1-2.4-2.4l8.5-8.5"/></>,
    shield: <><path d="M12 3.1 19 6v5.1c0 4.3-2.7 7.5-7 9.8-4.3-2.3-7-5.5-7-9.8V6l7-2.9Z"/><path d="m8.7 12.1 2.2 2.2 4.7-4.8"/></>,
    star: <path d="m12 3.4 2.6 5.4 6 .9-4.3 4.2 1 6-5.3-2.8-5.3 2.8 1-6-4.3-4.2 6-.9L12 3.4Z"/>,
    calendar: <><rect x="3.8" y="5.2" width="16.4" height="15" rx="2.3"/><path d="M7.7 3.3v3.8M16.3 3.3v3.8M3.8 9.3h16.4"/><path d="m8.3 13.2 1.6 1.6 3.7-3.5"/></>,
    pin: <><path d="M19 10.2c0 5.1-7 10.2-7 10.2S5 15.3 5 10.2a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.2"/></>,
    clock: <><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5.4l3.6 2"/></>,
    card: <><rect x="3" y="5.2" width="18" height="13.6" rx="2.3"/><path d="M3 9.4h18M7 14.4h4"/></>,
    cash: <><rect x="3" y="5" width="18" height="14" rx="2.2"/><path d="M7 9h3.5a2 2 0 0 1 0 4H9.5a2 2 0 0 0 0 4H13M10.8 7.5v13M17 9h.01M6.5 15h.01"/></>,
    check: <path d="m5.2 12.4 4.2 4.2L19 7"/>,
    'chevron-left': <path d="m15 5-7 7 7 7"/>,
    home: <><path d="m3.2 10.7 8.8-7.3 8.8 7.3"/><path d="M5.5 9.8v10h13v-10M9.5 19.8v-5.7h5v5.7"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    badge: <><path d="M12 3.1 14.4 5l3-.2.7 2.9 2.4 1.8-1.1 2.8.6 3-2.8 1.2-1.5 2.6-3-.8-3 .8-1.5-2.6-2.8-1.2.6-3L4.9 9.5l2.4-1.8L8 4.8l3 .2L12 3.1Z"/><path d="m8.9 11.9 2 2 4.3-4.3"/></>,
    lock: <><rect x="5.5" y="10" width="13" height="10" rx="2"/><path d="M8.4 10V7.1a3.6 3.6 0 0 1 7.2 0V10M12 13.5v3"/></>,
    'arrow-down-right': <><path d="M6 6 18 18"/><path d="M18 8v10h-10"/></>,
    'chevron-down': <path d="m6 9 6 6 6-6"/>,
    bag: <><path d="M5 8.5h14l1 11H4l1-11Z"/><path d="M8.5 8.5V6a3.5 3.5 0 0 1 7 0v2.5"/></>,
    bell: <><path d="M18 9.8a6 6 0 0 0-12 0c0 7-2.3 7-2.3 8.2h16.6C20.3 16.8 18 16.8 18 9.8Z"/><path d="M10 21h4"/></>,
  };
  return <svg className={`symbol symbol-${name} ${className}`} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...common}>{paths[name] || paths.sparkle}</svg>;
};

const CATEGORIES = ['All Services', 'Plumbing', 'Cleaning', 'Electrical', 'Handyman'];
const SERVICES = [
  { id: 1, name: 'Plumbing', price: 200, glyph: 'droplet', tint: 'mint', character: '/characters/plumber.png', role: 'Plumbing specialist', detail: 'Leaks, taps, pipes & more', description: 'Fix leaks, unclog drains, install fixtures and more. Careful, professional plumbing for your home.' },
  { id: 2, name: 'Cleaning', price: 200, glyph: 'sparkle', tint: 'teal', character: '/characters/cleaner.png', role: 'Home cleaning expert', detail: 'A fresher, happier home', description: 'A thoughtful refresh for your space, with detailed cleaning that leaves home feeling like home.' },
  { id: 3, name: 'Electrical', price: 200, glyph: 'bolt', tint: 'orange', character: '/characters/electrician.png', role: 'Licensed electrician', detail: 'Safe fixes & installations', description: 'From everyday fixes to installations, get careful help with the electrical work your home needs.' },
  { id: 4, name: 'Handyman', price: 200, glyph: 'hammer', tint: 'amber', character: '/characters/handyman.png', role: 'Handyman professional', detail: 'Repairs, mounting & fixes', description: 'Small fixes, mounting, furniture assembly and the finishing touches on your to-do list.' },
];

function Logo({ onClick }) {
  return <button className="brand" onClick={onClick} aria-label="ServNow home"><span className="brand-mark" aria-hidden="true"><span className="brand-mark-glyph">S</span></span><span>ServNow</span></button>;
}
function AppHeader({ onHome, onDashboard, onSearch }) {
  return <header className="floating-header">
    <Logo onClick={onHome} />
    <nav className="desktop-nav"><a href="#discover">Discover</a><a href="#how-it-works">How it works</a><a href="#professionals">For Professionals</a></nav>
    <div className="header-actions">
      <button className="round-button pale icon-button" onClick={onSearch} aria-label="Search services"><Icon name="search" size={22}/></button>
      <button className="round-button dark icon-button" onClick={onDashboard} aria-label="Open dashboard"><Icon name="user" size={22}/></button>
    </div>
  </header>;
}
function ExpertAvatar({ service, large = false, className = '' }) {
  return <div className={`avatar-panel ${service.tint} ${large ? 'large' : ''} ${className}`}>
    <img src={service.character} alt={`${service.role} character`} loading="lazy" />
  </div>;
}
function FlowHeader({ title, onBack }) {
  return <header className="flow-header"><button className="round-button pale icon-button back-button" onClick={onBack} aria-label="Go back"><Icon name="chevron-left" size={22}/></button><Logo onClick={onBack}/><span className="flow-title">{title}</span></header>;
}

export default function ServNowApp() {
  const [view, setView] = useState('home');
  const [category, setCategory] = useState('All Services');
  const [selected, setSelected] = useState(null);
  const [saved, setSaved] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [booking, setBooking] = useState({ address: '', date: '', time: '' });
  const [bookings, setBookings] = useState([]);
  const [notice, setNotice] = useState('');
  const [payment, setPayment] = useState({ method: 'upi', upiId: '' });

  const filtered = useMemo(() => SERVICES.filter(s =>
    (category === 'All Services' || s.name === category) &&
    (!query.trim() || `${s.name} ${s.detail} ${s.description}`.toLowerCase().includes(query.toLowerCase()))
  ), [category, query]);
  const taxes = selected ? selected.price * 0.08 : 0;
  const total = selected ? selected.price + taxes : 0;
  const go = (next) => { setView(next); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const startBooking = (service) => {
    setSelected(service); setBooking({ address: '', date: '', time: '' });
    setPayment({ method: 'upi', upiId: '' }); setNotice(''); go('booking');
  };
  const toggleSave = (id) => setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const completePayment = (e) => {
    e.preventDefault();
    const paymentMethod = payment.method === 'cod' ? 'cod' : 'upi';
    const newBooking = {
      id: Date.now(), service: selected, ...booking, total, paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'Pay in cash after service' : 'UPI demo selected — not paid',
      createdAt: new Date().toISOString()
    };
    setBookings(prev => [newBooking, ...prev]);
    setNotice(paymentMethod === 'cod'
      ? `Your booking is confirmed. Pay ₹${total.toFixed(2)} in cash after the service; no payment was collected in this demo.`
      : 'Your booking is confirmed with UPI selected. No UPI transaction was processed in this demo.');
    go('dashboard');
  };
  const activeBooking = bookings[0];

  return <div className="app-shell">
    <div className="ambient-orbit orbit-one" aria-hidden="true"/><div className="ambient-orbit orbit-two" aria-hidden="true"/>
    {view === 'home' && <div className="home-wrap">
      <div className="canvas">
        <AppHeader onHome={() => go('home')} onDashboard={() => go('dashboard')} onSearch={() => { setSearchOpen(v => !v); setTimeout(() => document.getElementById('service-search')?.focus(), 30); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} />
        <main className="main-container">
          <section className="hero" id="discover">
            <div className="hero-topline"><span className="hero-index"><i/> SERVNOW <span className="fine-slash">/</span> HOME SERVICES</span><span className="hero-edition">PLUMBING · CLEANING · ELECTRICAL · REPAIRS</span></div>
            <div className="hero-layout">
              <div className="hero-content">
                <div className="eyebrow"><span className="eyebrow-dot"/> HOME SERVICES</div>
                <h1>Our<br/><em>services.</em></h1>
                <p>Plumbing, cleaning, electrical work and everyday repairs, booked with trusted local professionals.</p>
                <div className="hero-actions"><button className="button button-dark" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>Browse services <Icon name="arrow-right" size={19}/></button><button className="hero-text-button" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>How it works <Icon name="arrow-up-right" size={17}/></button></div>
                <div className="hero-proof"><div><strong>Verified professionals</strong><small>Clear pricing before checkout</small></div></div>
              </div>
              <div className="hero-stage" aria-label="Meet your ServNow professionals">
                <div className="stage-topline"><span>Meet the team</span><span><i/> AVAILABLE FOR BOOKINGS</span></div>
                <div className="stage-halo halo-a"/><div className="stage-halo halo-b"/><div className="stage-floor"/>
                <div className="hero-figure hero-figure-plumber"><img src={SERVICES[0].character} alt="Plumbing professional"/><span className="figure-label"><b>01</b> Plumbing</span></div>
                <div className="hero-figure hero-figure-cleaner"><img src={SERVICES[1].character} alt="Cleaning professional"/><span className="figure-label"><b>02</b> Cleaning</span></div>
                <div className="hero-figure hero-figure-electrician"><img src={SERVICES[2].character} alt="Electrical professional"/><span className="figure-label"><b>03</b> Electrical</span></div>
                <div className="hero-figure hero-figure-handyman"><img src={SERVICES[3].character} alt="Handyman professional"/><span className="figure-label"><b>04</b> Handyman</span></div>
              </div>
            </div>
            <div className="hero-bottom-note"><span className="hero-bottom-seal"><Icon name="shield" size={19}/></span><span><b>Verified professionals.</b><small>Identity and experience checks before they join.</small></span></div>
          </section>

          <section className="services-section" id="services">
            <div className="section-heading">
              <div><h2>Choose a service.</h2></div>
              <div className="category-pills" aria-label="Filter services">{CATEGORIES.map(c => <button key={c} className={category === c ? 'active' : ''} onClick={() => setCategory(c)}>{c}</button>)}</div>
            </div>
            {searchOpen && <div className="search-box"><Icon name="search" size={20}/><input id="service-search" autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="What can we help with?"/><button onClick={() => { setQuery(''); setSearchOpen(false); }} aria-label="Close search"><Icon name="close" size={18}/></button></div>}
            <div className="service-grid">
              {filtered.map(service => {
                const isSaved = saved.includes(service.id);
                return <article key={service.id} className="service-card" onClick={() => startBooking(service)} tabIndex={0} onKeyDown={e => { if (e.key === 'Enter') startBooking(service); }} aria-label={`Book ${service.name}`}>
                  <div className="card-topline"><span className={`service-glyph ${service.tint}`}><Icon name={service.glyph} size={20}/></span><span className="verified-label"><Icon name="badge" size={14}/> VERIFIED EXPERTS</span></div>
                  <h3>{service.name}</h3>
                  <ExpertAvatar service={service}/>
                  <div className="service-info"><h4 className="service-card-bottom-title">{service.name}</h4><p className="service-detail">Verified Experts</p></div>
                  <div className="card-footer"><div><span className="starting">From</span><strong><span className="currency">₹</span>{service.price}</strong></div><div className="card-buttons">
                    <button className={`round-button favorite icon-button ${isSaved ? 'is-saved' : ''}`} onClick={e => { e.stopPropagation(); toggleSave(service.id); }} aria-label={isSaved ? 'Remove from favorites' : 'Save service'}><Icon name="heart" size={19}/></button>
                    <button className="round-button dark icon-button book-arrow" onClick={e => { e.stopPropagation(); startBooking(service); }} aria-label={`Book ${service.name}`}><Icon name="arrow-right" size={20}/></button>
                  </div></div>
                </article>;
              })}
            </div>
            {filtered.length === 0 && <div className="empty-state">No services match that search. Try another term.</div>}
          </section>

          <section className="trust-strip" id="how-it-works"><div className="trust-intro"><span className="kicker">WHY SERVNOW</span><h3>Trusted help,<br/><em>at home.</em></h3><p>Verified professionals. Upfront prices.</p></div>
            <div className="trust-item"><span className="trust-icon"><Icon name="shield" size={22}/></span><div><b>Verified professionals</b><span>Identity and experience checked</span></div></div>
            <div className="trust-item"><span className="trust-icon"><Icon name="clock" size={22}/></span><div><b>Time that works for you</b><span>Choose a slot that fits your day</span></div></div>
            <div className="trust-item"><span className="trust-icon"><Icon name="card" size={22}/></span><div><b>Clear, upfront pricing</b><span>No unwelcome surprises</span></div></div>
          </section>
          <footer className="site-footer" id="professionals"><Logo onClick={() => go('home')}/><span>Plumbing, cleaning and home repairs.</span><span>© 2026 ServNow Demo</span></footer>
        </main>
      </div>
    </div>}

    {view === 'booking' && selected && <div className="flow-wrap"><div className="flow-canvas">
      <FlowHeader title="Schedule service" onBack={() => go('home')} />
      <main className="flow-main">
        <div className="page-intro"><span className="kicker">STEP 01 <i>— YOUR SERVICE</i></span><h1>Let's get it <em>sorted.</em></h1><p>A few details, then we’ll take care of the rest.</p></div>
        <div className="selected-service panel"><ExpertAvatar service={selected} large/><div className="selected-copy"><span className="overline"><Icon name="badge" size={15}/> VERIFIED EXPERT</span><h2>{selected.name}</h2><p>{selected.description}</p><div className="selected-price">₹{selected.price}<span> / starting price</span></div></div><div className="secure-tag"><Icon name="shield" size={17}/> Trusted service</div></div>
        <form className="form-panel panel" onSubmit={e => { e.preventDefault(); go('checkout'); }}>
          <div className="form-heading"><span className="step-number">01</span><div><h3>Service details</h3><p>Tell us where and when you need a hand.</p></div></div>
          <label className="detail-field address-field"><span className="detail-label"><Icon name="pin" size={18}/> Service address</span><input className="detail-control" required value={booking.address} onChange={e => setBooking({ ...booking, address: e.target.value })} placeholder="Enter your home address" autoComplete="street-address"/></label>
          <div className="date-time-row">
            <label className="detail-field date-detail-field"><span className="detail-label"><Icon name="calendar" size={18}/> Preferred date</span><input className="detail-control date-control" type="date" required min={new Date().toISOString().slice(0, 10)} value={booking.date} onChange={e => setBooking({ ...booking, date: e.target.value })}/></label>
            <fieldset className="time-choice-field" aria-labelledby="preferred-time-label">
              <legend id="preferred-time-label" className="detail-label"><Icon name="clock" size={18}/> Preferred time</legend>
              <div className="time-options">
                {[
                  { label: 'Morning', hours: '8 AM – 12 PM', value: 'Morning (8 AM – 12 PM)' },
                  { label: 'Afternoon', hours: '12 PM – 4 PM', value: 'Afternoon (12 PM – 4 PM)' },
                  { label: 'Evening', hours: '4 PM – 8 PM', value: 'Evening (4 PM – 8 PM)' },
                ].map(slot => <label key={slot.value} className={`time-option${booking.time === slot.value ? ' is-selected' : ''}`}>
                  <input type="radio" name="preferred-time" value={slot.value} required checked={booking.time === slot.value} onChange={() => setBooking({ ...booking, time: slot.value })}/>
                  <span className="time-radio-mark" aria-hidden="true"/><span className="time-option-copy"><strong>{slot.label}</strong><small>{slot.hours}</small></span>
                </label>)}
              </div>
            </fieldset>
          </div>
          <div className="form-bottom"><span><Icon name="shield" size={17}/> Your details stay private.</span><button className="button button-dark" type="submit">Continue to checkout <Icon name="arrow-right" size={19}/></button></div>
        </form>
      </main>
    </div></div>}

    {view === 'checkout' && selected && <div className="flow-wrap"><div className="flow-canvas checkout-canvas">
      <FlowHeader title="Checkout" onBack={() => go('booking')} />
      <main className="checkout-layout">
        <section><div className="page-intro checkout-intro"><span className="kicker">STEP 02 <i>— REVIEW</i></span><h1>Almost <em>there.</em></h1><p>Review your booking before confirming.</p></div>
          <div className="summary-panel panel"><div className="summary-service"><ExpertAvatar service={selected}/><div><h4>{selected.name}</h4><p>{booking.date} · {booking.time}</p><span className="summary-address"><Icon name="pin" size={14}/>{booking.address}</span></div></div>
            <div className="price-lines"><div><span>Service price</span><b>₹{selected.price.toFixed(2)}</b></div><div><span>Tax (8%)</span><b>₹{taxes.toFixed(2)}</b></div><div><span>Payment method</span><b>{payment.method === 'cod' ? 'Cash on delivery' : 'UPI'}</b></div></div><div className="total-line"><span>Total</span><strong>₹{total.toFixed(2)}</strong></div><div className="summary-foot"><Icon name="shield" size={17}/> Clear pricing. No surprise fees.</div></div>
        </section>
        <section><div className="page-intro checkout-intro"><span className="kicker">STEP 03 <i>— CONFIRM</i></span><h2>How would you like to pay?</h2><p>Choose UPI or cash on delivery. This prototype does not process real payments.</p></div>
          <form className="payment-panel panel" onSubmit={completePayment}>
            <div className="payment-methods" role="group" aria-label="Choose payment method">
              <button type="button" className={`payment-method-option${payment.method === 'upi' ? ' is-selected' : ''}`} aria-pressed={payment.method === 'upi'} onClick={() => setPayment({ ...payment, method: 'upi' })}>
                <span className="payment-option-top"><span className="payment-method-mark upi-mark">UPI</span><span className="payment-radio-mark" aria-hidden="true"/></span>
                <span className="payment-option-copy"><strong>Pay with UPI</strong><small>Google Pay, PhonePe, Paytm or another UPI app</small></span><span className="payment-option-tag">Digital payment</span>
              </button>
              <button type="button" className={`payment-method-option${payment.method === 'cod' ? ' is-selected' : ''}`} aria-pressed={payment.method === 'cod'} onClick={() => setPayment({ ...payment, method: 'cod' })}>
                <span className="payment-option-top"><span className="payment-method-mark cash-mark"><Icon name="cash" size={21}/></span><span className="payment-radio-mark" aria-hidden="true"/></span>
                <span className="payment-option-copy"><strong>Cash on delivery</strong><small>Pay in cash after the service is completed</small></span><span className="payment-option-tag">Pay later</span>
              </button>
            </div>
            {payment.method === 'upi' ? <div className="upi-entry">
              <label><span><span className="upi-inline-mark">UPI</span> UPI ID <span className="optional-label">DEMO FIELD</span></span><input required autoComplete="off" inputMode="text" pattern="[A-Za-z0-9._-]{2,}@[A-Za-z][A-Za-z0-9.-]{1,}" title="Enter a demo UPI ID, such as name@upi" placeholder="name@upi" value={payment.upiId} onChange={e => setPayment({ ...payment, upiId: e.target.value.trim() })}/></label>
              <p className="payment-help"><Icon name="shield" size={15}/> Prototype only — no UPI request is sent and no money is collected. Do not enter real payment details.</p>
            </div> : <div className="cash-payment-note"><span className="cash-note-icon"><Icon name="cash" size={18}/></span><span><strong>Pay ₹{total.toFixed(2)} after the service</strong><small>We’ll record this booking as cash due on completion. No payment is collected now.</small></span></div>}
            <button className="button button-dark pay-button" type="submit">{payment.method === 'cod' ? <><Icon name="cash" size={17}/> Book now · Pay ₹{total.toFixed(2)} in cash</> : <><Icon name="check" size={17}/> Confirm demo booking · ₹{total.toFixed(2)}</>} <Icon name="arrow-right" size={18}/></button>
            <p className="payment-disclaimer">Demo checkout only. Real UPI payments require a payment-provider integration; cash payment is not collected by this website.</p>
          </form>
        </section>
      </main>
    </div></div>}

    {view === 'dashboard' && <div className="flow-wrap"><div className="flow-canvas dashboard-canvas">
      <header className="dashboard-header"><Logo onClick={() => go('home')}/><button className="round-button pale icon-button" onClick={() => go('home')} aria-label="Back to home"><Icon name="home" size={20}/></button></header>
      <main className="dashboard-main"><div className="page-intro dashboard-intro"><span className="kicker">YOUR HOME, IN GOOD HANDS</span><h1>My dashboard<em>.</em></h1><p>Everything you need for a little more peace of mind.</p></div>
        {notice && <div className="success-banner"><span className="success-symbol"><Icon name="check" size={24}/></span><div><b>Booking confirmed!</b><p>{notice}</p></div><button onClick={() => setNotice('')} aria-label="Dismiss"><Icon name="close" size={18}/></button></div>}
        <div className="dashboard-section-title"><h2>Active bookings</h2><span>{bookings.length} {bookings.length === 1 ? 'booking' : 'bookings'}</span></div>
        {activeBooking ? <article className="booking-card panel"><div className="booking-top"><div className="booking-expert"><ExpertAvatar service={activeBooking.service} large/><div><span className="overline"><Icon name="badge" size={14}/> VERIFIED PROFESSIONAL</span><h3>{activeBooking.service.name}</h3><p><Icon name="calendar" size={15}/><span className="activity-time">{activeBooking.date} · {activeBooking.time}</span></p><p><Icon name="pin" size={15}/>{activeBooking.address}</p></div></div><span className="status-pill"><i/> Confirmed</span></div><div className="assigned-expert"><div className="expert-initial">AM</div><div><b>Alex M.</b><span><Icon name="shield" size={14}/> Verified identity</span></div><div className="arrival-note"><span>DEMO STATUS</span><b>Appointment scheduled</b></div></div><div className="booking-payment-row"><span className="booking-payment-mark">{activeBooking.paymentMethod === 'cod' ? <Icon name="cash" size={17}/> : <span>UPI</span>}</span><div><b>{activeBooking.paymentMethod === 'cod' ? 'Cash on delivery' : 'UPI selected'}</b><small>{activeBooking.paymentMethod === 'cod' ? 'Payment due after service' : 'Demo only · Transaction not processed'}</small></div><span className={`booking-payment-status${activeBooking.paymentMethod === 'cod' ? ' due' : ''}`}>{activeBooking.paymentMethod === 'cod' ? 'Due' : 'Unpaid'}</span></div><div className="booking-bottom"><div className="booking-amount-copy"><span>{activeBooking.paymentMethod === 'cod' ? 'Amount due after service' : 'Booking total'}</span><small className="booking-reference">REF SN-{String(activeBooking.id).slice(-6)}</small></div><b>₹{activeBooking.total.toFixed(2)}</b></div></article> : <div className="no-bookings panel"><span className="empty-icon"><Icon name="calendar" size={27}/></span><h3>No bookings yet.</h3><p>Your appointments will appear here after you book a service.</p><button className="button button-dark" onClick={() => go('home')}>Explore services <Icon name="arrow-right" size={18}/></button></div>}
        <div className="dashboard-section-title rebook-heading"><h2>Quick rebook</h2><span>YOUR GO-TO SERVICES</span></div>
        <div className="rebook-grid">{SERVICES.map(s => <button key={s.id} className="rebook-card panel" onClick={() => startBooking(s)}><span className={`rebook-icon ${s.tint}`}><Icon name={s.glyph} size={23}/></span><b>{s.name}</b><span>From ₹{s.price}</span><Icon name="arrow-up-right" className="rebook-arrow" size={18}/></button>)}</div>
        {saved.length > 0 && <div className="saved-note"><Icon name="heart" size={16}/> You’ve saved {saved.length} {saved.length === 1 ? 'service' : 'services'} to your favorites.</div>}
        <button className="text-button" onClick={() => go('home')}><Icon name="chevron-left" size={17}/> Back to discover</button>
      </main>
    </div></div>}
  </div>;
}
