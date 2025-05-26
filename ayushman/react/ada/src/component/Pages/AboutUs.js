import React from "react";
import Header from "../Header";

const teamMembers = [
  {
    name: "Ayushmaan Agnihotri",
    jd: "Full-Stack Developer",
    image: "/Ayushmaan.jpg",
    twitter: "#",
    instagram: "https://www.instagram.com/ayush_maan308/?__pwa=1",
    linkedin: "https://www.linkedin.com/in/ayushmaan-agnihotri-739a642b8/",
  },
  {
    name: "Aryaman Verma",
    jd: "ML Developer",
    image: "/Aryaman.jpg",
    twitter: "#",
    linkedin: "https://www.linkedin.com/in/aryaman-verma-hk/", // Removed instagram
  },
  {
    name: "Devansh Bajaj",
    jd: "Front-End Developer",
    image: "/Devansh.jpg",
    twitter: "#",
    instagram: "https://www.instagram.com/devanshbajaj21/",
    linkedin: "https://www.linkedin.com/in/devansh-bajaj-39b3692b9/",
  },
];

const AboutUs = () => {
  return (
    <>
    <Header></Header>
    <div className="about">
    <div className="about-us-container">
      <h1 className="about-title"><u>Meet Our Team</u></h1>
      <div className="cards-wrapper">
        {teamMembers.map((member, index) => (
          <div className="profile-card" key={index}>
            <div className="image">
              <img src={member.image} alt={member.name} className="profile-img" />
            </div>
            <div className="text-data">
              <span className="name">{member.name}</span>
              <span className="job">{member.jd}</span>
            </div>
            <div className="media-buttons">
              <a href={member.twitter} className="link"><i className="bx bxl-twitter"></i></a>
              {/* Only render Instagram if it exists */}
              {member.instagram && (
                <a href={member.instagram} className="link"><i className="bx bxl-instagram"></i></a>
              )}
              <a href={member.linkedin} className="link"><i className="bx bxl-linkedin"></i></a>
            </div>
          </div>
        ))}
      </div>

      <div className="section-separator"></div>

      <div className="aim-vision-section">
        <h2>Our Aim</h2>
        <p>
          Our aim is to create a seamless, enjoyable, and trustworthy online shopping experience by offering high-quality products, fast delivery, and exceptional customer service — all in one convenient platform.
        </p>

        <h2>Our Vision</h2>
        <p>
          Our vision is to become a leading online shopping destination that redefines convenience, quality, and customer satisfaction — making everyday purchases effortless and enjoyable for everyone, everywhere.
        </p>
      </div>

      <div className="section-separator"></div>

      <div className="contact-section">
        <h2>Contact Us</h2>
        <p className="contact-line">
          <span>📞 +91 7042706548</span> | <span>✉️ ada@gmail.com</span>
        </p>
        <p className="address-line">
           🏫 <b>JSS Academy of Technical Education</b>  C-20/1, C Block, Phase 2, Industrial Area, Sector 62, Noida, Uttar Pradesh 201301
        </p>
      </div>

      <div className="map-container">
        <iframe
          title="Our Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.5760700948463!2d77.35669397463323!3d28.61249198499199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5992452d761%3A0xaaa44725147c1507!2sJSS%20Academy%20of%20Technical%20Education!5e0!3m2!1sen!2sin!4v1748252958793!5m2!1sen!2sin"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
    </div>
    </>
  );
};

export default AboutUs;
