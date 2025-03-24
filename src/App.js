import './App.css';
import { useState, useRef, useEffect } from 'react';
import logo from './logo3.png'; // Adjust the path and filename as needed
import emailjs from '@emailjs/browser';
import GavelIcon from '@mui/icons-material/Gavel';
import BusinessIcon from '@mui/icons-material/Business';
import GroupIcon from '@mui/icons-material/Group';
import SecurityIcon from '@mui/icons-material/Security';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PolicyIcon from '@mui/icons-material/Policy';
import image from './image.png'; // Add this import
import { FaHandcuffs } from 'react-icons/fa6';

function ServiceModal({ service, isOpen, onClose }) {
  return (
    <div className={`service-modal-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div 
        className={`service-modal ${isOpen ? 'active' : ''}`} 
        onClick={e => e.stopPropagation()}
      >
        <button className="service-modal-close" onClick={onClose}>×</button>
        <h3>{service.title}</h3>
        <div className="service-modal-content">
          <ul>
            {service.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ServiceCard Component
function ServiceCard({ service }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        className="service-card"
        onClick={() => setIsModalOpen(true)}
      >
        {service.icon}
        <h3>{service.title}</h3>
      </div>
      <ServiceModal 
        service={service}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

function App() {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const form = useRef();
  const [showBiographyModal, setShowBiographyModal] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        <div className="header-content" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          padding: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src={logo} alt="Site Logo" className="site-logo" />
            <div className="nav-brand">ΜΑΡΚΟΣ ΠΑΠΑΚΩΝΣΤΑΝΤΗΣ</div>
          </div>
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: windowWidth <= 768 ? 'block' : 'none',
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer'
            }}
          >
            ☰
          </button>
        </div>
        <nav className={`navbar ${mobileMenuOpen ? 'mobile-open' : ''}`} style={{
          display: windowWidth <= 768 ? (mobileMenuOpen ? 'flex' : 'none') : 'flex',
          justifyContent: 'center',
          width: '100%',
          padding: '0.5rem'
        }}>
          <div className="nav-links" style={{
            display: 'flex',
            gap: '2rem',
            justifyContent: 'center',
            flexDirection: windowWidth <= 768 ? 'column' : 'row',
            width: '100%',
            alignItems: 'center'
          }}>
            <a href="#home" onClick={() => setMobileMenuOpen(false)}>ΑΡΧΙΚΗ</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)}>ΥΠΗΡΕΣΙΕΣ</a>
            <a href="#biography" onClick={() => setMobileMenuOpen(false)}>ΒΙΟΓΡΑΦΙΚΟ</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>ΕΠΙΚΟΙΝΩΝΙΑ</a>
          </div>
        </nav>
      </header>

      <style>
        {`
          .App {
            overflow-x: hidden;
          }

          .header-content {
            position: relative;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
          }

          .site-logo {
            height: 50px;
            width: auto;
          }

          @media screen and (max-width: 768px) {
            .navbar {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              background: #1a1a2e;
              flex-direction: column;
              padding: 1rem;
              z-index: 1000;
              height: 100vh;
            }

            .nav-brand {
              text-align: center;
              margin-bottom: 2rem;
            }

            .nav-links {
              display: flex;
              flex-direction: column;
              gap: 1rem;
            }

            .nav-links a {
              display: block;
              padding: 1rem;
              text-align: center;
              color: white;
              text-decoration: none;
              font-size: 1.2rem;
              border-bottom: 1px solid rgba(255,255,255,0.1);
            }

            .services-grid {
              grid-template-columns: 1fr !important;
              padding: 1rem !important;
            }

            .biography-wrapper {
              grid-template-columns: 1fr !important;
              padding: 1rem !important;
            }

            .contact-wrapper {
              grid-template-columns: 1fr !important;
              padding: 1rem !important;
            }

            .hero-section {
              padding: 2rem 1rem;
              margin-top: 60px;
            }

            .hero-section p {
              font-size: 1rem;
              line-height: 1.5;
              text-align: center;
            }

            .service-card {
              margin-bottom: 1rem;
            }

            .service-modal {
              width: 95% !important;
              margin: 1rem auto !important;
              max-height: 90vh !important;
            }

            .appointment-form {
              padding: 1rem;
            }

            .form-group {
              margin-bottom: 1rem;
            }

            .form-group input,
            .form-group select,
            .form-group textarea {
              width: 100%;
              padding: 0.8rem;
              font-size: 16px;
            }

            .map-section {
              height: 300px;
            }
          }
        `}
      </style>

      <section id="home" className="hero-section">
        <p>Προσφέρουμε εξειδικευμένες και ολοκληρωμένες νομικές υπηρεσίες, προσαρμοσμένες στις ιδιαίτερες ανάγκες κάθε πελάτη, διασφαλίζοντας την πλήρη προστασία των δικαιωμάτων και των συμφερόντων σας.</p>
        <div className="hero-buttons">
          <button className="cta-button" onClick={handleAppointmentClick}>ΚΛΕΙΣΤΕ ΡΑΝΤΕΒΟΥ</button>
        </div>
      </section>

      <section id="services" className="services-section">
        <h2>Υπηρεσίες</h2>
        <div className="services-grid" style={{ 
          display: 'grid',
          gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(3, 1fr)',
          gap: window.innerWidth <= 768 ? '1rem' : '2rem',
          padding: window.innerWidth <= 768 ? '1rem' : '2rem'
        }}>
          {[
            {
              icon: <GavelIcon className="service-icon" />,
              title: "Αστικό Δίκαιο",
              items: [
                "Ενοχικό Δίκαιο",
                "Οικογενειακό Δίκαιο",
                "Κληρονομικό Δίκαιο",
                "Εμπράγματο Δίκαιο",
                "Αποζημίωση από αδικοπραξίες",
                "Εμπράγματο δίκαιο (κινητά και ακίνητα)",
                "Τροχαία",
                "Ρυθμίσεις οφειλών"
              ]
            },
            {
              icon: <FaHandcuffs className="service-icon" />,
              title: "Ποινικό Δίκαιο",
              items: [
                "Εγκλήματα Οικονομικού Ποινικού Δικαίου",
                "Χρέη στο Δημόσιο",
                "Ποινική Συνδιαλλαγή",
                "Ν. 1608/1950",
                "Φυλάκιση και Έκτιση ποινών",
                "Αναστολή και Μετατροπή ποινής",
                "Εγκληματική Οργάνωση",
                "Ηλεκτρονικό Έγκλημα",
                "Εγκλήματα σχετικά με τα Υπομνήματα",
                "Εγκλήματα σχετικά με την Υπηρεσία",
                "Εργατικά/Αυτοκινητικά ατυχήματα",
                "Εγκλήματα κατά της τιμής",
                "Εγκλήματα κατά της ζωής και της υγείας",
                "Φορολογικές παραβάσεις",
                "Ακάλυπτες επιταγές",
                "Εγκλήματα κατά της ιδιοκτησίας",
                "Εγκλήματα κατά της περιουσίας",
                "Παραβάσεις Αγορανομικών/Υγειονομικών Διατάξεων"
              ]
            },
            {
              icon: <BusinessIcon className="service-icon" />,
              title: "Διοικητικό Δίκαιο",
              items: [
                "Εκπροσώπηση ενώπιον Διοικητικών Δικαστηρίων και Διοικητικών Αρχών",
                "Προσφυγές και αιτήσεις ακύρωσης κατά διοικητικών πράξεων",
                "Πολεοδομική νομοθεσία",
                "Ενστάσεις ενώπιον αρμοδίων Διοικητικών Επιτροπών και Αρχών",
                "Αστική Ευθύνη Δημοσίου και ΝΠΔΔ",
                "Δημοσιοϋπαλληλικό Δίκαιο",
                "Δημοσιονομικό Δίκαιο – Ελεγκτικό Συνέδριο",
                "Δίκαιο Τοπικής Αυτοδιοίκησης"
              ]
            },
            {
              icon: <BusinessIcon className="service-icon" />,
              title: "Εταιρικό Δίκαιο",
              items: [
                "Σύσταση εταιρειών",
                "Λειτουργία εταιρειών – Συμβουλευτική σε ζητήματα εταιρικής διακυβέρνησης",
                "Συμβουλευτική εταιρειών σε επίπεδο φορολογικής πολιτικής και συμμόρφωσης (tax planning)",
                "Μετατροπή εταιριών με συγχώνευση, απορρόφηση ή απόσχιση κλάδου (M & As)",
                "Εξαγορές εταιριών και μετοχών",
                "Νομική υποστήριξη startup εταιρικών σχημάτων",
                "Πτωχευτική διαδικασία και διαδικασίες διακανονισμού χρεών",
                "Συμμετοχική χρηματοδότηση (crowdfunding)"
              ]
            },
            {
              icon: <MedicalServicesIcon className="service-icon" />,
              title: "Ιατρική αμέλεια – Ιατρική ευθύνη",
              items: [
                "Δίκες για ιατρική αμέλεια, αστικές και ποινικές",
                "Αιτήσεις προς νοσοκομεία και εισαγγελικές αρχές",
                "Γνωμοδοτήσεις για ιατρική αμέλεια",
                "Συνεργασία με ιατροδικαστές και πραγματογνώμονες",
                "Αποζημίωση για ιατρικά λάθη",
                "Νομική συνδρομή στο Ιατρικό Δίκαιο",
                "Προσεπικλήσεις προς ασφαλιστικές εταιρείες",
                "Διαμεσολάβηση και συμβιβαστική επίλυση",
                "Νομική συνδρομή σε ΕΔΕ και πειθαρχικές διαδικασίες"
              ]
            },
            {
              icon: <GroupIcon className="service-icon" />,
              title: "Μεταναστευτικό και Δίκαιο Διεθνούς Προστασίας",
              items: [
                "Άδειες διαμονής (εργασία, οικογενειακή επανένωση, μακράς διάρκειας)",
                "Άδειες για εξαιρετικούς και ανθρωπιστικούς λόγους",
                "Άδειες για σπουδές και στελέχη επιχειρήσεων",
                "Αιτήσεις διεθνούς προστασίας (άσυλο)",
                "Προσφυγές επί απορριπτικών αποφάσεων ασύλου",
                "Χορήγηση ελληνικής ιθαγένειας"
              ]
            }
          ].map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </section>

      <section id="biography" className="biography-section" style={{
        padding: '4rem 0',
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
      }}>
        <h2 style={{
          textAlign: 'center',
          color: '#1a1a2e',
          marginBottom: '2rem',
          fontSize: windowWidth <= 768 ? '1.8rem' : '2.2rem'
        }}>Βιογραφικό</h2>
        <div className="biography-wrapper" style={{
          display: 'flex',
          flexDirection: windowWidth <= 768 ? 'column' : 'row',
          gap: '2rem',
          padding: '2rem',
          background: '#1a1a2e',
          borderRadius: '12px',
          margin: '0 auto',
          maxWidth: '1200px',
          width: windowWidth <= 768 ? '90%' : '80%',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div className="biography-image" style={{
            flex: windowWidth <= 768 ? '1' : '0.8',
            background: '#1a1a2e',
            padding: '1rem',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'fit-content',
            margin: '0 auto'
          }}>
            <img src={image} alt="Μάρκος Παπακωνσταντής" style={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
              objectFit: 'cover'
            }} />
          </div>
          <div className="biography-text" style={{
            flex: windowWidth <= 768 ? '1' : '1.2',
            background: '#1a1a2e',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1.5rem',
            alignItems: 'center'
          }}>
            <p style={{
              fontSize: windowWidth <= 768 ? '1rem' : '1.1rem',
              lineHeight: '1.6',
              color: 'white',
              margin: 0,
              textAlign: 'justify'
            }}>
              Ο δικηγόρος Μάρκος Παπακωνσταντής διαθέτει μια 25ετή εμπειρία στην παροχή νομικών
              υπηρεσιών σε συμβουλευτικό και δικαστηριακό επίπεδο σε φυσικά και νομικά πρόσωπα τόσο στα
              εθνικά όσο και σε διεθνή δικαστήρια. Παράλληλα, διαθέτει μια 20ετή ακαδημαϊκή και
              επιστημονική εμπειρία στο ενωσιακό δίκαιο κυρίως στα θέματα του Χώρου Ελευθερίας, Ασφάλειας
              και Δικαιοσύνης (ΧΕΑΔ) της Ευρωπαϊκής Ένωσης και σε θέματα προστασίας των Ανθρωπίνων
              Δικαιωμάτων.
            </p>
            
            <button 
              className="biography-button" 
              onClick={() => setShowBiographyModal(true)}
              style={{
                background: '#beaf94',
                color: '#1a1a2e',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                width: windowWidth <= 768 ? '100%' : 'auto',
                alignSelf: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                ':hover': {
                  background: '#C5A028'
                }
              }}
            >
              Αναλυτικό Βιογραφικό
            </button>
          </div>
        </div>
      </section>

      <style>
        {`
          .biography-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            padding: 4rem 0;
            background: white;
          }

          @media screen and (max-width: 768px) {
            .biography-section {
              padding: 2rem 0;
            }

            .biography-section h2 {
              font-size: 1.8rem;
              margin-bottom: 1rem;
              text-align: center;
              color: #1a1a2e;
            }

            .biography-wrapper {
              margin: 1rem auto;
              width: 90%;
            }

            .biography-text p {
              font-size: 1rem !important;
              line-height: 1.6 !important;
              text-align: justify !important;
            }

            .biography-button {
              margin-top: 1rem;
              width: 100%;
            }

            .biography-button:hover {
              background: #C5A028 !important;
            }
          }
        `}
      </style>

      <section id="contact" className="contact-section">
        <h2>Επικοινωνία</h2>
        <div className="contact-wrapper" style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(2, 1fr)',
          gap: window.innerWidth <= 768 ? '1rem' : '2rem',
          padding: window.innerWidth <= 768 ? '1rem' : '2rem'
        }}>
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
        <div className={`service-modal-overlay ${showAppointmentModal ? 'active' : ''}`} onClick={() => setShowAppointmentModal(false)}>
          <div 
            className={`service-modal ${showAppointmentModal ? 'active' : ''}`}
            onClick={(e) => e.stopPropagation()}
            style={{ 
              width: '90%',
              maxWidth: '600px',
              overflowY: 'auto'
            }}
          >
            <button className="service-modal-close" onClick={() => setShowAppointmentModal(false)}>×</button>
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
                <label>Τύπος Συνάντησης</label>
                <select name="meeting_type" required>
                  <option value="">Επιλέξτε τύπο συνάντησης</option>
                  <option value="in_person">Δια ζώσης</option>
                  <option value="online">Online (Zoom/Skype)</option>
                </select>
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

      {showBiographyModal && (
        <div className={`service-modal-overlay ${showBiographyModal ? 'active' : ''}`} onClick={() => setShowBiographyModal(false)}>
          <div 
            className={`service-modal ${showBiographyModal ? 'active' : ''}`}
            onClick={(e) => e.stopPropagation()}
            style={{ 
              width: '90%', 
              height: '90vh',
              maxWidth: '1200px',
              overflowY: 'auto'
            }}
          >
            <button className="service-modal-close" onClick={() => setShowBiographyModal(false)}>×</button>
            <h2>Αναλυτικό Βιογραφικό</h2>
            
            <div className="service-modal-content">
              <div className="biography-modal-section">
                <h3>ΣΠΟΥΔΕΣ</h3>
                <ul>
                  <li>1989 – 1993: Maîtrise en Droit des Affaires, Université Grenoble-Alpes, Faculté de Droit</li>
                  <li>1993 - 1995: Diplôme d'Études Approfondies (DEA) en Droit des Affaires Européennes, Université de Nancy II, Faculté de Droit, Centre Européen Universitaire, Droit européen des Affaires</li>
                  <li>1995 – 2000: Doctorat en Droit Européen, Université de Nancy II, Faculté de Droit</li>
                  <li>2000 – 2004: Δημοκρίτειο Πανεπιστήμιο Θράκης, Νομική Σχολή</li>
                </ul>
              </div>

              <div className="biography-modal-section">
                <h3>ΔΙΑΚΡΙΣΕΙΣ – ΒΡΑΒΕΙΑ</h3>
                <ul>
                  <li>2002: Καλύτερη διδακτορική διατριβή για τη διετία 2000-2001 που υποστηρίχτηκε σε Ελλάδα και στο εξωτερικό σχετικά με τις ιστορικές, θεσμικές, δικαϊκές, πολιτικές, οικονομικές και κοινωνικές πτυχές της ευρωπαϊκής ολοκλήρωσης, Ελληνική Πανεπιστημιακή Ένωση Ευρωπαϊκών Σπουδών (Ε.Π.Ε.Ε.Σ.)</li>
                  <li>2002: Χρηματικό βραβείο για τη διδακτορική διατριβή, Γραφείο του Ευρωπαϊκού Κοινοβουλίου για την Ελλάδα</li>
                </ul>
              </div>

              <div className="biography-modal-section">
                <h3>ΞΕΝΕΣ ΓΛΩΣΣΕΣ</h3>
                <ul>
                  <li>ΓΑΛΛΙΚΑ: Άριστα</li>
                  <li>ΑΓΓΛΙΚΑ: Πολύ καλά</li>
                </ul>
              </div>

              <div className="biography-modal-section">
                <h3>ΕΠΑΓΓΕΛΜΑΤΙΚΗ ΔΡΑΣΤΗΡΙΟΤΗΤΑ</h3>
                <ul>
                  <li>2003 – Σήμερα: Δικηγόρος Παρ'Αρείω (ΑΜ ΔΣΑ 27087)</li>
                  <li>1/2010 – 6/2011: Επιστημονικός Συνεργάτης στο Υπουργείο Εσωτερικών</li>
                  <li>6/2013 – 6/2014: Πρόεδρος σε 3μελή επιτροπή της Αρχής Προσφυγών για το Άσυλο (Ν. 3907/2011). Αξιολόγηση από την Εθνική Επιτροπή για τα Δικαιώματα του Ανθρώπου</li>
                  <li>11/2015 – 6/2019: Ειδικός Σύμβουλος στο Υπουργείο Μεταναστευτικής Πολιτικής</li>
                  <li>9/2022 – 1/2023: E&Y. Συμμετοχή στην εκπόνηση μελετών για τη βελτίωση του επιτελικού κράτους</li>
                </ul>
              </div>

              <div className="biography-modal-section">
                <h3>ΑΚΑΔΗΜΑΪΚΗ ΔΡΑΣΤΗΡΙΟΤΗΤΑ</h3>
                
                <h4>1/2008 – 2024: ΠΑΝΤΕΙΟ ΠΑΝΕΠΙΣΤΗΜΙΟ – ΤΜΗΜΑ ΔΗΜΟΣΙΑΣ ΔΙΟΙΚΗΣΗΣ</h4>
                <p>ΠΡΟΠΤΥΧΙΑΚΟ ΠΡΟΓΡΑΜΜΑ ΣΠΟΥΔΩΝ: Συνδιδασκαλία και αυτοδύναμη διδασκαλία μαθημάτων:</p>
                <ul>
                  <li>Εισαγωγή στο Ευρωπαϊκό Δίκαιο</li>
                  <li>Ευρωπαϊκό Δίκαιο</li>
                  <li>Ειδικά θέματα ευρωπαϊκής ολοκλήρωσης</li>
                  <li>Ευρωπαϊκό Φορολογικό Δίκαιο</li>
                </ul>

                <p>ΜΕΤΑΠΤΥΧΙΑΚΟ ΠΡΟΓΡΑΜΜΑ ΣΠΟΥΔΩΝ – ΕΘΝΙΚΗ ΚΑΙ ΕΝΩΣΙΑΚΗ ΔΙΟΙΚΗΣΗ: Αυτοδύναμη διδασκαλία μαθήματος: Εθνική και Ενωσιακή Διοίκηση</p>

                <h4>2/2015 - 2018: ΠΑΝΤΕΙΟ ΠΑΝΕΠΙΣΤΗΜΙΟ – ΤΜΗΜΑ ΚΟΙΝΩΝΙΟΛΟΓΙΑΣ</h4>
                <p>ΜΕΤΑΠΤΥΧΙΑΚΟ ΠΡΟΓΡΑΜΜΑ ΣΠΟΥΔΩΝ – ΕΥΡΩΠΑΪΚΗ ΚΟΙΝΩΝΙΚΗ ΠΟΛΙΤΙΚΗ</p>
                <p>Συνδιδασκαλία μαθημάτων:</p>
                <ul>
                  <li>Ευρωπαϊκή Κοινωνική Πολιτική</li>
                  <li>Κοινωνικό κράτος στην Ελλάδα</li>
                  <li>Οικονομική κρίση και κοινωνικό κράτος στην Ελλάδα και την Ευρώπη: εξελίξεις, προβλήματα, προοπτικές</li>
                </ul>

                <h4>3/2022 – 2024: ΠΑΝΤΕΙΟ ΠΑΝΕΠΙΣΤΗΜΙΟ – ΤΜΗΜΑ ΔΙΕΘΝΩΝ, ΕΥΡΩΠΑΪΚΩΝ ΚΑΙ ΠΕΡΙΦΕΡΕΙΑΚΩΝ ΣΠΟΥΔΩΝ</h4>
                <p>ΜΕΤΑΠΤΥΧΙΑΚΟ ΠΡΟΓΡΑΜΜΑ ΣΠΟΥΔΩΝ – Η ΕΛΛΑΔΑ ΚΑΙ Ο ΚΟΣΜΟΣ</p>
                <p>Θεματικές διδασκαλίας:</p>
                <ul>
                  <li>Πολιτική μετανάστευσης και ασύλου της ΕΕ</li>
                  <li>Αντιτρομοκρατική πολιτική της ΕΕ</li>
                </ul>

                <h4>4/2022 – Σήμερα: ΕΛΛΗΝΙΚΟ ΑΝΟΙΚΤΟ ΠΑΝΕΠΙΣΤΗΜΙΟ</h4>
                <p>ΣΧΟΛΗ ΚΟΙΝΩΝΙΚΩΝ ΕΠΙΣΤΗΜΩΝ - ΜΕΤΑΠΤΥΧΙΑΚΟ/ΕΙΔΙΚΟ ΠΡΟΓΡΑΜΜΑ ΣΠΟΥΔΩΝ – ΕΥΡΩΠΑΙΚΟ ΔΙΚΑΙΟ</p>
                <p>Θεματική Ενότητα [ΕΔΙ62] Ε.Ε.: Χώρος Ελευθερίας - Ασφάλειας και Δικαιοσύνης</p>
              </div>

              <div className="biography-modal-section">
                <h3>ΛΟΙΠΗ
                ΔΙΔΑΣΚΑΛΙΑ /
                ΕΠΙΜΟΡΦΩΣΕΙΣ</h3>
                <h4>1. ΕΞΩΤΕΡΙΚΟΣ ΣΥΝΕΡΓΑΤΗΣ ΕΥΡΩΠΑΙΚΗΣ ΕΠΙΤΡΟΠΗΣ ΓΙΑ ΘΕΜΑΤΑ
                ΕΥΡΩΜΕΣΟΓΕΙΑΚΗΣ ΣΥΝΕΡΓΑΣΙΑΣ</h4>
                <p>Μαρόκο, 3/2004
Εισηγήσεις σε φοιτητές νομικών σχολών Μαρόκου (Rabat, Tanger, Tetouan,
Casablanca), σε ανώτατα κυβερνητικά στελέχη και σε σπουδαστές στην Εθνική
Σχολή δημόσιας Διοίκησης Μαρόκου.</p>
                <p>Θεματικές διδασκαλίας:</p>
                <ul>
                  <li>Ευρωμεσογειακή Συνεργασία</li>
                  <li>Ευρωπαϊκή Πολιτική Γειτονίας</li>
                </ul>
                <h4>2. ΕΠΙΜΟΡΦΩΤΗΣ ΕΚΠΑΙΔΕΥΤΙΚΩΝ Β'ΒΑΘΜΙΑΣ ΣΕ ΘΕΜΑΤΑ ΕΥΡΩΠΑΙΚΗΣ ΕΝΩΣΗΣ</h4>
                <p>9/2005 - 11/2006: «Ταχύρρυθμο Επιμορφωτικό Πρόγραμμα για την Ευρωπαϊκή Ένωση», Τμήμα Αξιολόγησης και Επιμόρφωσης Παιδαγωγικού Ινστιτούτου</p>
                <p>Τόπος υλοποίησης: Περιφερειακά Επιμορφωτικά Κέντρα:</p>
                <ul>
                  <li>Πειραιά (10-11/3/2006)</li>
                  <li>Γιαννιτσών (17-18/3/2006)</li>
                  <li>Ηρακλείου (14-15/4/2006)</li>
                  <li>Χαλκίδας (31/3-01/04/2006)</li>
                  <li>Κοζάνης (3-4/11/2006)</li>
                </ul>
                <p>Θεματικές διδασκαλίας:</p>
                <ul>
                  <li>Ιστορία και αναγκαιότητα της ευρωπαϊκής</li>
                  <li>Δομή και λειτουργία της Ευρωπαϊκής Ένωσης</li>
                  <li>Αρμοδιότητες, πολιτικές της Ευρωπαϊκής Ένωσης</li>
                </ul>

                <h4>3. ΔΙΑΛΕΚΤΗΣ-ΚΑΘΗΓΗΤΗΣ ΣΧΟΛΗ ΕΘΝΙΚΗΣ ΑΣΦΑΛΕΙΑΣ</h4>
                <p>ΑΣΤΥΝΟΜΙΚΗ ΑΚΑΔΗΜΙΑ, Θρακομακεδόνες, 2011-2012</p>
                <p>Θεματικές διδασκαλίας:</p>
                <ul>
                  <li>Αίτια εισόδου, μεταναστευτικές εισροές και απόθεμα στην Ελλάδα την τελευταία εικοσαετία</li>
                  <li>Δημογραφικές και οικονομικές επιδράσεις της μετανάστευσης στην Ελλάδα ως χώρα υποδοχής μεταναστών. Κοινοτική – ελληνική μεταναστευτική πολιτική</li>
                </ul>

                <h4>4. ΔΙΔΑΣΚΑΛΙΕΣ ΣΤΟ ΠΛΑΙΣΙΟ ΕΡΓΟΥ «ΑΚΑΔΗΜΙΑ ΠΛΑΤΩΝΟΣ – Η ΠΟΛΙΤΕΙΑ ΚΑΙ Ο ΠΟΛΙΤΗΣ»</h4>
                <p>ΕΚΠΑ, 11/2012 – 07/2015</p>
                <p>Θεματικές διδασκαλίας:</p>
                <ul>
                  <li>Ιδανική Πολιτεία. Ουτοπία;</li>
                  <li>Από την πολίτη της πόλης-κράτους στον σύγχρονο πολίτη</li>
                  <li>Η τέχνη (;) του κυβερνάν</li>
                </ul>

                <h4>5-7. ΕΙΣΗΓΗΣΕΙΣ ΣΕ ΕΠΙΜΟΡΦΩΣΕΙΣ ΔΙΚΑΣΤΙΚΩΝ ΛΕΙΤΟΥΡΓΩΝ</h4>
                <ul>
                  <li>Θεσσαλονίκη, ΕΣΔι, 19-20/1/2017: «Μεταναστευτικές και προσφυγικές ροές στην Ελλάδα»</li>
                  <li>Θεσσαλονίκη, ΕΣΔι, 6/3/2017: «Πρόσφατη νομολογία ΔΕΕ σε θέματα διεθνούς προστασίας»</li>
                  <li>Αθήνα, 27-28/11/2017: Παγκόσμιο Συνέδριο Διεθνούς Ένωσης Δικαστών για το Άσυλο</li>
                </ul>

                <h4>8. ΕΚΠΑΙΔΕΥΤΗΣ ΚΕΜΕΑ</h4>
                <p>Δράση: «Ενίσχυση των Φορέων Επιβολής του Νόμου για την Αναγνώριση και την Καταπολέμηση της Ριζοσπαστικοποίησης και του Εξτρεμισμού»</p>
                <p>Αθήνα, 4/2019 – 9/2019</p>
                <p>Θεματικές εκπαίδευσης:</p>
                <ul>
                  <li>Η λειτουργία του Χώρου Ελευθερίας, Ασφάλειας και Δικαιοσύνης (ΧΕΑΔ) της ΕΕ</li>
                  <li>Ορισμός τρομοκρατίας κατά το διεθνές και ενωσιακό δίκαιο</li>
                  <li>Εξέλιξη του φαινομένου της τρομοκρατίας εντός των κρατών μελών της ΕΕ</li>
                  <li>Πλαίσιο πρόληψης και καταπολέμησης της τρομοκρατίας σύμφωνα με ενωσιακό δίκαιο</li>
                  <li>Αντιμετώπιση του φαινομένου αλλοδαπών τρομοκρατών μαχητών σύμφωνα με σχετικό εγχειρίδιο του FRONTEX</li>
                </ul>

                <h4>9. ΕΙΣΗΓΗΤΗΣ ΣΕ ΕΠΙΜΟΡΦΩΤΙΚΟ ΣΕΜΙΝΑΡΙΟ ΤΗΣ ΓΕΝΙΚΗΣ ΕΠΙΤΡΟΠΕΙΑΣ ΤΗΣ
ΕΠΙΚΡΑΤΕΙΑΣ ΤΩΝ ΤΑΚΤΙΚΩΝ ΔΙΟΙΚΗΤΙΚΩΝ ΔΙΚΑΣΤΗΡΙΩΝ ΓΙΑ ΤΑ ΝΕΑ ΜΕΛΗ
ΤΩΝ ΕΠΙΤΡΟΠΩΝ ΠΡΟΣΦΥΓΩN</h4>
                <p>Αθήνα, 19-20/12/2019</p>
                <p>Θεματικές εκπαίδευσης:</p>
                <ul>
                  <li>Εισαγωγή στο κοινό ευρωπαϊκό σύστημα ασύλου</li>
                  <li>Μεταφορά ενωσιακού δικαίου στην εθνική έννομη τάξη</li>
                </ul>

                <h4>10. ΕΠΙΣΤΗΜΟΝΙΚΟΣ ΣΥΝΕΡΓΑΤΗΣ ΣΤΟ ΙΝΣΤΙΤΟΥΤΟ ΔΙΕΘΝΩΝ ΣΧΕΣΕΩΝ (ΙΔΙΣ),
                ΠΑΝΤΕΙΟ ΠΑΝΕΠΙΣΤΗΜΙΟ</h4>
                <p>Αθήνα, 9/2021 – 6/2023</p>
                <p>Αρμοδιότητα για θέματα εσωτερικής ασφάλειας της ΕΕ και υπεύθυνος της
                ομάδας εργασίας για τη «διακυβέρνηση του χώρου Σένγκεν».</p>

                <h4>ΔΙΔΑΣΚΑΛΙΑ ΕΝΩΣΙΑΚΟΥ ΔΙΚΑΙΟΥ ΣΤΗΝ ΕΘΝΙΚΗ ΣΧΟΛΗ ΔΙΚΑΣΤΙΚΩΝ
                ΛΕΙΤΟΥΡΓΩΝ, ΚΑΤΕΥΘΥΝΣΗ ΕΙΣΑΓΓΕΛΕΩΝ</h4>
                <p>Θεσσαλονίκη, ΕΣΔι, 3/2022</p>


              </div>

              <div className="biography-modal-section">
                <h3>ΜΕΛΕΤΕΣ / ΕΡΕΥΝΑ</h3>
                <ul>
                  <li>European Migration Network (EMN), Τρίτη Εστιασμένη Μελέτη 2013, Αναγνώριση Θυμάτων Εμπορίας Ανθρώπων σε Διαδικασίες Διεθνούς Προστασίας (Άσυλο) και Αναγκαστικής Επιστροφής</li>
                  <li>European Migration Network (EMN), Ελλάδα, Ετήσια Έκθεση Πολιτικής, 2012</li>
                  <li>European Migration Network (EMN), Δεύτερη Εστιασμένη Μελέτη 2013, Η οργάνωση των δομών υποδοχής των αιτούντων άσυλο στα διάφορα κράτη μέλη</li>
                  <li>«Μετα-ανάλυση των ερευνών που έχουν διαξαχθεί για τη μετανάστευση σε σημαντικά και σχετικά με την ένταξη πεδία, (Υγεία, Κοινωνική Ασφάλιση, Εργασία, Εκπαίδευση κ.λπ.), ΕΚΚΕ, 2013</li>
                  <li>Μέλος ομάδας εργασίας εντός Υπουργείου Δικαιοσύνης για τη σύνταξη μελέτης για την προετοιμασία της χώρας σε περίπτωση μαζικής ροής υποθέσεων προσφυγικού δικαίου, 2016</li>
                  <li>Σύνταξη εγχειριδίου στο πλαίσιο του προγράμματος «Ενίσχυση των Φορέων Επιβολής του Νόμου για την αναγνώριση και την καταπολέμηση της ριζοσπαστικοποίησης και του εξτρεμισμού», ΚΕΜΕΑ, 2018-2019</li>
                  <li>M. Erdoğan – M. Papakonstantis, Turkey as a partner and and challenge for
European security migration and asylum, in Joint project between the
International Relations Council of Turkey (IRCT) as the Coordinating Entity,
Center for International and European Studies (CIES) at Kadir Has University,
Institute of International Relations (IIR) at Panteion University, Turkey as a
partner and challenge for European security, διαθέσιμο στο
https://www.uikpanorama.com/blog/2022/01/24/turkey-as-a-partner-and-
challenge-for-european-security-migration-and-asylum/</li>
<li>H. Ηalçınkaya – M. Papakonstantis, Turkey as a Partner and Challenge for
European Security Counterterrorism, in Joint project between the International
Relations Council of Turkey (IRCT) as the Coordinating Entity, Center for
International and European Studies (CIES) at Kadir Has University, Institute of
International Relations (IIR) at Panteion University, Turkey as a partner and
challenge for European security, διαθέσιμο στο Counterterrorism as an Area of
Cooperation and Challenge to Turkey - The European Union Relations -
Panorama (uikpanorama.com)</li>

                </ul>
              </div>

              <div className="biography-modal-section">
                <h3>ΕΙΣΗΓΗΣΕΙΣ ΣΕ ΣΥΝΕΔΡΙΑ</h3>
                <ul>
                  <li>Ημερίδα Δημοκρίτειου Πανεπιστημίου Θράκης με θέμα: «Η εξωτερική πολιτική της ΕΕ», Κομοτηνή, 28/3/2002</li>
                  
                  <li>Ημερίδα Ένωσης Νέων Επιστημόνων Ευρωπαϊκών Σπουδών με θέμα: «Δυναμική της ευρωπαϊκής ολοκλήρωσης και συνταγματοποίηση». Τίτλος εισήγησης: «Η συμβολή της Κοινής Εξωτερικής Πολιτικής και Πολιτικής Ασφάλειας (ΚΕΠΠΑ) στην ευρωπαϊκή ολοκλήρωση και η Συνταγματική Συνθήκη», Αθήνα, 05/11/2003</li>
                  
                  <li>Ημερίδα πρεσβείας της Κύπρου με θέμα: «Η πρόκληση της Ευρώπης των Εικοσιπέντε. Η Κύπρος στην Ευρωπαϊκή Ένωση». Τίτλος εισήγησης: «Η διεύρυνση και οι σχέσεις της Ένωσης με τα νέα γειτονικά της κράτη», Αθήνα, 16/4/2004</li>
                  
                  <li>Ημερίδα Γραφείου του Ευρωπαϊκού Κοινοβουλίου στην Αθήνα με θέμα: «Η δυναμική του Ευρωπαϊκού Συντάγματος». Τίτλος εισήγησης: «Το θεσμικό πλαίσιο της ΚΕΠΠΑ στο Ευρωπαϊκό Σύνταγμα», Αθήνα, 28/2/2005</li>
                  
                  <li>Ημερίδα Κέντρου Διεθνούς και Ευρωπαϊκού Οικονομικού Δικαίου με θέμα: «Το Ευρωπαϊκό Σύνταγμα. Προκλήσεις και προοπτικές». Τίτλος εισήγησης: «Η ΚΕΠΠΑ στη Συνθήκη για το Ευρωπαϊκό Σύνταγμα», Θεσσαλονίκη, 11/4/2005</li>
                  
                  <li>Εκδήλωση Α.Ο. Αχαΐας «Γαλήνη» με θέμα: «Ευρωπαϊκό Σύνταγμα. Ένα Σύνταγμα για τον πολίτη;». Τίτλος εισήγησης: «Το Ευρωπαϊκό Σύνταγμα: ένας σταθμός ή το τέλος της ευρωπαϊκής ολοκλήρωσης;», Πάτρα, 12/5/2005</li>
                  
                  <li>Διεθνή διημερίδα του Daedalos Institute of Geopolitics, με θέμα "Peoples in Migration in the 21st century". Τίτλος εισήγησης: «The political and juridical perspectives on the integration of immigrants in Greece", Λευκωσία, 14-16/12/2006</li>
                  
                  <li>Ημερίδα της Αναπτυξιακής Σύμπραξης «Ξένιος Δίας» με θέμα: «Μέθοδοι προσέγγισης μεταναστών με στόχο την καταπολέμηση των διακρίσεων». Τίτλος εισήγησης: «Η κοινωνική ένταξη των μεταναστών σύμφωνα με τον Ν. 3386/2005», Αθήνα, 31/1/2007</li>
                  
                  <li>Διεθνές συνέδριο του Strategy International (SI) με θέμα: «NATO, UN, EU in the New Security Environment». Τίτλος εισήγησης: «Migration as a Security Issue in the European Union», Θεσσαλονίκη, 10/2/2011</li>
                  
                  <li>Εκδήλωση από το Σπίτι της Ευρώπης στη Ρόδο με θέμα: «Η μετανάστευση και το μέλλον της Ευρώπης». Τίτλος εισήγησης: «Η ευρωπαϊκή μεταναστευτική πολιτική. Η εφαρμογή της στην Ελλάδα», Ρόδος, 8/10/2014</li>
                  
                  <li>Ημερίδα της Ιεράς Μονής Πεντέλης με θέμα: «Ο διαθρησκευτικός διάλογος στην Ελλάδα και την Ευρώπη». Τίτλος εισήγησης: «Ο ρόλος της θρησκείας στη διαδικασία της ευρωπαϊκής ολοκλήρωσης», Αθήνα, 24.6/2015</li>
                  
                  <li>Ημερίδα του Ελληνικού Συμβουλίου για τους Πρόσφυγες με θέμα: «Μετά την αναγνώριση τι; Ζητήματα κοινωνικής ένταξης δικαιούχων διεθνούς προστασίας». Τίτλος εισήγησης: «Η τελευταίες εξελίξεις σε θέματα διεθνούς προστασίας σε Ελλάδα και Ευρώπη», Αθήνα, 10/5/2016</li>
                  
                  <li>Συνέδριο της Ένωσης Διοικητικών Δικαστών με θέμα: «Το νέο τοπίο της διοικητικής δικαιοσύνης στην εποχή της κρίσης - προοπτικές». Τίτλος εισήγησης: «Το παρόν και το μέλλον του Κοινού Ευρωπαϊκού Συστήματος Ασύλου», Θεσσαλονίκη, 02/06/2018</li>
                  
                  <li>5ο Πανελλήνιο Συνέδριο Ένωσης Δικαίου Αλλοδαπών και Μετανάστευσης με θέμα: «Πρόσφατες εξελίξεις στη θεωρία και νομολογία στο δίκαιο καταστάσεως αλλοδαπών». Τίτλος εισήγησης: «Πρόσφατη νομολογία ΔΕΕ στο μεταναστευτικό δίκαιο», Αθήνα, 30/3/2019</li>
                  
                  <li>Εκδήλωση του Ευρωπαϊκού Κέντρου Αριστείας Jean Monnet του ΕΚΠΑ με θέμα: «Το Ευρωπαϊκό Σύμφωνο για τη Μετανάστευση και το Άσυλο: Προκλήσεις και Προοπτικές». Τίτλος εισήγησης: «Η εξέλιξη του μεταναστευτικού δικαίου της ΕΕ εντός του Χώρου Ελευθερίας, Ασφάλειας και Δικαιοσύνης», Αθήνα, 06/04/2023</li>
                  
                  <li>Ημερίδα του Ελληνικού Συμβουλίου για τους Πρόσφυγες (Ε.Σ.Π.) με θέμα:
«Μετά την αναγνώριση τι; Ζητήματα κοινωνικής ένταξης δικαιούχων διεθνούς
προστασίας», Τίτλος εισήγησης: «Η τελευταίες εξελίξεις σε θέματα διεθνούς
προστασίας σε Ελλάδα και Ευρώπη», Αθήνα, 10/5/2016</li>

                <li>Εκδήλωση του Ιδρύματος Θεμιστοκλή και Δημήτρη Τσάτσου – Κέντρο
Ευρωπαϊκού Συνταγματικού Δικαίου (Κ.Ε.Σ.Δ.) σε συνεργασία με την Ελληνική
Ένωση για τα Δικαιώματα του Ανθρώπου (Ε.Ε.Δ.Α.) με θέμα: «Θεμελιώδη
Δικαιώματα στην Ελλάδα και στην Ευρωπαϊκή Ένωση: Μετατρέποντας τις
προκλήσεις σε ευκαιρίες». Τίτλος εισήγησης: «Προσφυγική κρίση και άνοδος
της ξενοφοβίας», Αθήνα, 02/12/2016.</li>

<li>Συνέδριο (09-11/12/2016) της Ένωσης Δικαίου Αλλοδαπών και
Μετανάστευσης (ΕΔΑΜ) σε συνεργασία με τον Δικηγορικό Σύλλογο Αθηνών
και τον Δικηγορικό Σύλλογο Πατρών με θέμα: «Διαχείριση μεταναστευτικών &amp;
προσφυγικών ροών σε Ελλάδα &amp; Ευρώπη». Τίτλος της εισήγησης: «Η πολιτική
του προσφυγικού ζητήματος», Πάτρα, 09/12/2016.</li>
<li>Συνέδριο (01-02/06/2018) της Ένωσης Διοικητικών Δικαστών με θέμα: «Το
νέο τοπίο της διοικητικής δικαιοσύνης στην εποχή της κρίσης - προοπτικές».
Τίτλος εισήγησης: «Το παρόν και το μέλλον του Κοινού Ευρωπαϊκού
Συστήματος Ασύλου», Θεσσαλονίκη, 02/06/2018.</li>
<li>Συνέδριο (8-12/10/2018) του Κ.Ε.Μ.Ε.Α. και του European Security and
Defence College με θέμα: «Pilot Course – Migration flow, Border Management
and CSDP». Τίτλος εισήγησης: «La procédure de reception des ressortissants
des pays tiers. Le cas de la Grèce», Αθήνα, 09/10/2018.</li>
<li>5 ο Πανελλήνιο Συνέδριο (30/3/2019) Ένωσης Δικαίου Αλλοδαπών και
Μετανάστευσης (Ε.Δ.Α.Μ.) με θέμα: «Πρόσφατες εξελίξεις στη θεωρία και
νομολογία στο δίκαιο καταστάσεως αλλοδαπών». Τίτλος εισήγησης:
«Πρόσφατη νομολογία ΔΕΕ στο μεταναστευτικό δίκαιο», Αθήνα, 30/3/2019.</li>
<li>Επιμορφωτικό σεμινάριο (14-15/11/2019) της Εθνικής Σχολής Δικαστικών

15
Λειτουργών (ΕΣΔι) με θέμα: «Διοικητική εκτέλεση – Ζητήματα δικαίου
αλλοδαπών». Τίτλος εισήγησης: Η ανάδειξη της διάστασης ασφάλειας στο
ενωσιακό προσφυγικό δίκαιο ως καταλύτης για την εξέλιξή του»,
Θεσσαλονίκη, 15/11/2019.</li>
<li>5 ο Πανελλήνιο Συνέδριο (19-20/3/2021) Ένωσης Δικαίου Αλλοδαπών και
Μετανάστευσης (Ε.Δ.Α.Μ.) με θέμα: «Δίκαιο καταστάσεως Αλλοδαπών και
Ιθαγένειας: Θεωρία και Πράξη». Τίτλος εισήγησης: «Νέο ευρωπαϊκό σύμφωνο
για τη μετανάστευση και το άσυλο», Αθήνα, 20/3/2021.</li>
<li>Εκδήλωση του Ευρωπαϊκού Κέντρο Αριστείας Jean Monnet του Εθνικού και
Καποδιστριακού Πανεπιστημίου Αθηνών Ευρωπαϊκό Κέντρο Αριστείας Jean
Monnet του Εθνικού και Καποδιστριακού Πανεπιστημίου Αθηνών (Ε.Κ.Π.Α.) με
θέμα: «Το Ευρωπαϊκό Σύμφωνο για τη Μετανάστευση και το Άσυλο:
Προκλήσεις και Προοπτικές». Τίτλος εισήγησης: «Η εξέλιξη του
μεταναστευτικού δικαίου της ΕΕ εντός του Χώρου Ελευθερίας, Ασφάλειας και
Δικαιοσύνης», Αθήνα, 06/04/2023.</li>
<li>6 ο Πανελλήνιο Συνέδριο (17-18/3/2023) Ένωσης Δικαίου Αλλοδαπών και
Μετανάστευσης (Ε.Δ.Α.Μ.) με θέμα: «Μετανάστευση – Άσυλο – Ιθαγένεια, Στο
σταυροδρόμι μιας νέας εποχής». Τίτλος εισήγησης: «Επίκαιρη Νομολογία ΔΕΕ
για ζητήματα Διεθνούς Προστασίας», Αθήνα, 18/3/2023.</li>

                </ul>
              </div>

              <div className="biography-modal-section">
                <h3>ΔΗΜΟΣΙΕΥΣΕΙΣ</h3>
                
                <h4>Α. ΜΟΝΟΓΡΑΦΙΕΣ</h4>
                <ul>
                  <li>La Grèce et la politique étrangère de l'Union européenne, Lille, ANRT, 2002</li>
                  <li>Οι πολιτικές της ΕΕ: Εξωτερική, Γεωργική, Μεταναστευτική, Αθήνα, Σάκκουλας, 2016</li>
                  <li>Η τρομοκρατία στον χώρο ελευθερίας, ασφάλειας και δικαιοσύνης της ΕΕ, Αθήνα, Νομική Βιβλιοθήκη, 2019</li>
                </ul>

                <h4>Β. ΣΥΜΜΕΤΟΧΗ ΣΕ ΣΥΛΛΟΓΙΚΑ ΕΡΓΑ</h4>
                <ul>
                  <li>«Η εξωτερική πολιτική της ΕΕ», στο συλλογικό έργο «Ευρωπαϊκή Ένωση: Δημιουργία, εξέλιξη, προοπτικές», Αθήνα, Νομική Βιβλιοθήκη, 2015</li>
                  <li>«Το προσφυγικό δίκαιο στην ΕΕ», στο συλλογικό έργο «Δίκαιο των αλλοδαπών», Αθήνα, Νομική Βιβλιοθήκη, 2017</li>
                <li>“The Social Integration of Immigrants in Greece”, in Michel Korinman, John
Laughland (edts.), The Long March to the West, Valentine Mitchell Academic,
2007, pp. 144-151.</li>
<li>«Το κεκτημένο Σένγκεν σε δοκιμασία ή σε διαδικασία εξέλιξης;», στο
Ευρωπαϊκή Επιτροπή, Η «Ομάδα Ευρώπη» γράφει για τις πολιτικές της
Ευρωπαϊκής Ένωσης, Αθήνα, Αντιπροσωπεία της Ευρωπαϊκής Επιτροπής στην
Ελλάδα, 2012, σσ. 59-77.</li>
<li>«ΔΕΕ και ερμηνεία των ρητρών αποκλεισμού για το άσυλο», στο Χ.
Δεληγιάννη-Δημητράκου κ.ά (επιμ.), Προστασία θεμελιωδών δικαιωμάτων –
Κρίσιμα ζητήματα στον ευρωπαϊκό χώρο, ΚΔΕΟΔ, Αθήνα, Παπαζησης, 2018, σσ.
149-165.</li>
<li>«Η διακυβέρνηση του χώρου Σένγκεν», στο Κ. Στεφάνου (επιμ.), Το σύστημα
διακυβέρνησης της ΕΕ, Αθήνα, Νομική Βιβλιοθήκη, 2020, σσ. 411-445.</li>
<li>Σχολιασμός των ΑΚ 287-296, ΑΚ 301-302, ΑΚ 305-319, ΑΚ 901-903 άρθρων
ΑΚ σε σχολιασμένο ΑΚ (Ι. Λεοντής επιμ.), Αθήνα, εκδ. Νομική Βιβλιοθήκη, σσ.
810-841, 864-868, 879-898, 2308-2319.</li>
<li>«H προσφυγική κρίση ως νέο πεδίο διάρρηξης της ενωσιακής συνοχής», στο
Α. Πασσάς – Κ. Αρβανιτόπουλος - Μ. Κοππά (επιμ.), 40 χρόνια της Ελλάδας
στην ΕΕ, Αθήνα, εκδ. πεδίο, 2021, σσ. 592-604.</li>
<li>Η αλληλεγγύη ως ουσιώδες στοιχείο του Κοινού Ευρωπαϊκού Συστήματος
Ασύλου κατά το ΔΕΕ, στο Ύπατη Αρμοστεία του ΟΗΕ για τους Πρόσφυγες,
Επετηρίδα δικαίου Προσφύγων και Αλλοδαπών 2018-2020, 2022, Αθήνα, εκδ.
Σάκκουλας, 2022, σσ. 537-550.</li>
<li>Ο χαρακτηρισμός ενός εθνικού οργάνου ως δικαιοδοτικού σύμφωνα με τη
νομολογία του ΔΕΕ. Η περίπτωση της Αρχής Προσφυγών για το Άσυλο του Ν.
4375/2016, στο Ύπατη Αρμοστεία του ΟΗΕ για τους Πρόσφυγες, Επετηρίδα

9
δικαίου Προσφύγων και Αλλοδαπών 2018-2020, 2022, Αθήνα, εκδ. Σάκκουλας,
2022, σσ. 523-536.</li>
<li>H λειτουργία της Αρχής Προσφυγών για το Άσυλο με επιτροπές από
Διοικητικούς Δικαστές, στο 60 χρόνια λειτουργίας των Τακτικών Διοικητικών
Δικαστηρίων, εκδ. Εθνικό Τυπογραφείο, 2022, σσ. 312-323.</li>
                </ul>

                <h4>Γ. ΕΠΙΣΤΗΜΟΝΙΚΕΣ ΕΡΓΑΣΙΕΣ</h4>
                <ul>
    <li>«Η συμβολή της Ελλάδας στην εξεύρεση λύσης του Κυπριακού μέσω της Ευρωπαϊκής Ένωσης», <i>Ευρωπαϊκή Έκφραση</i>, τ. 46, 3° τρίμηνο 2002, σσ. 23-26.</li>
    <li>«Ο ρόλος της Προεδρίας του Συμβουλίου στη λειτουργία της Ευρωπαϊκής Ένωσης», <i>Βουλή & Ευρωβουλή</i>, τ. 08, Φεβρουάριος 2003, σσ. 46-49.</li>
    <li>«Η Πολιτική Ένωση και ο ευρωπαίος πολίτης», <i>Ευρωπαϊκή Έκφραση</i>, τ. 49, 2° τρίμηνο 2003, σσ. 13-14.</li>
    <li>«Η ελληνική προεδρία, η Κ.Ε.Π.Π.Α. και η κρίση στο Ιράκ», <i>Εξωτερικά Θέματα</i>, τ. 10, Ιούλιος 2003, σελ. 26-44.</li>
    <li>«Το σχέδιο συνθήκης για τη θέσπιση Συντάγματος της Ευρώπης και η Κοινή Εξωτερική Πολιτική και Πολιτική Ασφάλειας της Ευρωπαϊκής Ένωσης», <i>ΕΕΕυρΔ</i>, τ. 23, τχ. 4, Οκτώβριος – Δεκέμβριος 2003, σσ. 829-862.</li>
    <li>«Η ευρωπαϊκή πορεία της Τουρκίας και η εξέλιξη των ελληνοτουρκικών σχέσεων», <a href="http://www.eliamep.gr">www.eliamep.gr</a>, publications, postgraduate notes.</li>
    <li>«Η διεύρυνση και οι σχέσεις της Ένωσης με τα νέα γειτονικά της κράτη», <i>Εξωτερικά Θέματα</i>, τ. 14, Ιούλιος 2004, σελ. 120-136.</li>
    <li>«Το πλαίσιο των σχέσεων Ευρωπαϊκής Ένωσης – Ηνωμένων Πολιτειών», <i>Αγορά χωρίς Σύνορα</i>, τ. 10, τχ. 2, Σεπτέμβριος- Νοέμβριος 2004, Ινστιτούτο Διεθνών και Οικονομικών Σχέσεων, εκδ. Παπαζήσης, σσ. 124-146.</li>
    <li>«Η ευρωπαϊκή κοινή γνώμη απέναντι στην προοπτική ένταξης της Τουρκίας», <i>ΕΕΕυρΔ</i>, τ. 25, τχ. 2, Απρίλιος – Ιούνιος 2005, σσ. 315-330.</li>
    <li>“L’intégration sociale des immigrés en Grèce en vertu de la loi 3386/2005”, <i>Outre-Terre</i> 2006/4, no 17, pp. 211-215.</li>
    <li>«Η απόφαση του Ευρωπαϊκού Συμβουλίου των Βρυξελλών για τη Μεταρρυθμιστική Συνθήκη», <i>ΕΕΕυρΔ</i> 3/2007, σσ. 585-596.</li>
    <li>«Ιρλανδικό δημοψήφισμα : η ΕΕ ξανά σε κρίση. Ένας απολογισμός», <i>Ευρωπαϊκή Έκφραση</i>, τ. 69, 2° τρίμηνο 2008, σσ. 12-14.</li>
    <li>«Το σύστημα πληροφοριών για τις θεωρήσεις (VIS) στα κράτη Σένγκεν», <i>ΕΕΕυρΔ</i> 4/2011, σσ. 395-406.</li>
    <li>«Ευφυή σύνορα για τον χώρο Σένγκεν», <i>ΕΕΕυρΔ</i> 2-3/2012, σσ. 147-155.</li>
    <li>«Τα Συμβούλια ένταξης μεταναστών στο πλαίσιο της πολιτικής ένταξης υπηκόων τρίτων χωρών», <i>Κοινωνική Συνοχή και Ανάπτυξη</i>, Φθινόπωρο 2013, τ. 8, τχ. 2, σσ. 107-126.</li>
    <li>«Το παρόν και το μέλλον του Κοινού Ευρωπαϊκού Συστήματος Ασύλου (ΚΕΣΑ)», <i>ΕΕΕυρΔ</i> 2/2018, σσ. 177-190.</li>
    <li>«Ευρωπαϊκή Αρχή Εργασίας», <i>ΕΕΕυρΔ</i> 2/2019, σσ. 147-154.</li>
    <li>«Το νέο πλαίσιο εφαρμογής της ευρωπαϊκής πρωτοβουλίας πολιτών σύμφωνα με τον κανονισμό (ΕΕ) 2019/788», <i>Ευρωπαϊκό Δίκαιο</i>, Ιανουάριος-Μάρτιος 2020, τχ. 1, σσ. 38-50.</li>
    <li>«Η πολιτική ασύλου της ΕΕ», <i>Διοικητική Δίκη</i>, 2/2020, τχ. 2, σσ. 188-208.</li>
    <li>«Το δικαίωμα σε ετήσια άδεια μετ’ αποδοχών κατά τη νομολογία του ΔΕΕ», <i>Ευρωπαϊκό Δίκαιο</i>, Οκτώβριος-Δεκέμβριος 2020, τχ. 8, σσ. 302-317.</li>
</ul>
              </div>

              <div className="biography-modal-section">
                <h4>Δ. ΣΧΟΛΙΑΣΜΟΣ ΑΠΟΦΑΣΕΩΝ ΔΕΕ</h4>
                <ul>
    <li>Η καταγραφή του πραγματικού χρόνου εργασίας στην υπηρεσία της προστασίας της υγείας και της ασφάλειας των εργαζομένων (C-55/2018), <i>Συνήγορος</i> 131/2019, σσ. 48-52.</li>
    <li>Η κατοικία στον τόπο δημιουργίας χρεών ως προϋπόθεση διαγραφής τους και ο περιορισμός στην ελεύθερη κυκλοφορία εργαζομένου εντός της ΕΕ (C-716/17), <i>Συνήγορος</i> 134/2019, σσ. 48-52.</li>
    <li>C-123/18, HTTS/Συμβούλιο, 10.9.2019, Εξωσυμβατική ευθύνη της ΕΕ. Κατάφωρη παραβίαση κανόνα δικαίου, <i>ΕΕΕυρΔ</i> 3/2019, σσ. 422-427.</li>
    <li>C-233/18, Haqbin, 12.11.2019, Προϋποθέσεις περιορισμού ή ανάκλησης των συνθηκών υποδοχής, <i>ΕΕΕυρΔ</i> 4/2019, σσ. 545-548.</li>
    <li>C-619/18, Επιτροπή/Πολωνία, 24.6.2019, Κράτος Δικαίου. Αρχή της ισοβιότητας και της ανεξαρτησίας των δικαστών, <i>ΕΕΕυρΔ</i> 3/2019, σσ. 410-417.</li>
    <li>C-233/18, Haqbin, 12.11.2019, Αιτούντες Διεθνούς Προστασίας, <i>ΕΕΕυρΔ</i> 4/2019, σσ. 546-548.</li>
    <li>ΔΕΕ C-588/18, FETICO κ.λπ., 04.06.2020, Ειδικές άδειες μετ’ αποδοχών που παρέχουν τη δυνατότητα απουσίας από την εργασία προς κάλυψη συγκεκριμένων αναγκών και υποχρεώσεων των εργαζομένων, <i>ΕΕΕυρΔ</i> 3/2020, σσ. 366-370.</li>
    <li>ΔΕΕ C-511/18, C-512/18, C-520/18, C-623/17 (συνεκδίκαση), La Quadrature du Net κ.λπ., 6.10.2020, Επεξεργασία δεδομένων προσωπικού χαρακτήρα και προστασία της ιδιωτικής ζωής στον τομέα των ηλεκτρονικών επικοινωνιών, <i>ΕΕΕυρΔ</i> 4/2020, σσ. 537-543.</li>
    <li>Ο περιορισμός απόκτησης της ιθαγένειας κράτους μέλους από το ενωσιακό δίκαιο: υπόθεση C-118/20, <i>Ευρωπαϊκό Δίκαιο</i>, Ιανουάριος – Μάρτιος 2022, τχ. 11, σσ. 52-68.</li>
    <li>ΔΕΕ C-490/20, VMA, 14.12.2021, Ιθαγένεια της Ένωσης, Τέκνο έγγαμου ομόφυλου ζεύγους γεννημένο σε κράτος μέλος, <i>ΕΕΕυρΔ</i> 4/2022, σσ. 87-91.</li>
    <li>ΔΕΕ C-261/21, GN, 21.12.2023, Ευρωπαϊκό Ένταλμα Σύλληψης, <i>ΝοΒ</i> 72 (2024)/3, σσ. 794-805.</li>
</ul>


                <h4>Ε. ΕΠΙΣΚΟΠΗΣΗ ΝΟΜΟΛΟΓΙΑΣ ΔΕΕ</h4>
                <h2>Ε1. Ελληνική Επιθεώρηση Ευρωπαϊκού Δικαίου</h2>
<ul>
    <li>ΕΕΕυρΔ 1/2012, σσ. 67-72</li>
    <li>ΕΕΕυρΔ 2-3/2012, σσ. 230-239</li>
    <li>ΕΕΕυρΔ 4/2012, σσ. 389-396</li>
    <li>ΕΕΕυρΔ 1/2013, σσ. 53-65</li>
    <li>ΕΕΕυρΔ 2/2013, σσ. 177-186</li>
    <li>ΕΕΕυρΔ 3/2013, σσ. 334-343</li>
    <li>ΕΕΕυρΔ 4/2013, σσ. 468-477</li>
    <li>ΕΕΕυρΔ 1/2014, αφιέρωμα</li>
    <li>ΕΕΕυρΔ 2/2014, σσ.182-191</li>
    <li>ΕΕΕυρΔ 3/2014, σσ. 342-349</li>
    <li>ΕΕΕυρΔ 4/2014, σσ. 498-509</li>
    <li>ΕΕΕυρΔ 1/2015, σσ. 48-52</li>
    <li>ΕΕΕυρΔ 2/2015, σσ. 185-190</li>
    <li>ΕΕΕυρΔ 3/2015, σσ. 304-307</li>
    <li>ΕΕΕυρΔ 4/2015, σσ. 452-458</li>
    <li>ΕΕΕυρΔ 1/2016, σσ. 61-67</li>
    <li>ΕΕΕυρΔ 2/2016, σσ. 205-213</li>
    <li>ΕΕΕυρΔ 3/2016, σσ. 331-337</li>
    <li>ΕΕΕυρΔ 4/2016, σσ. 444-450</li>
    <li>ΕΕΕυρΔ 1-2/2017, σσ. 80-84</li>
    <li>ΕΕΕυρΔ 3/2017, σσ. 271-278</li>
    <li>ΕΕΕυρΔ 4/2017, σσ. 433-439</li>
    <li>ΕΕΕυρΔ 1/2018, σσ. 57-62</li>
    <li>ΕΕΕυρΔ 2/2018, σσ. 224-226</li>
    <li>ΕΕΕυρΔ 3/2018, σσ. 361-367</li>
    <li>ΕΕΕυρΔ 4/2018, σσ. 509-513</li>
    <li>ΕΕΕυρΔ 1/2019, σσ. 53-55</li>
    <li>ΕΕΕυρΔ 2/2019, σσ. 207-212</li>
    <li>ΕΕΕυρΔ 3/2019, σσ. 381-384</li>
    <li>ΕΕΕυρΔ 2/2020, σσ. 212-214</li>
    <li>ΕΕΕυρΔ 3/2020, σσ. 336-346</li>
    <li>ΕΕΕυρΔ 4/2020, σσ. 503-505</li>
</ul>

<h2>Ε2. Επιθεώρηση Μεταναστευτικού Δικαίου</h2>
<ul>
    <li>ΕΜΕΔ 3/2012, σσ. 273-279</li>
    <li>ΕΜΕΔ 1/2013, σσ. 51-68</li>
    <li>ΕΜΕΔ 3/2013, σσ. 253-262</li>
</ul>

<h2>Ε3. Νομικό Βήμα</h2>
<ul>
    <li>ΝοΒ 72, (2023)/3, σσ. 886-889</li>
    <li>ΝοΒ 72 (2024)/5, σσ. 1483-1493</li>
    <li>ΝοΒ 73 (2025)/1, σσ. (υπό δημοσίευση)</li>
</ul>
<h4>ΣΤ. ΑΡΘΡΑ</h4>
<ul>
    <li>«Το μετέωρο βήμα της Ευρωπαϊκής Ένωσης», Καθημερινή, 19/5/2006, σ. 13.</li>
    <li>«Το μετέωρο βήμα της Συνταγματικής Συνθήκης της Ευρωπαϊκής Ένωσης», Ο Κόσμος του Επενδυτή, 1-2/7/2006, σ. 40.</li>
    <li>«Η Γαλλία, το αρμενικό ζήτημα και η Τουρκία», Ο Κόσμος του Επενδυτή, 4-5/11/2006, σ. 38.</li>
    <li>«Η ελληνική πολιτική και οι παράτυποι μετανάστες», Ο Κόσμος του Επενδυτή, 29-21/12/2006, σ. 46.</li>
    <li>«Υψώνοντας τείχη στους μετανάστες δεύτερης γενιάς», Ο Κόσμος του Επενδυτή, 26-27/5/2007, σ. 48.</li>
    <li>«Ο Σαρκοζί στο τιμόνι της Ευρώπης», Ο Κόσμος του Επενδυτή, 24-27/4/2008, σ. 26.</li>
    <li>«Ευρώπη-φρούριο ή λύση ανάγκης;», Ο Κόσμος του Επενδυτή, 5-6/7/2008, σ. 48.</li>
    <li>«Η Γαλλία στο επίκεντρο των ευρωπαϊκών εξελίξεων», Ευρωπαϊκή Έκφραση, 3ο τρίμηνο 2008, σσ. 10-11.</li>
</ul>

              </div>

              <div className="biography-modal-section">
                <h3>ΠΙΣΤΟΠΟΙΗΣΕΙΣ</h3>
                <ul>
                  <li>Πιστοποιημένος εκπαιδευτής εκπαιδευτών, Ινστιτούτο Επιμόρφωσης του ΕΚΔΔΑ, 03/2012 - 4/2012</li>
                  <li>Πιστοποιημένος σε θέματα Ασύλου και στην ΕΣΔΑ, European Programme for Human Rights Education for Legal Professionals (HELP), 2017</li>
                  <li>Πιστοποιημένoς σε θέματα Ασύλου, European Asylum Support Office (EASO), 2014</li>
                  <li>Πιστοποιημένος σε θέματα εξέτασης αιτημάτων ασύλου, European Asylum Support Office (EASO), 2013</li>
                </ul>
              </div>

              <div className="biography-modal-section">
                <h3>ΣΥΜΜΕΤΟΧΗ ΣΕ ΕΠΙΣΤΗΜΟΝΙΚΕΣ ΕΤΑΙΡΕΙΕΣ</h3>
                <ul>
                  <li>Μέλος της Ελληνικής Εταιρείας Διεθνούς Δικαίου και Διεθνών Σχέσεων</li>
                  <li>Μέλος της Ένωσης Ευρωπαίων Διοικητικών Δικαστών</li>
                  <li>Μέλος της Ένωσης Δικαίου Αλλοδαπών και Μετανάστευσης</li>
                  <li>Μέλος της Ελληνικής Ένωσης για τα Δικαιώματα του Ανθρώπου</li>
                  <li>Μέλος της Ελληνικής Ένωσης Ευρωπαϊκού Δικαίου</li>
                </ul>
              </div>

              <div className="biography-modal-section">
                <h3>ΕΙΣΗΓΗΣΕΙΣ</h3>
                <ul>
    <li>Ημερίδα του Τομέα Διεθνών Σπουδών της Νομικής Σχολής του Δημοκρίτειου Πανεπιστημίου Θράκης: «Η επίδραση της διεύρυνσης στο δίκαιο και στις πολιτικές της Ευρωπαϊκής Ένωσης». Τίτλος εισήγησης: «Η επίδραση της διεύρυνσης στην κοινή εξωτερική πολιτική της ΕΕ», Κομοτηνή, 28/3/2002.</li>
    <li>Ημερίδα Ένωσης Νέων Επιστημόνων Ευρωπαϊκών Σπουδών (Ε.Ν.Ε.Ε.Σ.): «Δυναμική της ευρωπαϊκής ολοκλήρωσης και συνταγματοποίηση». Τίτλος εισήγησης: «Η συμβολή της ΚΕΠΠΑ στην ευρωπαϊκή ολοκλήρωση και η Συνταγματική Συνθήκη», Αθήνα, 05/11/2003.</li>
    <li>Ημερίδα πρεσβείας της Κύπρου: «Η πρόκληση της Ευρώπης των Εικοσιπέντε. Η Κύπρος στην Ευρωπαϊκή Ένωση». Τίτλος εισήγησης: «Η διεύρυνση και οι σχέσεις της Ένωσης με τα νέα γειτονικά της κράτη», Αθήνα, 16/4/2004.</li>
    <li>Ημερίδα Γραφείου του Ευρωπαϊκού Κοινοβουλίου στην Αθήνα, Ε.Ν.Ε.Ε.Σ., Ε.Π.Ε.Ε.Σ., Αντιπροσωπείας της Ευρωπαϊκής Επιτροπής: «Η δυναμική του Ευρωπαϊκού Συντάγματος». Τίτλος εισήγησης: «Το θεσμικό πλαίσιο της ΚΕΠΠΑ στο Ευρωπαϊκό Σύνταγμα», Αθήνα, 28/2/2005.</li>
    <li>Ημερίδα Κ.Δ.Ε.Ο.Δ. και Ε.Ν.Ε.Ε.Σ.: «Το Ευρωπαϊκό Σύνταγμα. Προκλήσεις και προοπτικές». Τίτλος εισήγησης: «Η ΚΕΠΠΑ στη Συνθήκη για το Ευρωπαϊκό Σύνταγμα», Θεσσαλονίκη, 11/4/2005.</li>
    <li>Εκδήλωση Α.Ο. Αχαΐας «Γαλήνη» υπό την αιγίδα του Δήμου Πατρέων: «Ευρωπαϊκό Σύνταγμα. Ένα Σύνταγμα για τον πολίτη;». Τίτλος εισήγησης: «Το Ευρωπαϊκό Σύνταγμα: ένας σταθμός ή το τέλος της ευρωπαϊκής ολοκλήρωσης;», Πάτρα, 12/5/2005.</li>
    <li>Συζήτηση Υπουργείου Εξωτερικών: «Ευρωπαϊκό Σύνταγμα: η Ευρώπη προχωράει η Ελλάδα κερδίζει». Τίτλος εισήγησης: «Οι θεσμικές αλλαγές στο Ευρωπαϊκό Σύνταγμα», Λάρισα, 19/5/2005.</li>
    <li>Διεθνής διημερίδα Daedalos Institute of Geopolitics: “Peoples in Migration in the 21st century”. Τίτλος εισήγησης: «The political and juridical perspectives on the integration of immigrants in Greece», Λευκωσία, 14-16/12/2006.</li>
    <li>Ημερίδα Αναπτυξιακής Σύμπραξης «Ξένιος Δίας»: «Οι διαστάσεις της ξενοφοβίας και η προώθηση πολύ-πολιτισμικών προτύπων». Τίτλος εισήγησης: «Η κοινωνική ένταξη των μεταναστών σύμφωνα με τον Ν. 3386/2005», Αθήνα, 31/1/2007.</li>
    <li>Ημερίδα Κέντρου Ευρωπαϊκών Μελετών και Σπουδών «Ιωάννης Καποδίστριας»: «Ο ρόλος της Ρωσίας στις σύγχρονες ενεργειακές εξελίξεις». Τίτλος εισήγησης: «Το πλαίσιο των σχέσεων ΕΕ και Ρωσίας», Αθήνα, 26/4/2007.</li>
    <li>Διεθνές συνέδριο Strategy International: «NATO, UN, EU in the New Security Environment». Τίτλος εισήγησης: «Migration as a Security Issue in the European Union», Θεσσαλονίκη, 10/2/2011.</li>
    <li>Εκδήλωση Σπίτι της Ευρώπης στη Ρόδο: «Η μετανάστευση και το μέλλον της Ευρώπης». Τίτλος εισήγησης: «Η ευρωπαϊκή μεταναστευτική πολιτική. Η εφαρμογή της στην Ελλάδα», Ρόδος, 8/10/2014.</li>
    <li>Ημερίδα Ιεράς Μονής Πεντέλης: «Ο διαθρησκευτικός διάλογος στην Ελλάδα και την Ευρώπη». Τίτλος εισήγησης: «Ο ρόλος της θρησκείας στη διαδικασία της ευρωπαϊκής ολοκλήρωσης», Αθήνα, 24/6/2015.</li>
    <li>Ημερίδα Ε.Δ.Α.Μ., Ε.Ο.Π.Ε. και EPLO: «Μεταναστευτικές και προσφυγικές ροές στην Ελλάδα». Τίτλος εισήγησης: «Η πρόκληση της μετανάστευσης για τη συνολική λειτουργία της ΕΕ», Αθήνα, 22/4/2016.</li>
    <li>Ημερίδα Ε.Σ.Π.: «Μετά την αναγνώριση τι;». Τίτλος εισήγησης: «Οι τελευταίες εξελίξεις σε θέματα διεθνούς προστασίας σε Ελλάδα και Ευρώπη», Αθήνα, 10/5/2016.</li>
    <li>Εκδήλωση Κ.Ε.Σ.Δ.: «Θεμελιώδη Δικαιώματα στην Ελλάδα και στην ΕΕ». Τίτλος εισήγησης: «Προσφυγική κρίση και άνοδος της ξενοφοβίας», Αθήνα, 02/12/2016.</li>
    <li>Συνέδριο Ε.Δ.Α.Μ.: «Διαχείριση μεταναστευτικών & προσφυγικών ροών σε Ελλάδα & Ευρώπη». Τίτλος εισήγησης: «Η πολιτική του προσφυγικού ζητήματος», Πάτρα, 09/12/2016.</li>
    <li>Συνέδριο Ένωσης Διοικητικών Δικαστών: «Το νέο τοπίο της διοικητικής δικαιοσύνης». Τίτλος εισήγησης: «Το παρόν και το μέλλον του Κοινού Ευρωπαϊκού Συστήματος Ασύλου», Θεσσαλονίκη, 02/06/2018.</li>
    <li>Συνέδριο Κ.Ε.Μ.Ε.Α.: «Pilot Course – Migration flow, Border Management and CSDP». Τίτλος εισήγησης: «La procédure de reception des ressortissants des pays tiers. Le cas de la Grèce», Αθήνα, 09/10/2018.</li>
    <li>5ο Πανελλήνιο Συνέδριο Ε.Δ.Α.Μ.: «Πρόσφατες εξελίξεις στο μεταναστευτικό δίκαιο». Τίτλος εισήγησης: «Πρόσφατη νομολογία ΔΕΕ στο μεταναστευτικό δίκαιο», Αθήνα, 30/3/2019.</li>
    <li>Επιμορφωτικό σεμινάριο ΕΣΔι: «Διοικητική εκτέλεση – Ζητήματα δικαίου αλλοδαπών». Τίτλος εισήγησης: «Η διάσταση ασφάλειας στο ενωσιακό προσφυγικό δίκαιο», Θεσσαλονίκη, 15/11/2019.</li>
    <li>6ο Πανελλήνιο Συνέδριο Ε.Δ.Α.Μ.: «Μετανάστευση – Άσυλο – Ιθαγένεια». Τίτλος εισήγησης: «Επίκαιρη Νομολογία ΔΕΕ», Αθήνα, 18/3/2023.</li>
</ul>

              </div>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @media screen and (max-width: 768px) {
            .App-header {
              padding: 1rem;
            }

            .navbar {
              flex-direction: column;
              align-items: center;
            }

            .nav-links {
              flex-direction: column;
              align-items: center;
              gap: 1rem;
              margin-top: 1rem;
            }

            .nav-links a {
              display: block;
              padding: 0.5rem;
              width: 100%;
              text-align: center;
            }

            .hero-section {
              padding: 2rem 1rem;
            }

            .hero-buttons {
              flex-direction: column;
              gap: 1rem;
            }

            .cta-button {
              width: 100%;
              margin: 0;
            }

            .service-card {
              padding: 1rem;
            }

            .service-modal {
              width: 90% !important;
              margin: 1rem !important;
              padding: 1rem !important;
              max-height: 90vh !important;
            }

            .service-modal-content {
              padding: 1rem;
            }

            .appointment-form {
              padding: 1rem;
            }

            .form-group {
              margin-bottom: 1rem;
            }

            .form-group input,
            .form-group select,
            .form-group textarea {
              width: 100%;
              padding: 0.5rem;
            }

            .map-section {
              height: 300px;
            }

            .contact-info {
              text-align: center;
            }
          }
        `}
      </style>

      <footer className="footer">
        <p>© 2024 ΠΑΠΑΚΩΝΣΤΑΝΤΗΣ- Όλα τα δικαιώματα κατοχυρωμένα</p>
      </footer>
    </div>
  );
}

export default App;