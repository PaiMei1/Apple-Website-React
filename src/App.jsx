import { useState, useEffect, useRef } from "react";
import "./App.css";


const navLinks = ["Store","Mac","iPad","iPhone","Watch","Vision","AirPods","TV & Home","Entertainment","Accessories","Support"];


const entertainmentCards = [
  { image: "/images/apple9.jpg",  label: "Stream now",  genre: "Mystery · Welcome to the island, please enjoy your stay. Just don't ask too many questions.", wide: true },
    /*    Just don't ask too many questions.", wide: true },   */ 
  { image: "/images/apple10.jpg", label: "Stream now",  genre: "Drama", wide: true },
  { image: "/images/apple11.jpg", label: "Stream now",  genre: "Drama", wide: true },
  { image: "/images/apple12.jpg", label: "Stream now",  genre: "Comedy", wide: true },
];


const smallTiles = [
  { image: "/images/apple16.jpg", service: "Apple Arcade", label: "Play now",    title: "" },
  { image: "/images/apple17.jpg", service: "Apple Fitness+", label: "Watch now", title: "Treadmill with Sherica" },
  { image: "/images/apple18.jpg", service: "Apple Music",  label: "Listen now",  title: "New Music Daily" },
  { image: "/images/apple19.jpg", service: "Apple Arcade", label: "Play now",    title: "SpongeBob: Patty Pursuit 2" },
  { image: "/images/apple20.jpg", service: "Apple Fitness+", label: "Watch now", title: "Strength with Jenn · Music by..." },
];


const footerCols = [
  { heading: "Shop and Learn", links: ["Store","Mac","iPad","iPhone","Watch","Vision","AirPods","TV & Home","AirTag","Accessories","Gift Cards"] },
  /* "Accessories","Gift Cards"] },  */
  { heading: "Apple Wallet", links: ["Wallet","Apple Card","Apple Pay","Apple Cash"] },
  { heading: "Account", links: ["Manage Your Apple Account","Apple Store Account","iCloud.com"] },
  { heading: "Entertainment", links: ["Apple One","Apple TV","Apple Music","Apple Arcade","Apple Fitness+","Apple News+","Apple Podcasts","Apple Books","App Store"] },
  /* "Apple News+","Apple Podcasts","Apple Books","App Store"] },  */
  { heading: "Apple Store", links: ["Find a Store","Genius Bar","Today at Apple","Group Reservations","Apple Camp","Apple Store App","Certified Refurbished","Apple Trade In","Financing","Carrier Deals at Apple","Order Status","Shopping Help"] },
  /* "Apple Store App","Certified Refurbished","Apple Trade In","Financing","Carrier Deals at Apple","Order Status","Shopping Help"] },  */
  { heading: "For Business", links: ["Apple and Business","Shop for Business"] },
  { heading: "For Education", links: ["Apple and Education","Shop for K-12","Shop for College"] },
  { heading: "For Healthcare", links: ["Apple and Healthcare"] },
  { heading: "For Government", links: ["Apple and Government","Shop for Veterans and Military","Shop for State and Local Employees","Shop for Federal Employees"] },
  /*  "Shop for State and Local Employees","Shop for Federal Employees"] }, */ 
  { heading: "Apple Values", links: ["Accessibility","Education","Environment","Inclusion and Diversity","Privacy","Racial Equity and Justice","Supply Chain Innovation"] },
  /* "Privacy","Racial Equity and Justice","Supply Chain Innovation"] },  */ 
  { heading: "About Apple", links: ["Newsroom","Apple Leadership","Career Opportunities","Investors","Ethics & Compliance","Events","Contact Apple"] },
 /* "Investors","Ethics & Compliance","Events","Contact Apple"] },*/ 
];


function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const past = -rect.top;
      if (past <= 0) { setOpacity(1); return; }
      const range = ref.current.offsetHeight * 0.4;
      setOpacity(Math.max(0, 1 - past / range));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { ref, visible, opacity };
}


function PillBtn({ label, primary, small }) {
  return (
    <a href="#" className={`pill${primary ? " pill-primary" : " pill-outline"}${small ? " pill-small" : ""}`}>
      {label}
    </a>
  );
}



function FullHero({ title, subtitle, img, dark, titleSize, fullHeight, fullWidth }) {
  const { ref, visible, opacity } = useScrollReveal();
  const sectionStyle = {};
  if (fullHeight) sectionStyle.minHeight = "100vh";
  if (fullWidth) Object.assign(sectionStyle, {
    width: "100vw",
    position: "relative",
    left: "50%",
    right: "50%",
    marginLeft: "-50vw",
    marginRight: "-50vw",
    maxWidth: "100vw",
  });
  return (
    <section
      ref={ref}
      className={`full-hero${dark ? " full-hero-dark" : " full-hero-light"}`}
      style={Object.keys(sectionStyle).length ? sectionStyle : undefined}
    >
      <div className="full-hero-text" style={{ opacity, transition: "opacity 0.05s linear" }}>
        <h2 className={`fh-title${visible ? " visible" : ""}${titleSize === "lg" ? " fh-title-lg" : ""}`}
            style={{ color: dark ? "#fff" : "#1d1d1f" }}>
          {title}
        </h2>
        <p className={`fh-sub${visible ? " visible" : ""}`}
           style={{ color: dark ? "#a1a1a6" : "#6e6e73" }}>
          {subtitle}
        </p>
        <div className={`fh-btns${visible ? " visible" : ""}`}>
          <PillBtn label="Learn more" primary />
          <PillBtn label="Buy" primary={false} dark={dark} />
        </div>
      </div>
      <div className="full-hero-img-wrap" style={{ opacity, transition: "opacity 0.05s linear" }}>
        <img src={img} alt={title} className="full-hero-img" />
      </div>
    </section>
  );
}


