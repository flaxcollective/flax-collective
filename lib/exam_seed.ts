import { getDb } from "./mongodb";

export interface ExamSeed {
  examId: string;
  title: string;
  desc: string;
  fullDesc: string;
  price: string;
  discountedPrice: string;
  duration: number; // in minutes
  passingMarks: number; // percentage
  totalQuestions: number; // to show
  isActive: boolean;
}

export interface QuestionSeed {
  examId: string;
  questionText: string;
  options: string[];
  correctOption: "A" | "B" | "C" | "D";
  explanation: string;
}

export const defaultExams: ExamSeed[] = [
  {
    examId: "CMS",
    title: "Communication Skills Certification",
    desc: "Master key concepts of active listening, verbal and non-verbal signs, assertive feedback loops, and de-escalating team barriers.",
    fullDesc: "Validate your mastery over professional communication, active listening, and body language signs. Build competence in choosing appropriate communication channels, pitching ideas (elevator pitches), and showing cultural sensitivity.",
    price: "399",
    discountedPrice: "199",
    duration: 30,
    passingMarks: 80,
    totalQuestions: 20,
    isActive: true,
  },
  {
    examId: "EPE",
    title: "Email & Professional Writing Etiquette",
    desc: "Demonstrate excellence in email subject lines, CC/BCC use, professional tones, greetings, attachments, and response times.",
    fullDesc: "This certification validates knowledge of written etiquette, proper CC/BCC allocations, writing clear and concise action-oriented subject lines, and communicating with customers and peers using a polite and neutral tone.",
    price: "399",
    discountedPrice: "199",
    duration: 30,
    passingMarks: 80,
    totalQuestions: 20,
    isActive: true,
  },
  {
    examId: "TMP",
    title: "Time Management & Productivity",
    desc: "Understand priority strategies including the Eisenhower Matrix, Pareto Principle (80/20 rule), Pomodoro Technique, and SMART goals.",
    fullDesc: "Prove your ability to manage work hours effectively. The exam tests prioritization matrices, focused intervals (Pomodoro), batching tasks, handling multitasking pitfalls, setting boundaries, delegating, and avoiding procrastination.",
    price: "399",
    discountedPrice: "199",
    duration: 30,
    passingMarks: 80,
    totalQuestions: 20,
    isActive: true,
  },
  {
    examId: "LTM",
    title: "Leadership & Team Management Basics",
    desc: "Verify baseline skills in situational leadership styles, employee delegation, feedback delivery, conflict moderation, and trust building.",
    fullDesc: "Focuses on essential leadership behaviors, differentiating leaders from managers, implementing situational adaptiveness, servant leadership structures, handling onboarding resources, and building psychological safety.",
    price: "399",
    discountedPrice: "199",
    duration: 30,
    passingMarks: 80,
    totalQuestions: 20,
    isActive: true,
  },
  {
    examId: "ISB",
    title: "Interview Skills & Resume Building",
    desc: "Master resumes, ATS scans, formatting, the STAR method, dressing standards, negotiations, and thank-you protocols.",
    fullDesc: "Validate your preparedness for career progressions. Focuses on resume optimization for ATS scanning, utilizing the STAR technique for behavioral queries, and handling weaknesses and salary negotiations professionally.",
    price: "399",
    discountedPrice: "199",
    duration: 30,
    passingMarks: 80,
    totalQuestions: 20,
    isActive: true,
  },
  {
    examId: "EIW",
    title: "Emotional Intelligence at Workplace",
    desc: "Establish competence in workplace self-awareness, empathy, emotional self-regulation, motivation, and handling peer criticism.",
    fullDesc: "Tests components of emotional intelligence (EQ) in corporate life, identifying triggers, practicing active mindfulness, de-escalating customer and peer situations, and managing workplace emotional contagion.",
    price: "399",
    discountedPrice: "199",
    duration: 30,
    passingMarks: 80,
    totalQuestions: 20,
    isActive: true,
  },
  {
    examId: "CRN",
    title: "Conflict Resolution & Negotiation",
    desc: "Master compromising and collaborative conflict resolution, BATNA evaluations, root cause checks, and mediator roles.",
    fullDesc: "Demonstrate capability in diffusing tense coworker situations. Covers win-win outcomes, compromising styles, BATNA reference anchoring, separating people from problems, and follow-up resolutions.",
    price: "399",
    discountedPrice: "199",
    duration: 30,
    passingMarks: 80,
    totalQuestions: 20,
    isActive: true,
  },
  {
    examId: "PSP",
    title: "Public Speaking & Presentation Skills",
    desc: "Demonstrate competence in speech hook openings, vocal variations, visual slides, and body gestures.",
    fullDesc: "Tests your public speaking, stage fright de-escalation, audience analysis, rule-of-three groupings, and virtual audience engagement techniques.",
    price: "399",
    discountedPrice: "199",
    duration: 30,
    passingMarks: 80,
    totalQuestions: 20,
    isActive: true,
  },
  {
    examId: "CSE",
    title: "Customer Service Excellence",
    desc: "Learn first-contact resolution, active empathy, realistic expectation settings, customer centricity, and CLV growth.",
    fullDesc: "Validates your customer-facing service skills, handling frustrated concerns, proactive services, de-escalation techniques, and consistent support.",
    price: "399",
    discountedPrice: "199",
    duration: 30,
    passingMarks: 80,
    totalQuestions: 20,
    isActive: true,
  },
  {
    examId: "CPS",
    title: "Critical Thinking & Problem Solving",
    desc: "Learn root cause analysis, cognitive diversity, deductive reasoning, logic fallacies, and solution loops.",
    fullDesc: "Validates your evaluation capabilities. Focuses on checking assumptions, avoiding confirmation biases, using fishbone visualization diagrams, and adopting intellectual humility.",
    price: "399",
    discountedPrice: "199",
    duration: 30,
    passingMarks: 80,
    totalQuestions: 20,
    isActive: true,
  },
];

