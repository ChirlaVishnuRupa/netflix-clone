import React from 'react'
import './Footer.css'
import youtube_icon from'../../assets/youtube_icon.png';
import twitter_icon from'../../assets/twitter_icon.png';
import instagram_icon from'../../assets/instagram_icon.png';
import facebook_icon from'../../assets/facebook_icon.png';
const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-icons'>
      <img src={youtube_icon} alt=""/>
      <img src={instagram_icon} alt=""/>
      <img src={twitter_icon} alt=""/>
      <img src={facebook_icon} alt=""/>
      </div>
      <ul>
        <li>Audio Description</li>
        <li>Help Center</li>
        <li>Gift cards</li>
        <li>Media Center</li>
        <li>Jobs</li>
        <li>privacy</li>
        <li>Investor relations</li>
        <li>terms of use</li>
        <li>Legal notices</li>
        <li>Cookie preferences</li>
        <li>Corporate Information</li>
        <li>Contact Us</li>
      </ul>
      <p className='copyright-text'>@. 1997-2023 Netflix,Inc</p>
    </div>
  )
}

export default Footer