function HalfTile({ title, subtitle, note, img, bg, dark, btnLabel, btnLabel2, logo, bgImage }) {
  const { ref, visible, opacity } = useScrollReveal();
  return (
    <div ref={ref} className={`half-tile${bgImage ? " half-tile-bg-image" : ""}`} style={{ background: bg || (dark ? "#000" : "#fff") }}>
        {/*     || (dark ? "#000" : "#fff") }}>     */}
      <div className="half-tile-text" style={{ opacity, transition: "opacity 0.05s linear" }}>
        {logo && <div className={`half-logo${visible ? " visible" : ""}`}>{logo}</div>}
        <h3 className={`half-title${visible ? " visible" : ""}`}
            style={{ color: dark ? "#f5f5f7" : "#1d1d1f" }}
            dangerouslySetInnerHTML={{ __html: title }} />
        <p className={`half-sub${visible ? " visible" : ""}`}
           style={{ color: dark ? "#a1a1a6" : "#6e6e73" }}>
          {subtitle}
        </p>
        {note && <p className={`half-note${visible ? " visible" : ""}`}>{note}</p>}
        <div className={`half-btns${visible ? " visible" : ""}`}>
          <PillBtn label={btnLabel || "Learn more"} primary small />
          {btnLabel2 && <PillBtn label={btnLabel2} primary={false} small />}
        </div>
      </div>
      <div className="half-tile-img" style={{ opacity, transition: "opacity 0.05s linear" }}>
        <img src={img} alt={title} />
      </div>
    </div>
  );
}


