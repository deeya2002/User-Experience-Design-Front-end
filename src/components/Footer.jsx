import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.column}>
          <h4>Kupondole</h4>
          <p>Lalitpur, Bagmati Province</p>
          <p>Nepal</p>
          <p>Phone: +977 9861386709</p>
          <p>Email: <a href="mailto:diyadangol2002@gmail.com" style={styles.link}>diyadangol2002@gmail.com</a></p>
        </div>
        <div style={styles.column}>
          <h4>Useful Links</h4>
          <ul style={styles.list}>
            <li><a href="/home" style={styles.link}>Home</a></li>
            <li><a href="/about" style={styles.link}>About Us</a></li>
            <li><a href="#tos" style={styles.link}>Terms Of Service</a></li>
            <li><a href="#privacy" style={styles.link}>Privacy Policy</a></li>
          </ul>
        </div>
        <div style={styles.column}>
          <h4>Our Services</h4>
          <ul style={styles.list}>
            <li><a href="/gallery" style={styles.link}>Gallery</a></li>
            <li><a href="/contact" style={styles.link}>Contact Us</a></li>
            <li><a href="/journals" style={styles.link}>Journals</a></li>
          </ul>
        </div>
        <div style={styles.column}>
          <h4>Our Social Networks</h4>
          <p>Follow us on our social media to stay updated about community Garbage management.</p>
          <div style={styles.socialIcons}>
            <a href="#facebook" style={styles.link}><FontAwesomeIcon icon={faFacebook} size="2x" /></a>
            <a href="#instagram" style={styles.link}><FontAwesomeIcon icon={faInstagram} size="2x" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#f1f1f1',
    padding: '20px 0',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    width: '80%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    margin: '0 10px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  link: {
    color: '#000',
    textDecoration: 'none',
  },
  socialIcons: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100px',
    margin: '0 auto',
  }
};

export default Footer;
