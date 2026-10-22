/**
 * Centralized Database Collections Registry
 * 
 * Defines standardized, future-proof collection names across the application.
 * All database operations should reference these constants rather than hardcoded strings.
 */

export const COLLECTIONS = {
  // Main Platform Courses
  COURSES: "courses",
  CUSTOM_COURSES: "custom_courses",

  // E-Certification Assessment & Testing Engine
  E_CERTIFICATIONS: "e_certifications",
  E_CERTIFICATION_QUESTIONS: "e_certification_questions",
  E_CERTIFICATION_SESSIONS: "e_certification_sessions",

  // Identity & Authentication
  USERS: "users",
  SIGNUP_OTPS: "signup_otps",
  DELETION_OTPS: "deletion_otps",

  // Sales, Enrollments & Transactions
  ENROLLMENTS: "enrollments",
  TRANSACTIONS: "transactions",

  // Inquiries & Partnerships
  CONTACTS: "contacts",
  EMPLOYERS: "employers",

  // System Utilities
  COUNTERS: "counters",
} as const;

export type CollectionName = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];

/**
 * Legacy aliases for seamless backward compatibility during database migration
 */
export const COLLECTION_ALIASES: Record<string, string> = {
  exams: COLLECTIONS.E_CERTIFICATIONS,
  exam_questions: COLLECTIONS.E_CERTIFICATION_QUESTIONS,
  exam_sessions: COLLECTIONS.E_CERTIFICATION_SESSIONS,
  customCourses: COLLECTIONS.CUSTOM_COURSES,
};
