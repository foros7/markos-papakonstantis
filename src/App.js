import './App.css';
import { useState, useRef } from 'react';
import logo from './logo3.png'; // Adjust the path and filename as needed
import emailjs from '@emailjs/browser';
import GavelIcon from '@mui/icons-material/Gavel';
import BusinessIcon from '@mui/icons-material/Business';
import GroupIcon from '@mui/icons-material/Group';
import SecurityIcon from '@mui/icons-material/Security';

function App() {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const form = useRef();

  const handleAppointmentClick = () => {
    setShowAppointmentModal(true);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setSubmitStatus('sending');
  
    // Send the first email
    emailjs.sendForm(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID, // First template ID
      form.current,
      process.env.REACT_APP_EMAILJS_USER_ID
    )
      .then((result) => {
        // Send the second email
        return emailjs.sendForm(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID_2, // Second template ID
          form.current,
          process.env.REACT_APP_EMAILJS_USER_ID
        );
      })
      .then((result) => {
        setSubmitStatus('success');
        setTimeout(() => {
          setShowAppointmentModal(false);
          setSubmitStatus('');
        }, 3000);
      })
      .catch((error) => {
        setSubmitStatus('error');
      });
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="Site Logo" className="site-logo" />
        <nav className="navbar">
          <div className="nav-brand">ΜΑΡΚΟΣ ΠΑΠΑΚΩΝΣΤΑΝΤΗΣ</div>
          <div className="nav-links">
            <a href="#home">ΑΡΧΙΚΗ</a>
            <a href="#services">ΥΠΗΡΕΣΙΕΣ</a>
            <a href="#about">ΣΧΕΤΙΚΑ ΜΕ ΕΜΑΣ</a>
            <a href="#contact">ΕΠΙΚΟΙΝΩΝΙΑ</a>
          </div>
        </nav>
      </header>

      <section id="home" className="hero-section">
        <p>Προσφέρουμε εξειδικευμένες και ολοκληρωμένες νομικές υπηρεσίες, προσαρμοσμένες στις ιδιαίτερες ανάγκες κάθε πελάτη, διασφαλίζοντας την πλήρη προστασία των δικαιωμάτων και συμφερόντων σας.</p>
        <div className="hero-buttons">
          <button className="cta-button" onClick={handleAppointmentClick}>ΚΛΕΙΣΤΕ ΡΑΝΤΕΒΟΥ</button>
        </div>
      </section>

      <section id="services" className="services-section">
        <h2>Οι Υπηρεσίες Μας</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">
              <BusinessIcon />
            </div>
            <div className="service-content">
              <h3>Εμπορικό Δίκαιο</h3>
              <p>Συμβουλές και εκπροσώπηση σε εμπορικές υποθέσεις</p>
            </div>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <GroupIcon />
            </div>
            <div className="service-content">
              <h3>Εργατικό Δίκαιο</h3>
              <p>Προστασία δικαιωμάτων εργαζομένων και εργοδοτών</p>
            </div>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <GavelIcon />
            </div>
            <div className="service-content">
              <h3>Αστικό Δίκαιο</h3>
              <p>Διαχείριση αστικών υποθέσεων και διαφορών</p>
            </div>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <SecurityIcon />
            </div>
            <div className="service-content">
              <h3>Ποινικό Δίκαιο</h3>
              <p>Υπεράσπιση και νομική εκπροσώπηση</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="about-section">
        <h2>Σχετικά με το Γραφείο μας</h2>
        <p>
          Με πολυετή εμπειρία στον χώρο της νομικής, το γραφείο μας προσφέρει
          ολοκληρωμένες νομικές υπηρεσίες με επαγγελματισμό και συνέπεια.
          Στόχος μας είναι η άριστη εξυπηρέτηση των πελατών μας και η επίτευξη
          των καλύτερων δυνατών αποτελεσμάτων.
        </p>
      </section>

      <section id="contact" className="contact-section">
        <h2>Επικοινωνία</h2>
        <div className="contact-wrapper">
          <div className="contact-info">
            <p>Διεύθυνση: Ελ. Βενιζέλου 56, Αθήνα 10678</p>
            <p>Κινητό: +30 6932602151</p>
            <p>Σταθερό: +30 2130229176</p>
            <p>Email: info@papakonstantis-law.gr</p>
          </div>
          <div className="map-section">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3144.8454743250965!2d23.733436776491547!3d37.98426070666042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1bd3c8d4d4c3d%3A0x6f0c0c0c0c0c0c0!2zzpXOuy4gzpLOtc69zrnOts6tzrvOv8-FIDU2LCDOkc64zq7Ovc6xIDEwNjc4!5e0!3m2!1sel!2sgr!4v1620000000000!5m2!1sel!2sgr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Τοποθεσία Γραφείου"
            ></iframe>
          </div>
        </div>
      </section>

      {showAppointmentModal && (
        <div className="modal-overlay">
          <div className="appointment-modal">
            <button className="close-modal" onClick={() => setShowAppointmentModal(false)}>×</button>
            <h2>Κλείστε Ραντεβού</h2>
            <form ref={form} onSubmit={sendEmail} className="appointment-form">
              <div className="form-group">
                <label>Ονοματεπώνυμο</label>
                <input type="text" name="user_name" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="user_email" required />
              </div>
              <div className="form-group">
                <label>Τηλέφωνο</label>
                <input type="tel" name="user_phone" required />
              </div>
              <div className="form-group">
                <label>Ημερομηνία</label>
                <input type="date" name="appointment_date" required />
              </div>
              <div className="form-group">
                <label>Ώρα</label>
                <select name="appointment_time" required>
                  <option value="">Επιλέξτε ώρα</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                </select>
              </div>
              <div className="form-group">
                <label>Σχόλια</label>
                <textarea name="message" rows="4"></textarea>
              </div>
              <button type="submit" className="submit-button" disabled={submitStatus === 'sending'}>
                {submitStatus === 'sending' ? 'Αποστολή...' : 'Υποβολή'}
              </button>
              {submitStatus === 'success' && (
                <div className="success-message">Το ραντεβού σας καταχωρήθηκε επιτυχώς!</div>
              )}
              {submitStatus === 'error' && (
                <div className="error-message">Υπήρξε ένα πρόβλημα. Παρακαλώ δοκιμάστε ξανά.</div>
              )}
            </form>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>© 2024 ΠΑΠΑΚΩΝΣΤΑΝΤΗΣ- Όλα τα δικαιώματα κατοχυρωμένα</p>
      </footer>
    </div>
  );
}

export default App;