function EntertainmentSection() {
  const scrollRef = useRef(null);
  const scroll = (dir) => {
    scrollRef.current.scrollBy({ left: dir * 680, behavior: "smooth" });
  };

  return (
    <section className="ent-section">
      <h2 className="ent-heading">Endless entertainment.</h2>
      <div className="ent-carousel-wrap">
        <button className="ent-arrow ent-arrow-left" onClick={() => scroll(-1)}>‹</button>
        <div className="ent-carousel" ref={scrollRef}>
          {entertainmentCards.map((c, i) => (
            <div key={i} className="ent-card">
              <img src={c.image} alt={`show ${i}`} className="ent-card-img" />
              <div className="ent-card-bottom">
                <PillBtn label={c.label} primary={false} small />
                {c.genre && <span className="ent-card-genre">{c.genre}</span>}
              </div>
            </div>
          ))}
        </div>
        <button className="ent-arrow ent-arrow-right" onClick={() => scroll(1)}>›</button>
      </div>
      <div className="small-tiles">
        {smallTiles.map((t, i) => (
          <div key={i} className="small-tile">
            <div className="small-tile-img-wrap">
              <img src={t.image} alt={t.title} className="small-tile-img" />
              <span className="small-tile-service">{t.service}</span>
            </div>
            <div className="small-tile-bottom">
              {t.title && <span className="small-tile-title">{t.title}</span>}
              <PillBtn label={t.label} primary={false} small />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


export default function App() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="apple-page">
      <nav className={`apple-nav${scrolled ? " scrolled" : ""}`}>
        <div className="apple-nav-inner">
          <a href="#" className="apple-nav-logo"></a>
          <div className="apple-nav-links">
            {navLinks.map((l, i) => <a key={i} className="apple-nav-link" href="#">{l}</a>)}
          </div>
          <div className="apple-nav-icons">
            <a href="#" className="apple-nav-icon"></a>
            <a href="#" className="apple-nav-icon"></a>
          </div>
        </div>
      </nav>
      <div style={{ height: 44 }} />
      <FullHero
        title="iPhone 17 Pro"
        subtitle="All out Pro."
        img="/images/applee1.jpg"
        dark
        titleSize="lg"
        fullWidth
      />

      <FullHero
        title="iPhone 17"
        subtitle="Magichromatic."
        img="/images/apple2.jpg"
        dark={false}
        titleSize="lg"
        fullWidth
      />

      <FullHero
        title="iPad Pro"
        subtitle={"Advanced AI Performance\nand game-changing capabilities."}
        img="/images/apple3.jpg"
        dark
        titleSize="lg"
        fullWidth
      />

      <div
        style={{
          width: "100vw",
          maxWidth: "100vw",
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
          boxSizing: "border-box",
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >
        <div className="two-col-row">
          <HalfTile
            title=""
            subtitle=""
            img="/images/apple_4.jpg"
            dark
            bg="#000"
            btnLabel="Learn more"
            bgImage
          />
          
          <HalfTile
            title="Apple for College"
            subtitle="Mac and iPad. Major in any field."
            img="/images/apple5.jpg"
            dark={false}
            bg="#f5f5f7"
            btnLabel="Learn more"
            bgImage
          />
        </div>

        <div className="two-col-row">
          <HalfTile
            title={"iPad <em>Air</em>"}
            subtitle="Supercharged by M1."
            img="/images/apple6.jpg"
            dark={false}
            bg="#c9e8f5"
            btnLabel="Learn more"
            btnLabel2="Buy"
            bgImage
          />

          <HalfTile
            logo={<span>Card</span>}
            title=""
            subtitle={"Special new Apple Card \nand AirPods Pro 3 offer."}
            note="Limitations and spend requirements apply."
            img="/images/apple7.jpg"
            dark={false}
            bg="#f5f5f7"
            btnLabel="Learn more"
            btnLabel2="Apply now"
            bgImage
          />
        </div>

        <div className="two-col-row">
          <HalfTile
            logo={<span>Trade In</span>}
            title=""
            subtitle={"Get up to $650 \nin credit when you trade in \niPhone 12 or later."}
            img="/images/apple8.jpg"
            dark={false}
            bg="#f5f5f7"
            btnLabel="Get your estimate"
            bgImage
          />

          <HalfTile
            title={"Any condition \ncarrier deals are here."}
            subtitle="Select carriers accept eligible iPhones in any condition. Other offers available."
            img="/images/apple9.jpg"
            dark={false}
            bg="#f5f5f7"
            btnLabel="Find your deal"
            bgImage
          />
        </div>

        <EntertainmentSection />
      </div>

      <section className="legal-section">
        <div className="legal-inner">
          <p>
            Subject to credit approval. The cost of AirPods Pro 3, for purposes of this
            offer, does not include applicable taxes, fees, or other charges. Offer may
            be modified at any time and is not available to applicants who have had this
            card or who have another pending or approved application for the card.
          </p>

          <p>
            New Apple Card account owners who (1) first open a new Apple Card account
            and (2) then use it to buy AirPods Pro 3 directly from Apple, May 18, 2026,
            through June 15, 2026 ("Qualifying Period"), will qualify to earn up to
            $250 total Bonus Daily Cash after meeting the applicable spend requirements.
          </p>

          <p>
            AirPods Pro 3 purchases must be made directly from Apple (online or in an
            Apple Store) using the new Apple Card. Refurbished products, other AirPods
            models, purchases from third-party retailers, international purchases, and
            purchases for business purposes are excluded.
          </p>

          <p>
            To facilitate this offer and confirm eligibility, Goldman Sachs may share
            certain Apple transaction information with Apple, and Apple may provide
            Goldman Sachs with confirmation of your qualifying AirPods Pro 3 purchase.
          </p>

          <p>
            Offer not available to Apple Card Family members added to, or merged with,
            an Apple Card account during the Offer Period. Limit one offer per new
            Apple Card account.
          </p>

          <p>
            You can choose to direct Daily Cash to a Savings account or to an Apple
            Cash account. If you do not have either set up to receive your Daily Cash,
            it can be applied as statement credit upon request.
          </p>

          <p>
            Apple Card is issued and Savings accounts are provided by Goldman Sachs
            Bank USA, Salt Lake City Branch, Member FDIC. The Apple Cash card is issued
            by Green Dot Bank, Member FDIC.
          </p>

          <p>
            Apple Payments Services LLC, a subsidiary of Apple Inc., is a service
            provider of Goldman Sachs Bank USA for Apple Card and Savings accounts.
            Neither Apple Inc. nor Apple Payments Services LLC is a bank.
          </p>

          <p>
            To access and use all Apple Card features and products available only to
            Apple Card users, you must add Apple Card to Wallet on an iPhone or iPad
            that supports and has the latest version of iOS or iPadOS.
          </p>

          <p>
            Trade-in values will vary based on the condition, year, and configuration
            of your eligible trade-in device. Restrictions and limitations may apply.
          </p>
        </div>
      </section>

      <footer className="apple-footer">
        <div className="apple-footer-inner">
          <div className="apple-footer-cols">
            {footerCols.map((col, i) => (
              <div key={i} className="apple-footer-col">
                <div className="apple-footer-heading">{col.heading}</div>
                {col.links.map((link, idx) => (
                  <a key={idx} className="apple-footer-link" href="#">{link}</a>
                ))}
              </div>
            ))}
          </div>

          <div className="apple-footer-more">
            More ways to shop: <a href="#">Find an Apple Store</a> or <a href="#">other retailer</a> near you.
          </div>

          <div className="apple-footer-bottom">
            <div className="apple-footer-legal">
              <span>Copyright © 2026 Apple Inc. All rights reserved.</span>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
              <a href="#">Sales and Refunds</a>
              <a href="#">Legal</a>
              <a href="#">Site Map</a>
              <span>United States</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );

}