export const defaultQuestions: QuestionSeed[] = [
  // ==================== TOPIC 1: COMMUNICATION SKILLS (CMS) ====================
  {
    examId: "CMS",
    questionText: "What is the most important element of active listening?",
    options: [
      "Multitasking while listening",
      "Interrupting to share your view",
      "Maintaining eye contact and not interrupting",
      "Thinking about your reply while the other person talks"
    ],
    correctOption: "C",
    explanation: "Active listening focuses on understanding the speaker entirely rather than waiting to respond."
  },
  {
    examId: "CMS",
    questionText: "In professional communication, 'tone' primarily refers to:",
    options: [
      "The volume of your voice",
      "The length of the message",
      "The attitude conveyed through words and delivery",
      "The grammar used"
    ],
    correctOption: "C",
    explanation: "Tone carries the emotional and attitude-based qualities of delivery in both writing and speech."
  },
  {
    examId: "CMS",
    questionText: "Which of these is an example of non-verbal communication?",
    options: [
      "Body language",
      "An email",
      "A phone call",
      "A text message"
    ],
    correctOption: "A",
    explanation: "Body language, gestures, and postures convey messages without speaking words."
  },
  {
    examId: "CMS",
    questionText: "The '7 Cs of Communication' include all EXCEPT:",
    options: [
      "Conciseness",
      "Courtesy",
      "Complexity",
      "Clarity"
    ],
    correctOption: "C",
    explanation: "The 7 Cs highlight clarity, conciseness, and courtesy. Complexity acts as a communication barrier."
  },
  {
    examId: "CMS",
    questionText: "When giving feedback to a colleague, it is best to:",
    options: [
      "Avoid giving feedback altogether",
      "Criticize in front of others for accountability",
      "Focus on behavior, not personality",
      "Only give feedback via email"
    ],
    correctOption: "C",
    explanation: "Feedback should be objective and act on observable behaviors to remain constructive."
  },
  {
    examId: "CMS",
    questionText: "Paraphrasing in communication is used to:",
    options: [
      "Show off vocabulary",
      "Delay the conversation",
      "Confirm understanding of the speaker's message",
      "Change the topic"
    ],
    correctOption: "C",
    explanation: "Rephrasing the speaker's ideas confirms that you have accurately captured their intent."
  },
  {
    examId: "CMS",
    questionText: "Which channel is most appropriate for delivering sensitive feedback?",
    options: [
      "Mass email",
      "Face-to-face or video call",
      "Group chat",
      "Anonymous note"
    ],
    correctOption: "B",
    explanation: "Face-to-face dialogues allow picking up on tone and body language nuances during sensitive feedback."
  },
  {
    examId: "CMS",
    questionText: "A good elevator pitch should typically last:",
    options: [
      "10-15 seconds",
      "30-60 seconds",
      "5 minutes",
      "As long as needed"
    ],
    correctOption: "B",
    explanation: "Elevator pitches are designed to capture interest quickly during a 30-to-60-second window."
  },
  {
    examId: "CMS",
    questionText: "Which of the following best describes 'assertive communication'?",
    options: [
      "Expressing your views clearly while respecting others",
      "Staying silent to avoid conflict",
      "Agreeing with everyone to keep peace",
      "Aggressively pushing your opinion"
    ],
    correctOption: "A",
    explanation: "Assertive styles state requirements clearly while keeping respect for other perspectives intact."
  },
  {
    examId: "CMS",
    questionText: "Open-ended questions are useful because they:",
    options: [
      "Are quicker to answer",
      "Limit the conversation",
      "Can be answered with yes/no",
      "Encourage detailed responses"
    ],
    correctOption: "D",
    explanation: "Open-ended prompts require thought and description beyond binary 'yes' or 'no' replies."
  },
  {
    examId: "CMS",
    questionText: "What does 'noise' mean in the communication process?",
    options: [
      "Any interference that distorts the message",
      "The receiver's reply",
      "Background music",
      "The sender's voice"
    ],
    correctOption: "A",
    explanation: "Noise comprises environmental, psychological, or semantic elements that distort message parsing."
  },
  {
    examId: "CMS",
    questionText: "Which is a barrier to effective communication?",
    options: [
      "Asking clarifying questions",
      "Cultural differences and assumptions",
      "Active listening",
      "Clear language"
    ],
    correctOption: "B",
    explanation: "Misinterpreted cultural norms and pre-assumptions present severe blocks to mutual comprehension."
  },
  {
    examId: "CMS",
    questionText: "In written communication, clarity is best achieved by:",
    options: [
      "Avoiding punctuation",
      "Writing very long paragraphs",
      "Using complex jargon",
      "Using short, simple, direct sentences"
    ],
    correctOption: "D",
    explanation: "Clarity utilizes straightforward sentences that convey a single message block concisely."
  },
  {
    examId: "CMS",
    questionText: "The best response to an angry customer is to:",
    options: [
      "Hang up immediately",
      "Stay calm, listen, and acknowledge their concern",
      "Argue back to prove your point",
      "Match their tone"
    ],
    correctOption: "B",
    explanation: "Remaining calm and acknowledging concerns diffuses emotional tension to let problem-solving begin."
  },
  {
    examId: "CMS",
    questionText: "Which is an example of upward communication?",
    options: [
      "Employee reporting an issue to their manager",
      "Company newsletter",
      "Peer-to-peer chat",
      "Manager briefing the team"
    ],
    correctOption: "A",
    explanation: "Upward channels direct messages from lower levels of organizational hierarchies to higher-ups."
  },
  {
    examId: "CMS",
    questionText: "Effective communication in a team primarily helps to:",
    options: [
      "Slow down decision-making",
      "Create unnecessary meetings",
      "Increase confusion",
      "Reduce misunderstandings and improve collaboration"
    ],
    correctOption: "D",
    explanation: "Clear team alignments minimize overlapping work and lower conflict frequency."
  },
  {
    examId: "CMS",
    questionText: "Which of the following is a sign of poor listening?",
    options: [
      "Nodding occasionally",
      "Asking follow-up questions",
      "Checking your phone while someone is talking",
      "Maintaining eye contact"
    ],
    correctOption: "C",
    explanation: "Focusing on external devices shows disengagement and disrespect to the active speaker."
  },
  {
    examId: "CMS",
    questionText: "What is the purpose of a feedback loop in communication?",
    options: [
      "To confirm the message was understood correctly",
      "To repeat the same message twice",
      "To end the conversation quickly",
      "To avoid responding"
    ],
    correctOption: "A",
    explanation: "A feedback loop allows the sender to check if the message received aligns with their original intent."
  },
  {
    examId: "CMS",
    questionText: "Which of these improves clarity in a presentation?",
    options: [
      "Reading directly from slides",
      "Speaking very fast to cover more content",
      "Structuring content with a clear beginning, middle, and end",
      "Using as much text as possible on slides"
    ],
    correctOption: "C",
    explanation: "A sequential, logical layout helps retain audience focus and attention across slides."
  },
  {
    examId: "CMS",
    questionText: "Cultural sensitivity in communication means:",
    options: [
      "Avoiding communication with other cultures",
      "Using only your own cultural norms",
      "Ignoring cultural differences",
      "Adapting your style with awareness of others' backgrounds"
    ],
    correctOption: "D",
    explanation: "Sensitivity accommodates cultural variations to build productive collaboration networks."
  },

  // ==================== TOPIC 2: EMAIL & PROFESSIONAL WRITING (EPE) ====================
  {
    examId: "EPE",
    questionText: "A professional email subject line should be:",
    options: [
      "Left blank",
      "Vague and generic",
      "Written in all caps",
      "Clear and specific to the email's purpose"
    ],
    correctOption: "D",
    explanation: "A specific subject helps recipients prioritize their inbox and retrieve emails later."
  },
  {
    examId: "EPE",
    questionText: "Which greeting is most appropriate in a formal business email?",
    options: [
      "Hey there!",
      "Dear Mr./Ms. [Last Name]",
      "Yo team",
      "What's up"

    ],
    correctOption: "B",
    explanation: "Formal openings set a respectful, professional relationship boundary in external threads."
  },
  {
    examId: "EPE",
    questionText: "When should you use 'Reply All'?",
    options: [
      "Only when the response is relevant to everyone on the thread",
      "Never",
      "Just to let your boss know how much you work",
      "Every time, regardless of relevance"
    ],
    correctOption: "A",
    explanation: "Reply All should be reserved for updates that are strictly relevant to every CC'd address."
  },
  {
    examId: "EPE",
    questionText: "The CC field in an email is used to:",
    options: [
      "Send the primary request",
      "Keep people informed without requiring action",
      "Hide recipients from each other",
      "Block the email from being forwarded"
    ],
    correctOption: "B",
    explanation: "CC'd members are kept in the loop for visibility, whereas Direct (To) lines have action items."
  },
  {
    examId: "EPE",
    questionText: "What is the ideal length for a professional email?",
    options: [
      "As long as possible to show effort",
      "Exactly 500 words",
      "Concise and to the point",
      "One word"
    ],
    correctOption: "C",
    explanation: "Concise logs increase the likelihood of quick reads and action responses from busy partners."
  },
  {
    examId: "EPE",
    questionText: "Before sending an important email, you should always:",
    options: [
      "Proofread for spelling, grammar, and tone",
      "Use as much jargon as possible",
      "Send it immediately without review",
      "Add unnecessary attachments"
    ],
    correctOption: "A",
    explanation: "Proofreading minimizes errors and ensures the tone translates correctly in written form."
  },
  {
    examId: "EPE",
    questionText: "Which of these is considered poor email etiquette?",
    options: [
      "Using a clear subject line",
      "Responding within 24-48 hours",
      "Writing in ALL CAPS to emphasize a point",
      "Signing off with your name"
    ],
    correctOption: "C",
    explanation: "ALL CAPS translates to shouting in digital communication, appearing confrontational."
  },
  {
    examId: "EPE",
    questionText: "The BCC field should be used when:",
    options: [
      "You are sending spam",
      "You want all recipients to see each other's emails",
      "You want to highlight the most important recipient",
      "You want to hide a recipient's identity from others on the thread"
    ],
    correctOption: "D",
    explanation: "BCC hides recipient addresses, preventing shared disclosure or circular threads."
  },
  {
    examId: "EPE",
    questionText: "A professional email signature typically includes:",
    options: [
      "Nothing at all",
      "Name, designation, and contact information",
      "Only your first name",
      "Your home address"
    ],
    correctOption: "B",
    explanation: "Signatures provide necessary contact detail and verify your organizational title."
  },
  {
    examId: "EPE",
    questionText: "What is the best practice when forwarding a long email thread?",
    options: [
      "Delete the original sender's name",
      "Add a short summary or context at the top",
      "Change the subject line randomly",
      "Forward everything without summary"
    ],
    correctOption: "B",
    explanation: "A top-level summary clarifies the action required from the newly added recipient."
  },
  {
    examId: "EPE",
    questionText: "Which tone is most appropriate for a formal business email?",
    options: [
      "Overly emotional",
      "Sarcastic",
      "Casual and full of slang",
      "Polite, professional, and neutral"
    ],
    correctOption: "D",
    explanation: "Neutral, respectful statements prevent misinterpretations and preserve work relationships."
  },
  {
    examId: "EPE",
    questionText: "When you make an error in a sent email, the best action is to:",
    options: [
      "Send a polite follow-up correction",
      "Ignore it",
      "Delete the email from your own inbox only",
      "Blame someone else"
    ],
    correctOption: "A",
    explanation: "Sending a prompt, polite correction shows accountability and provides the right records."
  },
  {
    examId: "EPE",
    questionText: "What should you check before attaching a file to an email?",
    options: [
      "The file size is unnecessarily large",
      "The file is irrelevant",
      "Nothing, just attach anything",
      "The correct file is attached and properly named"
    ],
    correctOption: "D",
    explanation: "Verifying attachments prevents leaking confidential info or sending stale revisions."
  },
  {
    examId: "EPE",
    questionText: "Using emojis in professional emails is generally:",
    options: [
      "Required for every greeting",
      "Mandatory in every email",
      "Always encouraged",
      "Acceptable occasionally depending on context and relationship"
    ],
    correctOption: "D",
    explanation: "Emojis can soften a message, but their use depends heavily on company culture and relationships."
  },
  {
    examId: "EPE",
    questionText: "The closing line 'Best regards,' is an example of:",
    options: [
      "A professional sign-off",
      "A subject line",
      "A greeting",
      "An attachment note"
    ],
    correctOption: "A",
    explanation: "Sign-offs close the document politely, transitioning into your signature block."
  },
  {
    examId: "EPE",
    questionText: "When writing to a client for the first time, you should:",
    options: [
      "Use informal language immediately",
      "Skip the greeting",
      "Introduce yourself clearly and state the purpose politely",
      "Use excessive abbreviations"
    ],
    correctOption: "C",
    explanation: "Polite introductions build positive brand equity on new client connections."
  },
  {
    examId: "EPE",
    questionText: "What is 'email tone mismatch'?",
    options: [
      "When the font size varies",
      "When the email bounces back",
      "When attachments fail to open",
      "When the written tone is misread compared to intended meaning"
    ],
    correctOption: "D",
    explanation: "Text lacks vocal indicators, which often causes flat emails to read as cold or hostile."
  },
  {
    examId: "EPE",
    questionText: "A good practice for response time to professional emails is:",
    options: [
      "Reply only if reminded twice",
      "Wait one month",
      "Reply within a reasonable time frame, generally 24-48 hours",
      "Never reply"
    ],
    correctOption: "C",
    explanation: "Responding within 24-48 hours keeps operations fluid and signals reliability."
  },
  {
    examId: "EPE",
    questionText: "Which is an example of a clear, action-oriented email subject?",
    options: [
      "Hi",
      "Meeting",
      "FYI",
      "Action Required: Submit Report by Friday EOD"
    ],
    correctOption: "D",
    explanation: "Action-oriented subjects specify exact urgency criteria for the recipient."
  },
  {
    examId: "EPE",
    questionText: "Why should you avoid excessive exclamation marks in professional emails?",
    options: [
      "They are required for emphasis",
      "They increase email size",
      "They can come across as unprofessional or overly emotional",
      "They save space"
    ],
    correctOption: "C",
    explanation: "Multiple exclamation marks dilute professionalism and make messages appear intense."
  },

  // ==================== TOPIC 3: TIME MANAGEMENT & PRODUCTIVITY (TMP) ====================
  {
    examId: "TMP",
    questionText: "The Eisenhower Matrix categorizes tasks based on:",
    options: [
      "Length and complexity",
      "Team size",
      "Cost and budget",
      "Urgency and importance"
    ],
    correctOption: "D",
    explanation: "The Matrix divides tasks into four quadrants of urgency and importance to guide priorities."
  },
  {
    examId: "TMP",
    questionText: "What does the '80/20 rule' (Pareto Principle) suggest?",
    options: [
      "80% of results come from 20% of efforts",
      "All tasks take equal time",
      "20% of tasks are unimportant",
      "80% of time should be spent in meetings"
    ],
    correctOption: "A",
    explanation: "Focusing on the high-yield 20% of actions drives the majority of productivity outputs."
  },
  {
    examId: "TMP",
    questionText: "Which technique involves working in focused 25-minute intervals with breaks?",
    options: [
      "SWOT Analysis",
      "Pomodoro Technique",
      "Eisenhower Matrix",
      "SMART Goals"
    ],
    correctOption: "B",
    explanation: "The Pomodoro Technique uses 25-minute sprints to manage attention span decay."
  },
  {
    examId: "TMP",
    questionText: "A SMART goal should be:",
    options: [
      "Strategic, Major, Aggressive, Risky, Tactical",
      "Simple, Manageable, Active, Reasonable, Tested",
      "Slow, Methodical, Average, Routine, Typical",
      "Specific, Measurable, Achievable, Relevant, Time-bound"
    ],
    correctOption: "D",
    explanation: "SMART rules refine fuzzy objectives into concrete, trackable project timelines."
  },
  {
    examId: "TMP",
    questionText: "Procrastination is best addressed by:",
    options: [
      "Avoiding the task entirely",
      "Multitasking heavily",
      "Waiting for motivation to strike",
      "Breaking tasks into smaller, manageable steps"
    ],
    correctOption: "D",
    explanation: "Breaking projects into small steps reduces cognitive inertia and fear of failure."
  },
  {
    examId: "TMP",
    questionText: "What is 'time blocking'?",
    options: [
      "Allocating specific time slots for specific tasks",
      "Working without any schedule",
      "Ignoring deadlines",
      "Blocking calendar invites from colleagues"
    ],
    correctOption: "A",
    explanation: "Allocating dedicated blocks for tasks protects focus from incoming meeting request drift."
  },
  {
    examId: "TMP",
    questionText: "Which of these is a common productivity killer?",
    options: [
      "Taking scheduled breaks",
      "Setting clear goals",
      "Prioritizing tasks",
      "Constant multitasking and context-switching"
    ],
    correctOption: "D",
    explanation: "Context-switching leaves attention residue, draining mental energy and slowing work."
  },
  {
    examId: "TMP",
    questionText: "A daily to-do list helps primarily by:",
    options: [
      "Filling up time",
      "Providing clarity and prioritization for the day",
      "Replacing long-term planning",
      "Increasing stress"
    ],
    correctOption: "B",
    explanation: "Visual lists focus your attention on daily goals and prevent passive task accumulation."
  },
  {
    examId: "TMP",
    questionText: "What is the main risk of multitasking?",
    options: [
      "Reduced quality and efficiency due to divided attention",
      "Improved focus",
      "Better memory retention",
      "Faster task completion always"
    ],
    correctOption: "A",
    explanation: "Multitasking divides your cognitive focus, which increases error rates."
  },
  {
    examId: "TMP",
    questionText: "Which is an example of an 'urgent but not important' task?",
    options: [
      "A ringing phone call during deep work",
      "Long-term strategic planning",
      "Skill development",
      "Annual goal setting"
    ],
    correctOption: "A",
    explanation: "Incoming phone calls demand immediate response (urgency) but may not support core goals."
  },
  {
    examId: "TMP",
    questionText: "The term 'deep work' refers to:",
    options: [
      "Working on multiple shallow tasks at once",
      "Working late at night only",
      "Focused, undistracted work on cognitively demanding tasks",
      "Taking long breaks"
    ],
    correctOption: "C",
    explanation: "Deep work isolates your attention to perform complex cognitive tasks efficiently."
  },
  {
    examId: "TMP",
    questionText: "Setting boundaries at work helps with time management by:",
    options: [
      "Increasing workload",
      "Making you unavailable to everyone",
      "Avoiding all collaboration",
      "Reducing unnecessary interruptions"
    ],
    correctOption: "D",
    explanation: "Setting limits on direct messages and drop-ins protects hours for focus work."
  },
  {
    examId: "TMP",
    questionText: "Which is a good practice for managing a busy calendar?",
    options: [
      "Reviewing and prioritizing meetings based on necessity",
      "Scheduling back-to-back meetings with no breaks",
      "Ignoring the calendar entirely",
      "Accepting every meeting invite"
    ],
    correctOption: "A",
    explanation: "Pruning unnecessary meetings from your calendar saves hours of focus time."
  },
  {
    examId: "TMP",
    questionText: "What is 'batching' in productivity?",
    options: [
      "Doing one task per day only",
      "Grouping similar tasks together to do them in one session",
      "Working in random order",
      "Avoiding repetitive tasks"
    ],
    correctOption: "B",
    explanation: "Batching handles similar tasks together, reducing the mental cost of context-switching."
  },
  {
    examId: "TMP",
    questionText: "A common cause of missed deadlines is:",
    options: [
      "Clear prioritization",
      "Poor planning and underestimating task duration",
      "Using a calendar",
      "Setting reminders"
    ],
    correctOption: "B",
    explanation: "Planning fallacies lead people to assume tasks will take less time than they actually do."
  },
  {
    examId: "TMP",
    questionText: "Why is it important to review your week's tasks regularly?",
    options: [
      "To track and adjust priorities effectively",
      "To avoid setting any goals",
      "To increase workload",
      "It has no real benefit"
    ],
    correctOption: "A",
    explanation: "Weekly reviews allow you to adjust goals based on actual progress and shifting team priorities."
  },
  {
    examId: "TMP",
    questionText: "Which of these best supports work-life balance?",
    options: [
      "Avoiding all planning",
      "Working without breaks",
      "Setting clear work hours and respecting personal time",
      "Replying to emails 24/7"
    ],
    correctOption: "C",
    explanation: "Disconnecting from work email after hours protects personal time and prevents burnout."
  },
  {
    examId: "TMP",
    questionText: "The 'two-minute rule' suggests that:",
    options: [
      "Breaks should last two minutes only",
      "If a task takes less than two minutes, do it immediately",
      "Two minutes should be spent planning each day",
      "All tasks take two minutes"
    ],
    correctOption: "B",
    explanation: "Completing quick tasks immediately prevents them from cluttering your to-do list."
  },
  {
    examId: "TMP",
    questionText: "Delegation is an effective time management tool because it:",
    options: [
      "Removes your responsibility entirely",
      "Increases your workload",
      "Should never be used",
      "Frees up time for higher-priority tasks by assigning suitable tasks to others"
    ],
    correctOption: "D",
    explanation: "Delegation allocates tasks to team members with matching skills, freeing up leadership time."
  },
  {
    examId: "TMP",
    questionText: "What is the first step in effective time management?",
    options: [
      "Ignoring deadlines",
      "Identifying and prioritizing your tasks and goals",
      "Working faster",
      "Avoiding all planning tools"
    ],
    correctOption: "B",
    explanation: "You must define clear priorities first; speed is useless if you focus on the wrong tasks."
  },

  // ==================== TOPIC 4: LEADERSHIP & TEAM MANAGEMENT (LTM) ====================
  {
    examId: "LTM",
    questionText: "A key trait of an effective leader is:",
    options: [
      "Working in isolation",
      "Clear vision and the ability to inspire others",
      "Avoiding feedback",
      "Micromanaging every task"
    ],
    correctOption: "B",
    explanation: "Good leaders align efforts around a clear purpose and motivate teams to achieve it."
  },
  {
    examId: "LTM",
    questionText: "What is the difference between a leader and a manager?",
    options: [
      "Leaders inspire and set vision; managers focus on execution and processes",
      "Managers always outrank leaders",
      "There is no difference",
      "Leaders only handle finances"
    ],
    correctOption: "A",
    explanation: "Management focuses on keeping systems running smoothly, while leadership drives direction and change."
  },
  {
    examId: "LTM",
    questionText: "Situational leadership suggests that leaders should:",
    options: [
      "Avoid making decisions",
      "Delegate everything regardless of context",
      "Adapt their style based on the team's needs and situation",
      "Use the same style for every situation"
    ],
    correctOption: "C",
    explanation: "Effective leaders adapt their direction and support based on the skill level of their team."
  },
  {
    examId: "LTM",
    questionText: "Delegation is important because it:",
    options: [
      "Should be avoided by good leaders",
      "Removes accountability from the leader",
      "Develops team members and improves efficiency",
      "Means giving away all responsibilities"
    ],
    correctOption: "C",
    explanation: "Delegation helps team members build skills while saving manager time for strategic planning."
  },
  {
    examId: "LTM",
    questionText: "What does 'servant leadership' emphasize?",
    options: [
      "Leading by prioritizing and supporting the team's growth and needs",
      "Avoiding team interaction",
      "Strict hierarchy",
      "The leader's personal gain"
    ],
    correctOption: "A",
    explanation: "Servant leaders focus on supporting and empowering their team members to help them succeed."
  },
  {
    examId: "LTM",
    questionText: "A good leader handles team conflict by:",
    options: [
      "Facilitating open discussion and fair resolution",
      "Ignoring it completely",
      "Taking sides immediately",
      "Punishing all involved without investigation"
    ],
    correctOption: "A",
    explanation: "Good leaders address conflicts early, helping the team resolve issues constructively."
  },
  {
    examId: "LTM",
    questionText: "Which is a characteristic of a high-performing team?",
    options: [
      "Lack of trust among members",
      "Clear roles, trust, and open communication",
      "No accountability",
      "Constant unresolved conflict"
    ],
    correctOption: "B",
    explanation: "High-performing teams rely on clear goals, mutual accountability, and strong trust."
  },
  {
    examId: "LTM",
    questionText: "Giving constructive feedback as a leader should focus on:",
    options: [
      "Specific behaviors and improvement suggestions",
      "Personal attacks",
      "Past mistakes only",
      "Public humiliation"
    ],
    correctOption: "A",
    explanation: "Constructive feedback should be actionable and focus on growth rather than criticism."
  },
  {
    examId: "LTM",
    questionText: "What is 'micromanagement'?",
    options: [
      "Giving employees full autonomy",
      "Excessively controlling and overseeing small details of others' work",
      "Delegating effectively",
      "Setting clear expectations"
    ],
    correctOption: "B",
    explanation: "Micromanagement limits employee independence and damages team motivation."
  },
  {
    examId: "LTM",
    questionText: "Emotional intelligence in leadership primarily involves:",
    options: [
      "Avoiding empathy",
      "Understanding and managing one's own and others' emotions effectively",
      "Ignoring emotions at work",
      "Suppressing all feelings"
    ],
    correctOption: "B",
    explanation: "Emotional intelligence helps leaders manage stress, build empathy, and resolve team conflicts."
  },
  {
    examId: "LTM",
    questionText: "A leader's role during a crisis is to:",
    options: [
      "Blame the team",
      "Disappear until it resolves",
      "Stay calm, communicate clearly, and guide the team",
      "Panic and avoid communication"
    ],
    correctOption: "C",
    explanation: "Remaining calm and communicative during a crisis helps keep the team aligned and focused."
  },
  {
    examId: "LTM",
    questionText: "What is the benefit of setting clear team goals?",
    options: [
      "Limits creativity entirely",
      "Creates confusion",
      "Aligns the team's efforts and improves accountability",
      "Has no real impact"
    ],
    correctOption: "C",
    explanation: "Clear, visible goals help teams prioritize tasks and stay accountable."
  },
  {
    examId: "LTM",
    questionText: "Which leadership style involves making decisions without team input?",
    options: [
      "Laissez-faire",
      "Servant",
      "Autocratic",
      "Democratic"
    ],
    correctOption: "C",
    explanation: "Autocratic leaders make decisions alone, prioritizing speed over team alignment."
  },
  {
    examId: "LTM",
    questionText: "Recognizing team achievements helps to:",
    options: [
      "Create unnecessary competition",
      "Reduce productivity",
      "Boost morale and reinforce positive performance",
      "Decrease motivation"
    ],
    correctOption: "C",
    explanation: "Celebrating wins improves team motivation and reinforces positive behavior."
  },
  {
    examId: "LTM",
    questionText: "What does 'leading by example' mean?",
    options: [
      "Avoiding responsibility",
      "Demonstrating the behaviors and work ethic you expect from others",
      "Telling others what to do without doing it yourself",
      "Delegating all difficult tasks"
    ],
    correctOption: "B",
    explanation: "Leading by example builds trust and sets clear expectations for team behavior."
  },
  {
    examId: "LTM",
    questionText: "A key part of onboarding new team members is:",
    options: [
      "Providing clear expectations, resources, and support",
      "Assigning the hardest tasks immediately",
      "Avoiding introductions to the team",
      "Leaving them without guidance"
    ],
    correctOption: "A",
    explanation: "A structured onboarding process helps new hires adapt and contribute quickly."
  },
  {
    examId: "LTM",
    questionText: "What is 'laissez-faire' leadership?",
    options: [
      "Leadership that avoids delegation",
      "Leadership based on punishment",
      "A hands-off approach giving team members high autonomy",
      "Highly controlling leadership"
    ],
    correctOption: "C",
    explanation: "Laissez-faire leadership gives skilled teams independence, but requires self-direction."
  },
  {
    examId: "LTM",
    questionText: "Why is trust important in team management?",
    options: [
      "It slows down decision-making",
      "It is not necessary for performance",
      "It only matters for senior leaders",
      "It enables collaboration, openness, and psychological safety"
    ],
    correctOption: "D",
    explanation: "Trust is the foundation of team collaboration and open problem-solving."
  },
  {
    examId: "LTM",
    questionText: "One-on-one meetings with team members are useful for:",
    options: [
      "Replacing all team meetings",
      "Wasting time",
      "Avoiding personal connection",
      "Providing individualized feedback and support"
    ],
    correctOption: "D",
    explanation: "Regular 1-on-1s help address individual concerns and support employee growth."
  },
  {
    examId: "LTM",
    questionText: "A growth mindset in leadership involves:",
    options: [
      "Avoiding any new challenges",
      "Believing skills can be developed through effort and learning",
      "Believing abilities are fixed and unchangeable",
      "Discouraging team learning"
    ],
    correctOption: "B",
    explanation: "Leaders with a growth mindset view challenges as opportunities to learn and develop skills."
  },

  // ==================== TOPIC 5: INTERVIEW SKILLS & RESUME BUILDING (ISB) ====================
  {
    examId: "ISB",
    questionText: "A resume should typically be limited to:",
    options: [
      "1-2 pages depending on experience",
      "Half a page only",
      "10 pages",
      "As long as possible"
    ],
    correctOption: "A",
    explanation: "Resumes should be concise summaries of relevant accomplishments, typically 1 to 2 pages."
  },
  {
    examId: "ISB",
    questionText: "The STAR method in interviews stands for:",
    options: [
      "Strategy, Target, Achievement, Review",
      "Strength, Theory, Action, Reflection",
      "Situation, Task, Action, Result",
      "Skills, Talent, Ambition, Resume"
    ],
    correctOption: "C",
    explanation: "The STAR method helps structure clear, structured answers to behavioral questions."
  },
  {
    examId: "ISB",
    questionText: "Which is the most important section of a resume for recruiters?",
    options: [
      "Hobbies",
      "Personal photo",
      "Font choice",
      "Relevant skills and work experience"
    ],
    correctOption: "D",
    explanation: "Recruiters focus primarily on work history and skills to match candidates to roles."
  },
  {
    examId: "ISB",
    questionText: "When answering 'Tell me about yourself,' you should:",
    options: [
      "Share your entire life history",
      "Discuss unrelated personal matters",
      "Give a concise, relevant summary connected to the role",
      "Stay silent"
    ],
    correctOption: "C",
    explanation: "This opener is an opportunity to highlight relevant professional wins matching the role requirements."
  },
  {
    examId: "ISB",
    questionText: "Which of these strengthens a resume?",
    options: [
      "Generic statements only",
      "Quantifiable achievements (e.g., 'increased sales by 20%')",
      "Vague descriptions",
      "Irrelevant work experience"
    ],
    correctOption: "B",
    explanation: "Quantifiable numbers prove the impact of your actions to hiring managers."
  },
  {
    examId: "ISB",
    questionText: "Before an interview, it is important to:",
    options: [
      "Research the company and role thoroughly",
      "Skip researching the company",
      "Memorize a script word-for-word",
      "Avoid preparing questions"
    ],
    correctOption: "A",
    explanation: "Researching the company helps you explain how your skills align with their current goals."
  },
  {
    examId: "ISB",
    questionText: "What should you do if you don't know the answer to an interview question?",
    options: [
      "Stay silent and say nothing",
      "Walk out of the interview",
      "Be honest and explain your thought process",
      "Make up an answer confidently"
    ],
    correctOption: "C",
    explanation: "Hiring managers value transparency and problem-solving logic over guesses."
  },
  {
    examId: "ISB",
    questionText: "A cover letter should primarily:",
    options: [
      "Repeat the resume word for word",
      "Be longer than the resume",
      "Highlight why you're a strong fit for the specific role",
      "Be generic for all applications"
    ],
    correctOption: "C",
    explanation: "Cover letters should connect your experience directly to the specific job duties."
  },
  {
    examId: "ISB",
    questionText: "Which of these is appropriate interview attire advice?",
    options: [
      "Always wear whatever you like regardless of company culture",
      "Dress slightly more formal than the company's everyday dress code",
      "Wear pajamas for virtual interviews",
      "Attire doesn't matter at all"
    ],
    correctOption: "B",
    explanation: "Dressing professionally signals respect for the company and values the opportunity."
  },
  {
    examId: "ISB",
    questionText: "What is the purpose of asking questions at the end of an interview?",
    options: [
      "To show genuine interest and evaluate role/company fit",
      "To challenge the interviewer",
      "It's not necessary",
      "To fill time"
    ],
    correctOption: "A",
    explanation: "Asking thoughtful questions shows interest and helps you assess if the job is a good fit."
  },
  {
    examId: "ISB",
    questionText: "A common resume mistake is:",
    options: [
      "Including spelling and grammar errors",
      "Tailoring it to each job",
      "Listing relevant skills",
      "Using clear formatting"
    ],
    correctOption: "A",
    explanation: "Typos and grammatical mistakes signal poor attention to detail."
  },
  {
    examId: "ISB",
    questionText: "When discussing a previous employer in an interview, you should:",
    options: [
      "Exaggerate problems to seem like a victim",
      "Avoid mentioning them at all",
      "Stay professional and focus on growth and learning",
      "Speak negatively to explain why you left"
    ],
    correctOption: "C",
    explanation: "Criticizing past employers signals negativity and leaves a bad impression."
  },
  {
    examId: "ISB",
    questionText: "What does 'soft skills' refer to on a resume?",
    options: [
      "Academic grades",
      "Interpersonal traits like communication, teamwork, and adaptability",
      "Programming languages",
      "Technical certifications only"
    ],
    correctOption: "B",
    explanation: "Soft skills describe how you collaborate with peers and manage work responsibilities."
  },
  {
    examId: "ISB",
    questionText: "Following up after an interview is considered:",
    options: [
      "A sign of desperation",
      "Unnecessary and intrusive",
      "Only required for senior roles",
      "A professional courtesy that reinforces interest"
    ],
    correctOption: "D",
    explanation: "A brief follow-up note displays professionalism and keeps you top-of-mind for the role."
  },
  {
    examId: "ISB",
    questionText: "An ATS (Applicant Tracking System) scans resumes primarily for:",
    options: [
      "Font style",
      "Relevant keywords matching the job description",
      "Visual design only",
      "Personal hobbies"
    ],
    correctOption: "B",
    explanation: "ATS filters select resumes containing keywords matching the specific job posting."
  },
  {
    examId: "ISB",
    questionText: "Which is a strong way to handle a question about weaknesses?",
    options: [
      "Mention a real area for growth along with steps you're taking to improve",
      "Claim you have no weaknesses",
      "Avoid answering",
      "List multiple unrelated flaws"
    ],
    correctOption: "A",
    explanation: "Discussing self-improvement steps highlights maturity and self-awareness."
  },
  {
    examId: "ISB",
    questionText: "Body language during an interview should convey:",
    options: [
      "Confidence through good posture and eye contact",
      "Disinterest and slouching",
      "Avoiding all eye contact",
      "Excessive fidgeting"
    ],
    correctOption: "A",
    explanation: "Open posture and natural eye contact signal engagement and self-confidence."
  },
  {
    examId: "ISB",
    questionText: "What should the resume's work experience section include?",
    options: [
      "Personal opinions about past employers",
      "Unrelated personal information",
      "Only job titles",
      "Job title, company, dates, and key achievements"
    ],
    correctOption: "D",
    explanation: "Work history sections need complete context (company, dates, metrics) to prove experience."
  },
  {
    examId: "ISB",
    questionText: "When negotiating salary, it's best to:",
    options: [
      "Avoid any research and accept the first offer blindly",
      "Research market rates and communicate your value confidently",
      "Refuse to discuss salary at all",
      "Demand an unreasonable amount without justification"
    ],
    correctOption: "B",
    explanation: "Validating your salary range with market data helps support negotiation discussions."
  },
  {
    examId: "ISB",
    questionText: "A thank-you email after an interview should be sent:",
    options: [
      "A month later",
      "Only if you didn't get the job",
      "Within 24 hours of the interview",
      "It's not necessary to send one"
    ],
    correctOption: "C",
    explanation: "Sending a prompt thank-you email shows professionalism and gratitude for the opportunity."
  },

  // ==================== TOPIC 6: EMOTIONAL INTELLIGENCE AT WORKPLACE (EIW) ====================
  {
    examId: "EIW",
    questionText: "Emotional Intelligence (EQ) primarily refers to:",
    options: [
      "Technical knowledge",
      "IQ test scores",
      "The ability to recognize, understand, and manage emotions in yourself and others",
      "Physical strength"
    ],
    correctOption: "C",
    explanation: "EQ represents the capability to handle self and group emotions constructively."
  },
  {
    examId: "EIW",
    questionText: "Which of these is a core component of EQ?",
    options: [
      "Memorization",
      "Self-awareness",
      "Typing speed",
      "Coding ability"
    ],
    correctOption: "B",
    explanation: "Self-awareness is the foundation of emotional intelligence, allowing you to recognize your own emotional triggers."
  },
  {
    examId: "EIW",
    questionText: "Empathy in the workplace means:",
    options: [
      "Avoiding emotional topics",
      "Ignoring others' feelings",
      "Agreeing with everyone",
      "Understanding and being sensitive to others' perspectives and feelings"
    ],
    correctOption: "D",
    explanation: "Empathy lets you understand the motivations and perspectives of coworkers."
  },
  {
    examId: "EIW",
    questionText: "Self-regulation refers to:",
    options: [
      "Managing and controlling your emotional reactions appropriately",
      "Letting emotions control your decisions",
      "Reacting impulsively to every situation",
      "Suppressing all emotions permanently"
    ],
    correctOption: "A",
    explanation: "Self-regulation helps you control initial reactions, preventing emotional escalation during stress."
  },
  {
    examId: "EIW",
    questionText: "High EQ at work typically leads to:",
    options: [
      "More workplace conflicts",
      "Better relationships and improved collaboration",
      "Reduced teamwork",
      "Increased miscommunication"
    ],
    correctOption: "B",
    explanation: "High EQ helps teams collaborate smoothly and navigate differences productively."
  },
  {
    examId: "EIW",
    questionText: "Which is an example of poor emotional regulation?",
    options: [
      "Reflecting on a mistake constructively",
      "Yelling at a colleague during a disagreement",
      "Asking for feedback calmly",
      "Taking a moment to calm down before responding angrily"
    ],
    correctOption: "B",
    explanation: "Yelling displays poor self-regulation, introducing personal conflict into team discussions."
  },
  {
    examId: "EIW",
    questionText: "Social skills, as part of EQ, involve:",
    options: [
      "Avoiding all social interaction",
      "Working only independently",
      "Managing relationships and building rapport effectively",
      "Ignoring team dynamics"
    ],
    correctOption: "C",
    explanation: "Social skills help you collaborate, lead teams, and build strong relationship networks."
  },
  {
    examId: "EIW",
    questionText: "Self-awareness in the workplace means:",
    options: [
      "Being unaware of your own strengths and weaknesses",
      "Recognizing your own emotions and how they affect your behavior",
      "Avoiding self-reflection",
      "Focusing only on others' emotions"
    ],
    correctOption: "B",
    explanation: "Knowing your emotional limits helps you control behaviors under pressure."
  },
  {
    examId: "EIW",
    questionText: "Motivation, as an EQ component, refers to:",
    options: [
      "Working only when supervised",
      "An internal drive to achieve goals beyond money or status",
      "Avoiding all challenges",
      "External rewards only"
    ],
    correctOption: "B",
    explanation: "Internal motivation keeps you focused on long-term goals despite challenges."
  },
  {
    examId: "EIW",
    questionText: "How can you improve empathy at work?",
    options: [
      "Avoid listening to colleagues",
      "Actively listen and try to see situations from others' perspectives",
      "Dismiss others' concerns",
      "Focus only on your own viewpoint"
    ],
    correctOption: "B",
    explanation: "Active listening and openness to others' views are key to building empathy."
  },
  {
    examId: "EIW",
    questionText: "Which response shows high EQ when receiving criticism?",
    options: [
      "Ignoring the feedback completely",
      "Becoming defensive immediately",
      "Listening, reflecting, and responding constructively",
      "Arguing back without consideration"
    ],
    correctOption: "C",
    explanation: "Receiving feedback constructively shows self-awareness and a willingness to grow."
  },
  {
    examId: "EIW",
    questionText: "Why is EQ important for leadership?",
    options: [
      "It has no impact on leadership",
      "It only matters in customer service roles",
      "It helps leaders manage relationships and navigate team dynamics effectively",
      "It replaces the need for technical skills"
    ],
    correctOption: "C",
    explanation: "Leaders need high EQ to align teams, motivate members, and navigate organization issues."
  },
  {
    examId: "EIW",
    questionText: "Recognizing a colleague's stress and offering support is an example of:",
    options: [
      "Apathy",
      "Avoidance",
      "Micromanagement",
      "Empathy and emotional awareness"
    ],
    correctOption: "D",
    explanation: "Paying attention to coworkers' feelings helps prevent burnout and support team morale."
  },
  {
    examId: "EIW",
    questionText: "Which behavior indicates low emotional intelligence?",
    options: [
      "Blaming others without self-reflection",
      "Considering others' feelings before acting",
      "Adapting communication style to the listener",
      "Managing stress calmly"
    ],
    correctOption: "A",
    explanation: "Deflecting blame suggests a lack of self-awareness and emotional maturity."
  },
  {
    examId: "EIW",
    questionText: "What is 'emotional contagion' in the workplace?",
    options: [
      "A medical illness",
      "The tendency for emotions to spread between people in a group",
      "A type of conflict resolution technique",
      "A software bug"
    ],
    correctOption: "B",
    explanation: "Tension or positive energy can spread through teams, affecting overall culture."
  },
  {
    examId: "EIW",
    questionText: "Practicing mindfulness can help improve EQ by:",
    options: [
      "Increasing reactive behavior",
      "Eliminating emotions entirely",
      "Reducing focus",
      "Increasing self-awareness and emotional regulation"
    ],
    correctOption: "D",
    explanation: "Mindfulness helps you notice feelings calmly rather than reacting immediately."
  },
  {
    examId: "EIW",
    questionText: "How should you handle a disagreement with a coworker calmly?",
    options: [
      "Avoid the person entirely going forward",
      "Complain to others without addressing them directly",
      "Escalate immediately without discussion",
      "Address the issue respectfully and listen to their perspective"
    ],
    correctOption: "D",
    explanation: "Resolving conflicts directly and respectfully preserves working relationships."
  },
  {
    examId: "EIW",
    questionText: "Which is a benefit of high EQ in customer-facing roles?",
    options: [
      "Reduced ability to handle complaints",
      "Increased customer dissatisfaction",
      "No measurable benefit",
      "Better ability to de-escalate situations and build rapport with customers"
    ],
    correctOption: "D",
    explanation: "EQ helps support teams build rapport and handle customer frustrations effectively."
  },
  {
    examId: "EIW",
    questionText: "Self-motivation in a workplace context is best shown by:",
    options: [
      "Needing constant supervision",
      "Waiting for instructions on every task",
      "Taking initiative and persisting through challenges independently",
      "Avoiding all responsibility"
    ],
    correctOption: "C",
    explanation: "Taking initiative shows drive, commitment, and alignment with project goals."
  },
  {
    examId: "EIW",
    questionText: "EQ can be developed through:",
    options: [
      "Avoiding feedback",
      "Practice, self-reflection, and feedback over time",
      "It is entirely fixed and cannot improve",
      "Ignoring emotional triggers"
    ],
    correctOption: "B",
    explanation: "You can build EQ over time through self-reflection and incorporating feedback."
  },

  // ==================== TOPIC 7: CONFLICT RESOLUTION & NEGOTIATION (CRN) ====================
  {
    examId: "CRN",
    questionText: "The first step in resolving a workplace conflict is to:",
    options: [
      "Assign blame immediately",
      "Escalate to HR without discussion",
      "Understand each party's perspective and the root cause",
      "Avoid the issue completely"
    ],
    correctOption: "C",
    explanation: "Conflict resolution begins by identifying the root problem and listening to both perspectives."
  },
  {
    examId: "CRN",
    questionText: "A 'win-win' negotiation outcome means:",
    options: [
      "Both parties feel their key interests are satisfied",
      "One party gains at the other's total expense",
      "Negotiation fails entirely",
      "Only the stronger party benefits"
    ],
    correctOption: "A",
    explanation: "Win-win outcomes resolve conflicts by finding solutions that satisfy both parties."
  },
  {
    examId: "CRN",
    questionText: "Active listening during conflict resolution helps by:",
    options: [
      "Avoiding the actual issue",
      "Creating more confusion",
      "Prolonging the disagreement unnecessarily",
      "Allowing both sides to feel heard and understood"
    ],
    correctOption: "D",
    explanation: "Listening carefully lowers defense barriers and helps uncover the core issues of the conflict."
  },
  {
    examId: "CRN",
    questionText: "Which conflict resolution style involves both parties giving up something to reach an agreement?",
    options: [
      "Compromising",
      "Accommodating",
      "Competing",
      "Avoiding"
    ],
    correctOption: "A",
    explanation: "Compromising resolves conflicts through mutual concessions."
  },
  {
    examId: "CRN",
    questionText: "BATNA in negotiation stands for:",
    options: [
      "Balanced Agreement To Negotiate Always",
      "Best Alternative To a Negotiated Agreement",
      "Best Action Toward Negotiation Avoidance",
      "Basic Approach To Negotiation Agreements"
    ],
    correctOption: "B",
    explanation: "BATNA represents your fallback option if negotiations fall through."
  },
  {
    examId: "CRN",
    questionText: "Which behavior escalates conflict rather than resolving it?",
    options: [
      "Seeking common ground",
      "Using accusatory language and personal attacks",
      "Asking clarifying questions",
      "Staying calm and focused on the issue"
    ],
    correctOption: "B",
    explanation: "Personal attacks shift the focus from the problem to individual character, escalating the conflict."
  },
  {
    examId: "CRN",
    questionText: "The 'avoiding' conflict style is most appropriate when:",
    options: [
      "The issue is critical and urgent",
      "The issue is minor or more information is needed before addressing it",
      "You want to win at all costs",
      "Immediate resolution is required"
    ],
    correctOption: "B",
    explanation: "Avoidance is useful for minor issues, letting tempers cool before addressing them."
  },
  {
    examId: "CRN",
    questionText: "Effective negotiation requires preparation that includes:",
    options: [
      "Refusing to compromise on anything",
      "Avoiding any research",
      "Ignoring the other party's interests",
      "Understanding your own and the other party's goals and constraints"
    ],
    correctOption: "D",
    explanation: "Understanding constraints helps you identify areas of overlap for mutual agreement."
  },
  {
    examId: "CRN",
    questionText: "What is 'anchoring' in negotiation?",
    options: [
      "A conflict resolution style",
      "Ending a negotiation abruptly",
      "Setting an initial reference point that influences the rest of the negotiation",
      "Refusing to negotiate"
    ],
    correctOption: "C",
    explanation: "An initial offer anchors the debate, setting the scale for subsequent offers."
  },
  {
    examId: "CRN",
    questionText: "Which is a sign of a healthy conflict resolution process?",
    options: [
      "One party dominating the conversation",
      "Open communication and mutual respect",
      "Avoiding eye contact and discussion",
      "Public confrontation"
    ],
    correctOption: "B",
    explanation: "Healthy resolution requires respectful, direct dialogue about the core issues."
  },
  {
    examId: "CRN",
    questionText: "The 'accommodating' style of conflict resolution means:",
    options: [
      "Refusing to engage at all",
      "Competing aggressively to win",
      "Prioritizing the relationship by yielding to the other party's needs",
      "Prioritizing your own needs over the relationship"
    ],
    correctOption: "C",
    explanation: "Accommodating prioritizes team relationships over achieving personal goals."
  },
  {
    examId: "CRN",
    questionText: "Why is it important to separate the person from the problem in negotiation?",
    options: [
      "It is not important",
      "It avoids resolving the actual issue",
      "It complicates the discussion",
      "It helps focus on the issue rather than personal attacks, preserving the relationship"
    ],
    correctOption: "D",
    explanation: "Separating people from problems prevents personal differences from blocking solutions."
  },
  {
    examId: "CRN",
    questionText: "A mediator's role in conflict resolution is to:",
    options: [
      "Ignore both parties' concerns",
      "Take sides and decide the outcome",
      "Escalate the conflict further",
      "Facilitate communication and help parties reach their own resolution"
    ],
    correctOption: "D",
    explanation: "Mediators act as neutral facilitators, helping parties reach a mutual resolution."
  },
  {
    examId: "CRN",
    questionText: "Which question helps de-escalate a tense conversation?",
    options: [
      "'Whose fault is this?'",
      "'Why are you always like this?'",
      "'Why can't you just agree with me?'",
      "'Can you help me understand your perspective?'"
    ],
    correctOption: "D",
    explanation: "Asking for clarify signals openness, helping de-escalate defensive arguments."
  },
  {
    examId: "CRN",
    questionText: "In negotiation, 'interests' differ from 'positions' because interests refer to:",
    options: [
      "The underlying needs and motivations behind a demand",
      "Final agreements only",
      "The stated demand",
      "Irrelevant details"
    ],
    correctOption: "A",
    explanation: "Positions are stated demands, whereas interests are the core needs driving those demands."
  },
  {
    examId: "CRN",
    questionText: "Which is an example of constructive conflict resolution?",
    options: [
      "Spreading the issue to other team members",
      "Focusing on facts and seeking a mutually acceptable solution",
      "Ignoring the conflict indefinitely",
      "Yelling to assert dominance"
    ],
    correctOption: "B",
    explanation: "Focusing objectively on facts keeps the discussion professional and goal-oriented."
  },
  {
    examId: "CRN",
    questionText: "Why is timing important in addressing conflict?",
    options: [
      "Addressing issues calmly, at an appropriate time, leads to better outcomes",
      "Timing has no effect on resolution",
      "Conflicts should always be addressed immediately regardless of emotions",
      "Conflicts should be delayed indefinitely"
    ],
    correctOption: "A",
    explanation: "Allowing tempers to cool before discussing issues helps prevent defensive arguments."
  },
  {
    examId: "CRN",
    questionText: "What does 'competing' conflict style typically prioritize?",
    options: [
      "Mutual compromise",
      "Winning the outcome, even at the expense of the relationship",
      "Avoiding the issue",
      "The relationship over the outcome"
    ],
    correctOption: "B",
    explanation: "Competing aims to win the immediate issue, regardless of its impact on work relationships."
  },
  {
    examId: "CRN",
    questionText: "A key negotiation skill is:",
    options: [
      "Refusing to listen to the other party",
      "Making unrealistic demands only",
      "Avoiding preparation",
      "Asking questions to understand the other party's needs"
    ],
    correctOption: "D",
    explanation: "Asking questions help you find areas of shared value to reach a mutual agreement."
  },
  {
    examId: "CRN",
    questionText: "After resolving a conflict, it's important to:",
    options: [
      "Avoid checking in again",
      "Revisit the conflict unnecessarily",
      "Follow up to ensure the resolution is working effectively",
      "Forget the agreement immediately"
    ],
    correctOption: "C",
    explanation: "Following up ensures that the agreed solution continues to work for both parties."
  },

  // ==================== TOPIC 8: PUBLIC SPEAKING & PRESENTATION SKILLS (PSP) ====================
  {
    examId: "PSP",
    questionText: "The most effective way to begin a presentation is to:",
    options: [
      "Apologize for being nervous",
      "Start with unrelated small talk",
      "Read the agenda word for word",
      "Open with a hook, such as a question, story, or surprising fact"
    ],
    correctOption: "D",
    explanation: "A strong hook grabs audience attention and sets a clear focus for the presentation."
  },
  {
    examId: "PSP",
    questionText: "What is the recommended way to handle stage fright?",
    options: [
      "Avoid all preparation",
      "Practice thoroughly and use breathing techniques to manage nerves",
      "Avoid eye contact with the audience entirely",
      "Memorize the speech word for word with no flexibility"
    ],
    correctOption: "B",
    explanation: "Preparation and controlled breathing help lower physical stress during public speaking."
  },
  {
    examId: "PSP",
    questionText: "Eye contact during a presentation helps to:",
    options: [
      "Make the speaker seem nervous",
      "Build connection and engagement with the audience",
      "Has no real impact",
      "Distract the audience"
    ],
    correctOption: "B",
    explanation: "Making eye contact with individuals makes the presentation feel like a direct dialogue."
  },
  {
    examId: "PSP",
    questionText: "Which is a good practice for using presentation slides?",
    options: [
      "Filling them with dense text",
      "Reading every word off the slide",
      "Keeping them visual and concise to support, not replace, your speech",
      "Avoiding slides entirely for all topics"
    ],
    correctOption: "C",
    explanation: "Visual slides keep the audience focused on the speaker rather than reading text."
  },
  {
    examId: "PSP",
    questionText: "Vocal variety in public speaking refers to:",
    options: [
      "Varying pitch, pace, and volume to maintain audience interest",
      "Speaking as fast as possible",
      "Whispering throughout the speech",
      "Speaking in a monotone voice"
    ],
    correctOption: "A",
    explanation: "Changing your tone and pacing helps emphasize key points and prevents a monotone delivery."
  },
  {
    examId: "PSP",
    questionText: "What should you do if you lose your train of thought while speaking?",
    options: [
      "Speak faster to compensate",
      "Apologize repeatedly and leave the stage",
      "Panic and stop talking entirely",
      "Pause calmly, take a breath, and continue from where you can"
    ],
    correctOption: "D",
    explanation: "A brief pause reads as deliberate, letting you collect your thoughts calmly."
  },
  {
    examId: "PSP",
    questionText: "The purpose of rehearsing a presentation is to:",
    options: [
      "Waste preparation time",
      "Memorize it word-for-word without flexibility",
      "Avoid practicing the actual content",
      "Build familiarity with content and improve delivery confidence"
    ],
    correctOption: "D",
    explanation: "Rehearsing helps you check timing and refine the flow of your transitions."
  },
  {
    examId: "PSP",
    questionText: "Which body language signals confidence during a presentation?",
    options: [
      "Avoiding all movement",
      "Slouching and crossed arms",
      "Constantly looking at notes",
      "Open posture and purposeful gestures"
    ],
    correctOption: "D",
    explanation: "Open posture and natural gestures help emphasize points and project confidence."
  },
  {
    examId: "PSP",
    questionText: "When presenting data, it's best to:",
    options: [
      "Avoid showing any data",
      "Show raw numbers without context",
      "Use clear visuals like charts and simplify key takeaways",
      "Read every statistic aloud in detail"
    ],
    correctOption: "C",
    explanation: "Visual charts help simplify data, allowing the audience to understand key trends quickly."
  },
  {
    examId: "PSP",
    questionText: "How should you handle a difficult question from the audience?",
    options: [
      "Listen fully, acknowledge it, and respond thoughtfully",
      "Argue with the audience member",
      "Dismiss it immediately",
      "Avoid answering and change the topic"
    ],
    correctOption: "A",
    explanation: "Listening carefully and answering respectfully helps you manage disagreements professionally."
  },
  {
    examId: "PSP",
    questionText: "What is the benefit of knowing your audience before a presentation?",
    options: [
      "It eliminates the need for preparation",
      "It helps tailor content and tone to their needs and expectations",
      "It only matters for large audiences",
      "It has no real benefit"
    ],
    correctOption: "B",
    explanation: "Understanding your audience helps you build presentations that address their interests."
  },
  {
    examId: "PSP",
    questionText: "The 'rule of three' in public speaking refers to:",
    options: [
      "Using three slides only",
      "Grouping key points into sets of three for better retention",
      "Practicing three times before presenting",
      "Speaking for exactly three minutes"
    ],
    correctOption: "B",
    explanation: "Information structured in groups of three is naturally easier to remember."
  },
  {
    examId: "PSP",
    questionText: "Filler words like 'um' and 'like' should be:",
    options: [
      "Ignored entirely as they don't matter",
      "Required in every sentence",
      "Minimized through practice and awareness",
      "Used frequently for emphasis"
    ],
    correctOption: "C",
    explanation: "Replacing filler words with silent pauses improves clarity and presentation flow."
  },
  {
    examId: "PSP",
    questionText: "What is the purpose of a strong conclusion in a presentation?",
    options: [
      "To introduce new, unrelated information",
      "To list every detail covered again",
      "To apologize for the presentation's length",
      "To reinforce key points and leave a lasting impression"
    ],
    correctOption: "D",
    explanation: "A strong conclusion reinforces your main message, leaving a clear final takeaway."
  },
  {
    examId: "PSP",
    questionText: "Which is an effective way to engage a virtual audience?",
    options: [
      "Speak in a monotone voice",
      "Avoid checking for engagement",
      "Use interactive elements like polls and direct questions",
      "Keep your camera off"
    ],
    correctOption: "C",
    explanation: "Polls and chat prompts help maintain focus and interaction in virtual meetings."
  },
  {
    examId: "PSP",
    questionText: "Why is pacing important in delivery?",
    options: [
      "Speaking too fast or too slow can affect audience comprehension",
      "Pacing has no effect on understanding",
      "Faster is always better",
      "Slower is always better regardless of content"
    ],
    correctOption: "A",
    explanation: "Adjusting your pacing helps keep the audience engaged and ensures clarity."
  },
  {
    examId: "PSP",
    questionText: "What should you do before stepping on stage to present?",
    options: [
      "Ignore the audience's needs",
      "Memorize a script with no understanding of content",
      "Review key points, check materials, and calm your nerves",
      "Avoid any preparation or review"
    ],
    correctOption: "C",
    explanation: "A final logistics and tech run prevents errors and helps build confidence."
  },
  {
    examId: "PSP",
    questionText: "Storytelling in presentations is effective because it:",
    options: [
      "Wastes valuable presentation time",
      "Makes content relatable and memorable for the audience",
      "Confuses the audience",
      "Distracts from the main message"
    ],
    correctOption: "B",
    explanation: "Stories create an emotional hook, helping audiences connect with and remember key points."
  },
  {
    examId: "PSP",
    questionText: "How should you use notes during a presentation?",
    options: [
      "Read them word-for-word without looking up",
      "Hold them up to block your face",
      "Avoid having any notes regardless of complexity",
      "Use them as brief prompts while maintaining audience engagement"
    ],
    correctOption: "D",
    explanation: "Using keywords as prompts prevents you from reading text, allowing better eye contact."
  },
  {
    examId: "PSP",
    questionText: "What is the goal of audience analysis before a presentation?",
    options: [
      "To understand their expectations, knowledge level, and interests",
      "To ignore audience needs",
      "To create a generic presentation only",
      "To avoid tailoring your message"
    ],
    correctOption: "A",
    explanation: "Understanding your audience helps you structure content that aligns with their needs."
  },

  // ==================== TOPIC 9: CUSTOMER SERVICE EXCELLENCE (CSE) ====================
  {
    examId: "CSE",
    questionText: "The foundation of excellent customer service is:",
    options: [
      "Following scripts rigidly without listening",
      "Avoiding direct interaction with customers",
      "Prioritizing speed over quality always",
      "Understanding and addressing the customer's needs effectively"
    ],
    correctOption: "D",
    explanation: "Customer service exists to solve client issues quickly and support overall customer success."
  },
  {
    examId: "CSE",
    questionText: "When a customer is upset, the first step should be to:",
    options: [
      "Listen actively and acknowledge their frustration",
      "Ignore their concern",
      "Transfer them immediately without explanation",
      "Argue to defend the company"
    ],
    correctOption: "A",
    explanation: "Listening calmly and acknowledging their concern helps diffuse frustration, allowing resolution."
  },
  {
    examId: "CSE",
    questionText: "What does 'first call resolution' mean?",
    options: [
      "Escalating every issue automatically",
      "Avoiding resolution",
      "Taking multiple calls to resolve one issue",
      "Resolving a customer's issue on their first contact, without follow-ups"
    ],
    correctOption: "D",
    explanation: "First-contact resolution minimizes friction, saving time for both customers and support teams."
  },
  {
    examId: "CSE",
    questionText: "Empathy in customer service involves:",
    options: [
      "Genuinely understanding and validating the customer's situation",
      "Dismissing the customer's feelings",
      "Rushing through the interaction",
      "Following a script without personal connection"
    ],
    correctOption: "A",
    explanation: "Empathy builds trust by showing customers you genuinely care about their issue."
  },
  {
    examId: "CSE",
    questionText: "Which is an example of going 'above and beyond' in customer service?",
    options: [
      "Ignoring customer feedback",
      "Proactively offering helpful solutions beyond the basic request",
      "Doing the bare minimum required",
      "Avoiding follow-up after resolving an issue"
    ],
    correctOption: "B",
    explanation: "Proactive support exceeds base expectations, improving customer loyalty."
  },
  {
    examId: "CSE",
    questionText: "How should a service representative handle a complaint they cannot immediately resolve?",
    options: [
      "Promise something they can't deliver",
      "Avoid responding to the customer",
      "Blame another department without explanation",
      "Set realistic expectations and follow up as promised"
    ],
    correctOption: "D",
    explanation: "Setting clear follow-up expectations builds trust even when resolutions take time."
  },
  {
    examId: "CSE",
    questionText: "What is the value of customer feedback?",
    options: [
      "It has no real value",
      "It helps identify areas for improvement in products and service",
      "It should always be ignored",
      "It only matters for negative reviews"
    ],
    correctOption: "B",
    explanation: "Direct user feedback helps companies refine product updates and support operations."
  },
  {
    examId: "CSE",
    questionText: "Which tone is most effective in customer service interactions?",
    options: [
      "Warm, patient, and professional",
      "Dismissive and rushed",
      "Indifferent and robotic",
      "Overly casual and unprofessional"
    ],
    correctOption: "A",
    explanation: "Patience and professional warmth help calm customers and improve relationship retention."
  },
  {
    examId: "CSE",
    questionText: "What does 'customer-centric' mean?",
    options: [
      "Prioritizing internal processes over customer needs",
      "Avoiding customer input entirely",
      "Focusing solely on cost-cutting",
      "Placing the customer's needs and experience at the center of decisions"
    ],
    correctOption: "D",
    explanation: "Customer-centric companies design all workflows around improving the customer experience."
  },
  {
    examId: "CSE",
    questionText: "When handling multiple customer requests, prioritization should be based on:",
    options: [
      "Urgency, impact, and customer needs",
      "Personal preference only",
      "Random order",
      "Ignoring less vocal customers"
    ],
    correctOption: "A",
    explanation: "Prioritizing by urgency and impact resolves high-priority issues quickly and efficiently."
  },
  {
    examId: "CSE",
    questionText: "A key skill for handling difficult customers is:",
    options: [
      "Remaining calm and patient while addressing concerns",
      "Matching their frustration with anger",
      "Becoming defensive",
      "Avoiding the interaction"
    ],
    correctOption: "A",
    explanation: "Remaining calm keeps the focus on solving the issue rather than escalating tensions."
  },
  {
    examId: "CSE",
    questionText: "What should you do if you don't know the answer to a customer's question?",
    options: [
      "End the conversation",
      "Guess and provide incorrect information",
      "Ignore the question",
      "Be honest, and find the correct answer or escalate appropriately"
    ],
    correctOption: "D",
    explanation: "Confirming facts before answering keeps data accurate and builds customer trust."
  },
  {
    examId: "CSE",
    questionText: "Which is an example of proactive customer service?",
    options: [
      "Anticipating customer needs and addressing them before issues arise",
      "Avoiding communication with customers",
      "Waiting for complaints before acting",
      "Reacting only after a complaint is filed"
    ],
    correctOption: "A",
    explanation: "Proactive warnings about disruptions build goodwill and reduce incoming support tickets."
  },
  {
    examId: "CSE",
    questionText: "Why is consistency important in customer service?",
    options: [
      "It has no impact on customer trust",
      "Consistency limits flexibility unnecessarily",
      "It builds reliability and trust with customers over time",
      "It only matters for large companies"
    ],
    correctOption: "C",
    explanation: "Providing consistent support quality across channels builds customer trust."
  },
  {
    examId: "CSE",
    questionText: "In customer service, 'active empathy' means:",
    options: [
      "Writing a long email apology",
      "Transferring the call to a manager immediately",
      "Listening, reflecting back the customer's feeling, and taking positive action",
      "Agreeing to give refunds for every request"
    ],
    correctOption: "C",
    explanation: "Active empathy combines emotional validation with actual steps to resolve the customer's problem."
  },
  {
    examId: "CSE",
    questionText: "When dealing with a complex technical issue you cannot solve, you should say:",
    options: [
      "This is not my job.",
      "I don't know, please call back tomorrow.",
      "Let me check with our technical team and I will get back to you by [Time].",
      "Please email support."
    ],
    correctOption: "C",
    explanation: "Stating your resolution plan clearly keeps the customer informed and reduces frustration."
  },
  {
    examId: "CSE",
    questionText: "What is the primary focus of Customer Retention?",
    options: [
      "Increasing prices to boost revenue",
      "Finding new customers through advertisements",
      "Keeping existing customers satisfied to continue business with you",
      "Closing down low-performing accounts"
    ],
    correctOption: "C",
    explanation: "Retention strategies focus on keeping existing customers happy, which is more cost-effective than acquisition."
  },
  {
    examId: "CSE",
    questionText: "Which channel is most appropriate for a quick status update to a client?",
    options: [
      "In-person meeting",
      "2-hour conference call",
      "Formal letter",
      "Concise email or message"
    ],
    correctOption: "D",
    explanation: "Brief updates are best handled through email or messages to respect clients' schedules."
  },
  {
    examId: "CSE",
    questionText: "What is Customer Lifetime Value (CLV)?",
    options: [
      "The cost to acquire a single customer",
      "The customer's credit score",
      "The total net profit a business expects to earn from a customer relationship",
      "The price of the most expensive product"
    ],
    correctOption: "C",
    explanation: "CLV estimates the long-term value of a customer relationship, helping guide acquisition spend."
  },
  {
    examId: "CSE",
    questionText: "What is the primary value of a Net Promoter Score (NPS)?",
    options: [
      "It measures customer loyalty and willingness to recommend your service",
      "It calculates total monthly revenue",
      "It track inventory cycles",
      "It monitors server uptime statistics"
    ],
    correctOption: "A",
    explanation: "NPS is a key metric that tracks customer loyalty and likelihood of brand referral."
  },

  // ==================== TOPIC 10: CRITICAL THINKING & PROBLEM SOLVING (CPS) ====================
  {
    examId: "CPS",
    questionText: "Critical thinking involves all of the following EXCEPT:",
    options: [
      "Evaluating evidence objectively",
      "Questioning assumptions",
      "Analyzing different points of view",
      "Accepting information blindly from authority figures"
    ],
    correctOption: "D",
    explanation: "Critical thinking requires evaluating arguments objectively rather than accepting claims blindly."
  },
  {
    examId: "CPS",
    questionText: "The first step in problem solving is to:",
    options: [
      "Define and analyze the root problem clearly",
      "Assign blame to team members",
      "Brainstorm solutions",
      "Implement a quick fix"
    ],
    correctOption: "A",
    explanation: "Defining the problem clearly prevents wasting time on the wrong issues."
  },
  {
    examId: "CPS",
    questionText: "What is 'confirmation bias'?",
    options: [
      "The tendency to look for and favor information that confirms your pre-existing beliefs",
      "Seeking diverse opinions to solve a conflict",
      "Confirming appointment times",
      "Testing solutions rigorously"
    ],
    correctOption: "A",
    explanation: "Confirmation bias leads us to favor information that supports our beliefs while ignoring conflicting facts."
  },
  {
    examId: "CPS",
    questionText: "A 'root cause analysis' is used to:",
    options: [
      "Estimate the project cost",
      "Assign work to employees",
      "Identify the primary source of a problem, rather than just its symptoms",
      "Make a final budget presentation"
    ],
    correctOption: "C",
    explanation: "Addressing the root cause prevents issues from recurring, unlike surface-level fixes."
  },
  {
    examId: "CPS",
    questionText: "Which of these is a benefit of cognitive diversity in problem-solving groups?",
    options: [
      "Unified thinking style",
      "Faster decisions with no debate",
      "Less discussion",
      "Multiple perspectives leading to more robust and creative solutions"
    ],
    correctOption: "D",
    explanation: "Different viewpoints help teams identify blind spots and build more creative solutions."
  },
  {
    examId: "CPS",
    questionText: "When evaluating a source of information, critical thinkers check:",
    options: [
      "Only the date",
      "Only if it supports their idea",
      "The font style",
      "The credibility, reliability, and potential bias of the source"
    ],
    correctOption: "D",
    explanation: "Checking source credibility prevents using biased or incorrect data."
  },
  {
    examId: "CPS",
    questionText: "What is 'deductive reasoning'?",
    options: [
      "Reasoning from general premises to a specific, logical conclusion",
      "Rejecting all arguments",
      "Reasoning from specific cases to a general rule",
      "Making guesses based on emotions"
    ],
    correctOption: "A",
    explanation: "Deductive reasoning starts with general rules to reach a specific, logically certain conclusion."
  },
  {
    examId: "CPS",
    questionText: "Brainstorming sessions are most effective when:",
    options: [
      "Focus is on generating a high quantity of ideas without immediate judgment",
      "Only the team leader speaks",
      "The first idea is chosen immediately",
      "Criticism of ideas is encouraged immediately"
    ],
    correctOption: "A",
    explanation: "Deferring judgment during brainstorming encourages creative ideas and keeps the focus open."
  },
  {
    examId: "CPS",
    questionText: "What does 'making an assumption' mean?",
    options: [
      "Validating facts",
      "Taking something for granted without proof",
      "Drawing a diagram",
      "Solving a math problem"
    ],
    correctOption: "B",
    explanation: "Assumptions are beliefs accepted as true without direct evidence, which can lead to errors."
  },
  {
    examId: "CPS",
    questionText: "Which is a feature of 'lateral thinking'?",
    options: [
      "Solving problems using standard, direct logic only",
      "Solving problems through an indirect, creative, and non-linear approach",
      "Avoiding problem solving entirely",
      "Working on horizontal lines"
    ],
    correctOption: "B",
    explanation: "Lateral thinking uses creative, non-linear approaches to find unique solutions."
  },
  {
    examId: "CPS",
    questionText: "What is 'correlation does not imply causation'?",
    options: [
      "Statistics are always false",
      "Just because two trends move together doesn't mean one causes the other",
      "Data should not be plotted",
      "Two events happening together means one caused the other"
    ],
    correctOption: "B",
    explanation: "Two events may be related by chance or a third factor, without one causing the other."
  },
  {
    examId: "CPS",
    questionText: "Which of these represents a 'straw man' argument?",
    options: [
      "A type of budget planning",
      "An argument supported by facts",
      "Agreeing to compromise",
      "Misrepresenting someone's argument to make it easier to attack or refute"
    ],
    correctOption: "D",
    explanation: "A straw man misrepresents an opponent's view to make it easier to refute."
  },
  {
    examId: "CPS",
    questionText: "In critical thinking, 'objectivity' means:",
    options: [
      "Making judgments based on facts and evidence, free from personal bias",
      "Opposing every point of view",
      "Being influenced by personal feelings and opinions",
      "Designing a product object"
    ],
    correctOption: "A",
    explanation: "Objectivity requires setting aside personal bias to evaluate evidence fairly."
  },
  {
    examId: "CPS",
    questionText: "Which tool is commonly used to visualize cause-and-effect relationships?",
    options: [
      "Calendar",
      "Fishbone (Ishikawa) Diagram",
      "Bar Chart",
      "Gantt Chart"
    ],
    correctOption: "B",
    explanation: "Fishbone diagrams map cause-and-effect categories, helping you trace root issues."
  },
  {
    examId: "CPS",
    questionText: "What is the sunk cost fallacy?",
    options: [
      "Continuing to invest in a failing project just because you have already spent money/time on it",
      "Declaring bankruptcy",
      "Investing in new projects",
      "Cutting costs early"
    ],
    correctOption: "A",
    explanation: "The sunk cost fallacy leads people to keep investing in a failing plan just because of past spend."
  },
  {
    examId: "CPS",
    questionText: "Logical fallacies are:",
    options: [
      "Historical facts",
      "Flaws in reasoning that weaken or invalidate an argument",
      "Correct mathematical steps",
      "Programming bugs"
    ],
    correctOption: "B",
    explanation: "Logical fallacies are errors in reasoning that undermine the validity of an argument."
  },
  {
    examId: "CPS",
    questionText: "A critical thinker responds to a complex issue by:",
    options: [
      "Ignoring the issue",
      "Asking questions, gathering facts, and evaluating options before deciding",
      "Trusting their first instinct blindly",
      "Jump to conclusions immediately"
    ],
    correctOption: "B",
    explanation: "Evaluating facts and alternatives helps ensure you make reasoned decisions."
  },
  {
    examId: "CPS",
    questionText: "What is 'intellectual humility'?",
    options: [
      "Claiming to know everything",
      "Recognizing the limits of your own knowledge and being open to new perspectives",
      "Lacking confidence in your skills",
      "Being quiet in meetings"
    ],
    correctOption: "B",
    explanation: "Humility involves recognizing the limits of your own knowledge and staying open to new ideas."
  },
  {
    examId: "CPS",
    questionText: "Which step comes after selecting a solution in the problem-solving cycle?",
    options: [
      "Implementing and monitoring the solution",
      "Giving up",
      "Defining the problem again",
      "Brainstorming alternative problems"
    ],
    correctOption: "A",
    explanation: "Implementation must be followed by monitoring to ensure the solution actually works."
  },
  {
    examId: "CPS",
    questionText: "A '5 Whys' technique is used to:",
    options: [
      "Ask customers why they bought a product",
      "Interrogate team members",
      "Repeatedly ask 'why' to drill down to the root cause of a problem",
      "List five project deadlines"
    ],
    correctOption: "C",
    explanation: "Asking 'why' repeatedly helps you peel away surface symptoms to find the root cause."
  }
];

export async function seedExamsIfEmpty() {
  try {
    const db = await getDb();
    
    // Check if exams are already seeded
    const examCount = await db.collection("exams").countDocuments({});
    
    // If the count is different from our new list of 10 exams, clear and re-seed
    if (examCount > 0 && examCount !== defaultExams.length) {
      console.log(`[SEED] Upgrading exams database from ${examCount} to ${defaultExams.length} items. Dropping collections.`);
      await db.collection("exams").deleteMany({});
      await db.collection("exam_questions").deleteMany({});
    } else if (examCount === defaultExams.length) {
      console.log(`[SEED] Exams database is already seeded and updated (count: ${examCount}). Skipping.`);
      return;
    }

    console.log("[SEED] Seeding Soft Skills Certification exams and questions...");
    
    // Seed exams
    await db.collection("exams").insertMany(defaultExams);
    console.log(`[SEED] Successfully seeded ${defaultExams.length} exams.`);

    // Seed questions
    await db.collection("exam_questions").insertMany(defaultQuestions);
    console.log(`[SEED] Successfully seeded ${defaultQuestions.length} exam questions.`);
    
  } catch (error) {
    console.error("[SEED ERROR] Failed to seed database:", error);
  }
}
