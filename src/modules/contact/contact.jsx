import React, { useEffect } from 'react';
import './contact.css';
import locationImg from '../../assets/location.png';
import mailImg from '../../assets/mail.png';
import phoneImg from '../../assets/phone.png';

const Contact = () => {
  useEffect(() => {
    const inputs = document.querySelectorAll(".input");

    function focusFunc() {
      let parent = this.parentNode;
      parent.classList.add("focus");
    }

    function blurFunc() {
      let parent = this.parentNode;
      if (this.value === "") {
        parent.classList.remove("focus");
      }
    }

    inputs.forEach((input) => {
      input.addEventListener("focus", focusFunc);
      input.addEventListener("blur", blurFunc);
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("focus", focusFunc);
        input.removeEventListener("blur", blurFunc);
      });
    };
  }, []);

  return (
    <div className="container">
      <div className="form">
        <div className="contact-info">
          <h3 className="title">Let's get in touch</h3>
          <p className="text">Feel Free to contact us any time we will get back to you as soon as we can</p>

          <div className="info">
            <div className="information">
              <i class="fa-solid fa-location-dot"></i>
              <p>Tunis, Tunisia</p>
            </div>
            <div className="information">
              <i class="fa-solid fa-envelope"></i>
              <p>contact@therapyhub.com</p>
            </div>
            <div className="information">
              <i class="fa-solid fa-phone"></i>
              <p>+216 70 546 785</p>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <span className="circle one"></span>
          <span className="circle two"></span>

          <form action="https://formspree.io/f/xeojpawl" method="POST" autoComplete="off">
            <h3 className="title">Contact us</h3>
            <div className="input-container">
              <input type="text" name="name" className="input" required />
              <label>Username</label>
              <span>Username</span>
            </div>
            <div className="input-container">
              <input type="text" name="email" className="input" required />
              <label>Email</label>
              <span>Email</span>
            </div>
            <div className="input-container">
              <input type="tel" name="phone" className="input" required />
              <label>Phone</label>
              <span>Phone</span>
            </div>
            <div className="input-container textarea">
              <textarea name="message" className="input" required></textarea>
              <label>Message</label>
              <span>Message</span>
            </div>
            <input type="submit" value="Send" className="btn" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;