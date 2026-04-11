"use client";

import { useEffect } from 'react';
import "@/app/styles/modal.css";

interface EmployerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmployerModal({ isOpen, onClose }: EmployerModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        <h2 className="modal-title">Start Your Hiring Process</h2>
        
        <form className="modal-form" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          <div className="modal-grid-2">
            <div className="modal-input-group">
              <label>Your Full Name</label>
              <input type="text" placeholder="Enter Your Full Name" required />
            </div>
            <div className="modal-input-group">
              <label>Company Name</label>
              <input type="text" placeholder="Enter Your Company Name" required />
            </div>
            <div className="modal-input-group">
              <label>Work Email</label>
              <input type="email" placeholder="Enter Your Email" required />
            </div>
            <div className="modal-input-group">
              <label>Enter Phone Number</label>
              <input type="tel" placeholder="Enter Phone Number" required />
            </div>
            <div className="modal-input-group">
              <label>Job Role</label>
              <select required defaultValue="">
                <option value="" disabled hidden>Select</option>
                <option value="chef">Chef</option>
                <option value="manager">Manager</option>
                <option value="staff">Staff</option>
              </select>
            </div>
            <div className="modal-input-group">
              <label>Number Of Candidates Required</label>
              <input type="number" placeholder="Enter Number" required />
            </div>
            <div className="modal-input-group">
              <label>Location For Job</label>
              <select required defaultValue="">
                <option value="" disabled hidden>Choose The Location</option>
                <option value="dubai">Dubai</option>
                <option value="india">India</option>
                <option value="london">London</option>
              </select>
            </div>
            <div className="modal-input-group">
              <label>Employment Type</label>
              <select required defaultValue="">
                <option value="" disabled hidden>Select</option>
                <option value="fulltime">Full Time</option>
                <option value="parttime">Part Time</option>
                <option value="contract">Contract</option>
              </select>
            </div>
          </div>
          
          <div className="modal-checkbox-group">
            <input type="checkbox" id="emp-consent" required />
            <label htmlFor="emp-consent">
              I Agree To Receive Updates And Notifications Via Email, SMS, WhatsApp, Or Call. This Consent Overrides My Communication Preferences, Including DND / NDNC.
            </label>
          </div>
          
          <button type="submit" className="modal-submit-btn">Submit Now</button>
        </form>
      </div>
    </div>
  );
}
