"use client";

import { useEffect } from 'react';
import "@/app/styles/modal.css";

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StudentModal({ isOpen, onClose }: StudentModalProps) {
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
        <h2 className="modal-title">Start Your Enrollment Process</h2>
        
        <form className="modal-form" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          <div className="modal-grid-2">
            <div className="modal-input-group">
              <label>Your First Name</label>
              <input type="text" placeholder="Enter Your First Name" required />
            </div>
            <div className="modal-input-group">
              <label>Your Last Name</label>
              <input type="text" placeholder="Enter Your Last Name" required />
            </div>
            <div className="modal-input-group">
              <label>Your Mobile Number</label>
              <input type="tel" placeholder="Enter Your Mobile Number" required />
            </div>
            <div className="modal-input-group">
              <label>Select State</label>
              <input type="text" placeholder="Enter Your State" required />
            </div>
            <div className="modal-input-group">
              <label>Select City</label>
              <input type="text" placeholder="Enter Your City" required />
            </div>
            <div className="modal-input-group">
              <label>Course</label>
              <select required defaultValue="">
                <option value="" disabled hidden>Course You Are Interested In:</option>
                <option value="basic">Basic Hospitality</option>
                <option value="advanced">Advanced Management</option>
                <option value="culinary">Culinary Arts</option>
              </select>
            </div>
          </div>
          
          <div className="modal-checkbox-group">
            <input type="checkbox" id="student-consent" required />
            <label htmlFor="student-consent">
              I Agree To Receive Updates And Notifications Via Email, SMS, WhatsApp, Or Call. This Consent Overrides My Communication Preferences, Including DND / NDNC.
            </label>
          </div>
          
          <button type="submit" className="modal-submit-btn">Submit Now</button>
        </form>
      </div>
    </div>
  );
}
