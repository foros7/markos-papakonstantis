import './App.css';
import { useState } from 'react';
import logo from './logo.png'; // Adjust the path and filename as needed

function App() {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  const handleAppointmentClick = () => {
    setShowAppointmentModal(true);
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
        <h1>ΝΟΜΙΚΗ ΑΡΙΣΤΕΙΑ & ΕΠΑΓΓΕΛΜΑΤΙΣΜΟΣ</h1>
        <p>Εξειδικευμένη νομική υποστήριξη με πάνω από 20 χρόνια εμπειρίας στην υπηρεσία σας</p>
        <button className="cta-button" onClick={handleAppointmentClick}>ΚΛΕΙΣΕ ΡΑΝΤΕΒΟΥ</button>
      </section>

      <section id="services" className="services-section">
        <h2>Οι Υπηρεσίες Μας</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>Εμπορικό Δίκαιο</h3>
            <p>Συμβουλές και εκπροσώπηση σε εμπορικές υποθέσεις</p>
          </div>
          <div className="service-card">
            <h3>Εργατικό Δίκαιο</h3>
            <p>Προστασία δικαιωμάτων εργαζομένων και εργοδοτών</p>
          </div>
          <div className="service-card">
            <h3>Αστικό Δίκαιο</h3>
            <p>Διαχείριση αστικών υποθέσεων και διαφορών</p>
          </div>
          <div className="service-card">
            <h3>Ποινικό Δίκαιο</h3>
            <p>Υπεράσπιση και νομική εκπροσώπηση</p>
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
        <div className="contact-info">
          <p>Διεύθυνση: Ελ. Βενιζέλου 56, Αθήνα 10678</p>
          <p>Κινητό: +30 6932602151</p>
          <p>Σταθερό: +30 2130229176</p>
          <p>Email: info@papakonstantis-law.gr</p>
        </div>
      </section>

      {showAppointmentModal && (
        <div className="modal-overlay">
          <div className="appointment-modal">
            <button className="close-modal" onClick={() => setShowAppointmentModal(false)}>×</button>
            <h2>Κλείστε Ραντεβού</h2>
            <form className="appointment-form">
              <div className="form-group">
                <label>Ονοματεπώνυμο</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" required />
              </div>
              <div className="form-group">
                <label>Τηλέφωνο</label>
                <input type="tel" required />
              </div>
              <div className="form-group">
                <label>Ημερομηνία</label>
                <input type="date" required />
              </div>
              <div className="form-group">
                <label>Ώρα</label>
                <select required>
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
                <textarea rows="4"></textarea>
              </div>
              <button type="submit" className="submit-button">Υποβολή</button>
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
