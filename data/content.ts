import type { Milestone, Partner, Person, Project, ResearchArea, WorkflowStage } from "@/lib/types";

/* -------------------------------------------------------------------------- */
/*  Site identity and canonical contact details                                */
/* -------------------------------------------------------------------------- */

export const site = {
  name: "UIU Rescue Rover Team",
  short: "URRT",
  legal: "United International University",
  url: "https://rescuerover.uiu.ac.bd",
  tagline: "Rescue robotics research at United International University, Dhaka.",
  description:
    "URRT is a student engineering team at United International University building tracked rescue rovers for urban search and rescue research.",
  email: "rescuerover@cair.uiu.ac.bd",
  phone: "+880 1909 356 346",
  phoneHref: "+8801909356346",
  lab: "CAIR Lab, 4th Floor, Academic Building",
  address: {
    org: "United International University",
    street: "United City, Madani Avenue",
    locality: "Badda, Dhaka 1212",
    country: "Bangladesh",
  },
  hours: "Sunday–Thursday, 08:00–20:00",
  hoursClosed: "Friday and Saturday closed",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/uiurescuerover" },
    { label: "Facebook", href: "https://www.facebook.com/share/1FaSe57Vd5/" },
  ],
  affiliations: [
    { name: "United International University", href: "https://www.uiu.ac.bd/" },
    { name: "Center for Artificial Intelligence Research", href: "https://www.uiu.ac.bd/cair/" },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                 */
/* -------------------------------------------------------------------------- */

export const navigation = [
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/team", label: "Team" },
  { href: "/journey", label: "Journey" },
  { href: "/partners", label: "Partners" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/* -------------------------------------------------------------------------- */
/*  People                                                                     */
/* -------------------------------------------------------------------------- */

export const advisors: Person[] = [
  {
    name: "Prof. Dr. Md. Abul Kashem Mia",
    role: "Chief Advisor",
    affiliation: "Vice-Chancellor, United International University",
    email: "kashem@uiu.ac.bd",
    focus: ["Algorithm theory", "Graph theory and algorithms", "Computational complexity", "Bioinformatics"],
    image: "abul-kashem-VC-UIU",
    source: "https://rescuerover.uiu.ac.bd/Advisors.html",
  },
  {
    name: "Prof. Dr. Hasan Sarwar",
    role: "Advisor",
    affiliation: "Professor, United International University",
    email: "sarwar@cse.uiu.ac.bd",
    focus: ["Software engineering", "Health engineering", "Educational data mining", "Bangla OCR", "Blockchain"],
    image: "Dr.-Hasan-Sarwar",
    source: "https://rescuerover.uiu.ac.bd/Advisors.html",
  },
  {
    name: "Md. Abid Hossain",
    role: "Director",
    affiliation: "Lecturer, United International University",
    email: "abid@cse.uiu.ac.bd",
    focus: ["Robotics and electrical systems", "UAVs", "Design and manufacturing", "Machine learning"],
    image: "abid",
    source: "https://rescuerover.uiu.ac.bd/Advisors.html",
  },
];

/**
 * 2026 roster. Names and sub-team assignments are transcribed exactly from
 * member.html. No individual role beyond sub-team is stated on the source site,
 * so none is invented here.
 */
export const members: Person[] = [
  { name: "Dewan Rois Bin Omar", role: "Member", subteam: "Electrical", image: "rois", source: "member.html" },
  { name: "Mahir Faisal Nafis", role: "Member", subteam: "Mechanical", image: "mahir", source: "member.html" },
  { name: "Ahmed Jebail Shoukhin", role: "Member", subteam: "Software & Autonomous", image: "shoukhin", source: "member.html" },
  { name: "Nazmul Hasan Athin", role: "Member", subteam: "Software & Autonomous", image: "athin", source: "member.html" },
  { name: "Md. Yeahyea Hassan Siddique", role: "Member", subteam: "Electrical", image: "yeahyea", source: "member.html" },
  { name: "Mathin Ahmed", role: "Member", subteam: "Software & Autonomous", image: "mathin", source: "member.html" },
  { name: "Nurer Raihan Salmaan", role: "Member", subteam: "Software & Autonomous", image: "salman", source: "member.html" },
  { name: "Adipta Shaha", role: "Member", subteam: "Mechanical", image: "adipta", source: "member.html" },
  { name: "Nazmul Hasan Nayem", role: "Member", subteam: "Mechanical", image: "nazmul", source: "member.html" },
  { name: "Jannatul Haque Usha", role: "Member", subteam: "Electrical", image: "usha", source: "member.html" },
  { name: "Tanjila Akter Simi", role: "Member", subteam: "Software & Autonomous", image: "simi", source: "member.html" },
  { name: "Dayad Muhammad Illin", role: "Member", subteam: "Mechanical", image: "illin", source: "member.html" },
  { name: "Iftiaque Ahmed Auporba", role: "Member", subteam: "Mechanical", image: "ifti", source: "member.html" },
  { name: "Saad Ahmmed Tonmoy", role: "Member", subteam: "Mechanical", image: "saad", source: "member.html" },
  { name: "Sokanto Roy", role: "Member", subteam: "Software & Autonomous", image: "sokanto", source: "member.html" },
];

export const subteams = [
  {
    name: "Mechanical",
    body: "Chassis, drivetrain, flipper articulation and the manipulator. Work spans CAD in SolidWorks and Fusion 360 through to fabrication and field repair.",
  },
  {
    name: "Electrical",
    body: "Power distribution, motor control, PCB design and the embedded layer that connects sensors and actuators to the compute stack.",
  },
  {
    name: "Software & Autonomous",
    body: "Perception, mapping, localisation and navigation, plus the operator interface used to drive and monitor the rover.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Projects                                                                   */
/* -------------------------------------------------------------------------- */

export const projects: Project[] = [
  {
    slug: "aegis",
    name: "AEGIS",
    version: "V2",
    designation: "PROTOTYPE_02 / TRACKED UGV",
    status: "in-development",
    statusLabel: "In development",
    period: "2025 — present",
    summary:
      "A tracked unmanned ground vehicle for urban search and rescue, built around active flippers, a multi-sensor perception stack and a six-degree-of-freedom manipulator.",
    intro:
      "AEGIS is URRT's current platform. It is a tracked Unmanned Ground Vehicle (UGV) designed for Urban Search and Rescue (USAR) environments. The design pairs high-mobility locomotion with active flippers, a multi-sensor perception stack, and a six-degree-of-freedom robotic manipulator for dexterous interaction in confined and hazardous spaces.",
    specs: [
      { key: "Platform", value: "Tracked UGV" },
      { key: "Locomotion", value: "Rubber tracks with active flippers" },
      { key: "Manipulator", value: "6-DOF robotic arm" },
      { key: "Sensors", value: "LiDAR, RGB-D depth camera, IMU" },
      { key: "Architecture", value: "Modular, rapid deployment" },
      { key: "Status", value: "In development" },
    ],
    subsystems: [
      {
        id: "locomotion",
        name: "Locomotion",
        label: "Tracks + flippers",
        summary: "Continuous rubber tracks with articulated front and rear flippers.",
        detail:
          "Continuous rubber tracks with articulated front and rear flippers enable traversal of stairs, rubble piles and extreme terrain profiles found in disaster zones. The flippers are actuated independently, so the operator can raise the nose onto a step or brace the chassis on uneven ground.",
        x: 300,
        y: 400,
      },
      {
        id: "perception",
        name: "Perception",
        label: "LiDAR · depth · IMU",
        summary: "A 360° spatial awareness pipeline for mapping and victim detection.",
        detail:
          "An integrated LiDAR, RGB-D depth cameras and an IMU feed a 360° spatial awareness pipeline used for SLAM-based mapping and victim detection. Depth and inertial data are fused so that mapping survives the vibration and track-slip typical of rubble terrain.",
        x: 520,
        y: 300,
      },
      {
        id: "manipulation",
        name: "Manipulation",
        label: "6-DOF arm",
        summary: "An articulated arm for interacting with the environment.",
        detail:
          "A six-degree-of-freedom articulated arm allows the robot to interact with victims, open doors, move debris and operate equipment in confined hazardous spaces. Six axes give the end effector the orientation freedom needed to approach a handle or a payload from an awkward angle.",
        x: 700,
        y: 200,
      },
    ],
    hero: {
      src: "t1",
      alt: "AEGIS, a tracked rover with orange rubber tracks and a six-degree-of-freedom arm extended upward, photographed on a concrete floor in the robotics workshop.",
      caption: "AEGIS with the manipulator raised, in the CAIR workshop.",
    },
    gallery: [
      {
        src: "t2",
        alt: "AEGIS climbing a plywood step-and-ramp test rig, its front flippers angled upward onto the raised platform.",
        caption: "Flipper articulation on a plywood step rig — the geometry being tested is the stair and rubble case.",
      },
      {
        src: "t1",
        alt: "AEGIS photographed from the front-left, showing the orange tracks, the red battery enclosure and the arm reaching up.",
        caption: "Arm extended. The red enclosure on the chassis is the battery bay.",
      },
      {
        src: "t3",
        alt: "AEGIS viewed from a higher angle on the workshop floor, showing the track layout and the arm folded back over the chassis.",
        caption: "Folded transport posture, with the arm stowed over the chassis.",
      },
    ],
    limitations: [
      "Described here as a design intent and an in-development platform. URRT has not published field-deployment results, and none are claimed on this site.",
      "No measured payload, endurance, stair-height or speed figures exist in the public record, so none are listed. They will be published when the team measures them.",
      "Autonomous navigation is described as an architectural goal. The extent to which it is implemented is not documented publicly.",
    ],
    source: "https://rescuerover.uiu.ac.bd/projects.html",
    verification: "source-only",
  },
  {
    slug: "zugbee-x1",
    name: "Zugbee X1",
    version: "V1",
    designation: "PROTOTYPE_01",
    status: "completed",
    statusLabel: "Completed — Jan 2025",
    period: "2024 — January 2025",
    summary:
      "The team's first rover: a small twin-track platform used to establish the sensor pipeline, drivetrain and software architecture that AEGIS inherits.",
    intro:
      "Zugbee X1 is where the programme started. Completed in January 2025, it established the foundational architecture, sensor integration pipeline and software stack that AEGIS builds upon. It is a deliberately modest machine — a twin-track chassis with a basic end effector and a small sensor set — and its value is as a testbed rather than a finished rescue platform.",
    specs: [
      { key: "Platform", value: "Twin-track chassis" },
      { key: "Completed", value: "January 2025" },
      { key: "Sensors", value: "Camera, ultrasonic rangefinders" },
      { key: "Manipulator", value: "Basic end effector" },
      { key: "Status", value: "Legacy / completed" },
    ],
    subsystems: [
      {
        id: "locomotion",
        name: "Locomotion",
        label: "Twin track",
        summary: "A compact twin-track chassis driven differentially.",
        detail:
          "Two rubber tracks driven independently give skid-steer control. The narrow footprint was chosen for the confined spaces the team expects in USAR work, at the cost of stability on steep side slopes — a trade-off that directly informed the wider, flippered layout of AEGIS.",
        x: 360,
        y: 400,
      },
      {
        id: "perception",
        name: "Perception",
        label: "Camera + ultrasonic",
        summary: "A minimal sensor set for early integration work.",
        detail:
          "A single camera and ultrasonic rangefinders were enough to exercise the full pipeline — capture, transport, display, log — before investing in LiDAR and depth hardware. This is the layer AEGIS replaces.",
        x: 560,
        y: 310,
      },
      {
        id: "manipulation",
        name: "Manipulation",
        label: "Basic end effector",
        summary: "A fixed effector for basic interaction experiments.",
        detail:
          "X1 carried a basic end effector rather than an articulated arm. It was sufficient to test mounting, power routing and control, and it established the requirement for the six-axis arm that AEGIS carries.",
        x: 700,
        y: 250,
      },
    ],
    hero: {
      src: "prototype-x1",
      alt: "The Zugbee X1 prototype, a small twin-track rover with red rubber tracks and a white chassis, on grass with a university building behind it.",
      caption: "Zugbee X1 outside the campus buildings.",
    },
    gallery: [
      {
        src: "prototype-x1-1",
        alt: "Close view of Zugbee X1 on grass, showing the red track pads, white body shell and exposed drive sprockets.",
        caption: "Track and sprocket detail. The chassis is a simple two-track skid-steer layout.",
      },
      {
        src: "prototype-x1-3",
        alt: "Zugbee X1 seen from above on a paved walkway, showing the deck layout and the twin track arrangement.",
        caption: "Deck layout from above.",
      },
    ],
    limitations: [
      "X1 is a completed first prototype, not a rescue-capable platform. It is presented as a learning artefact.",
      "The original site's specification table described a wheeled 4×4 platform. The photographic record shows a twin-track chassis, and the description here follows the photographs.",
    ],
    specNote: "Locomotion described from the prototype photographs in this gallery.",
    source: "https://rescuerover.uiu.ac.bd/projects.html",
    verification: "verified",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/* -------------------------------------------------------------------------- */
/*  Timeline                                                                   */
/* -------------------------------------------------------------------------- */

export const milestones: Milestone[] = [
  {
    date: "September 2024",
    sortKey: "2024-09",
    title: "Team formed",
    description:
      "URRT was established at United International University with the aim of building rescue robotics capability in Bangladesh.",
    state: "done",
    source: "index.html timeline",
  },
  {
    date: "January 2025",
    sortKey: "2025-01",
    title: "Zugbee X1 completed",
    description:
      "The first prototype was finished with basic mobility and a minimal sensor set — the platform that established the team's sensor pipeline and software architecture.",
    state: "done",
    source: "projects.html",
  },
  {
    date: "2025",
    sortKey: "2025-06",
    title: "AEGIS development begins",
    description:
      "Design work moved to a tracked platform with active flippers and a six-degree-of-freedom manipulator, carrying forward the software stack proven on X1.",
    state: "done",
    source: "projects.html",
  },
  {
    date: "March 2026",
    sortKey: "2026-03",
    title: "RoboCup Rescue 2026 qualification material submitted",
    description:
      "The team prepared and published qualification video material for the RoboCup Rescue League 2026 cycle.",
    state: "done",
    source: "video.html",
  },
  {
    date: "June–July 2026",
    sortKey: "2026-07",
    title: "RoboCup 2026, Incheon",
    description:
      "The 2026 RoboCup world championship was held at Songdo Convensia, Incheon, South Korea, from 30 June to 6 July 2026. URRT's participation and results are not published and are not claimed here.",
    state: "unverified",
    source: "robocup.org/events/80",
  },
];

/* -------------------------------------------------------------------------- */
/*  Partners                                                                   */
/* -------------------------------------------------------------------------- */

export const partners: Partner[] = [
  {
    name: "United International University",
    kind: "institutional",
    logo: "uiu-logo",
    href: "https://www.uiu.ac.bd/",
    note: "Academic home. Provides lab space, faculty supervision and institutional backing.",
    verification: "verified",
    source: "index.html",
  },
  {
    name: "Center for Artificial Intelligence Research (CAIR)",
    kind: "institutional",
    logo: "cair-logo",
    href: "https://www.uiu.ac.bd/cair/",
    note: "Hosts the team's lab on the fourth floor of the academic building.",
    verification: "verified",
    source: "contact.html",
  },
  {
    name: "SolidWorks",
    kind: "technology",
    logo: "solidworks-logo",
    href: "https://www.solidworks.com/",
    note: "CAD software used for mechanical design.",
    verification: "source-only",
    source: "index.html partners",
  },
  {
    name: "Dassault Systèmes",
    kind: "technology",
    logo: "Dassauly-systemes-logo",
    href: "https://www.3ds.com/",
    note: "Listed by the team as a research and development partner.",
    verification: "source-only",
    source: "index.html partners",
  },
  {
    name: "Protospace",
    kind: "technology",
    logo: "protospace-logo",
    href: "https://protospacemfg.com/",
    note: "Fabrication partner.",
    verification: "source-only",
    source: "index.html partners",
  },
  {
    name: "DFRobot",
    kind: "technology",
    logo: "DFRobot-logo",
    href: "https://www.dfrobot.com/",
    note: "Hardware and components.",
    verification: "source-only",
    source: "index.html partners",
  },
];

/* -------------------------------------------------------------------------- */
/*  Research                                                                   */
/* -------------------------------------------------------------------------- */

export const researchAreas: ResearchArea[] = [
  {
    index: "01",
    title: "Mobility over rubble",
    question: "How does a tracked platform keep contact with broken, angled ground?",
    body:
      "A rescue robot spends most of its life on surfaces that were never designed to be driven on: stair edges, collapsed slabs, loose fill. URRT's approach is articulated flippers on a continuous track — geometry that can be reconfigured per obstacle rather than a fixed wheelbase. The work is currently empirical: build the obstacle, drive it, watch where traction is lost.",
    methods: ["Flipper geometry and articulation range", "Track tension and slip on loose fill", "Static and dynamic stability on side slopes"],
  },
  {
    index: "02",
    title: "Sensing in degraded conditions",
    question: "What survives dust, vibration and the absence of GPS?",
    body:
      "Indoor USAR environments are GPS-denied, cluttered and often visually degraded. URRT's perception stack combines LiDAR for geometry, RGB-D cameras for dense local structure and an IMU for motion priors, on the assumption that no single sensor is dependable on its own.",
    methods: ["LiDAR–depth–inertial fusion", "SLAM in GPS-denied interiors", "Victim detection under poor visibility"],
  },
  {
    index: "03",
    title: "Manipulation in confined space",
    question: "How much dexterity is worth the mass and complexity?",
    body:
      "A six-axis arm is a significant mass and power cost on a small tracked chassis. The design question is not whether dexterity is useful but which degrees of freedom earn their place. URRT's arm is specified at six axes to allow arbitrary end-effector orientation when approaching a handle or a payload from an awkward approach angle.",
    methods: ["Workspace and reach analysis", "Payload versus arm mass trade-off", "End-effector design for door handles and debris"],
  },
  {
    index: "04",
    title: "Operator workload",
    question: "How much of the task should be autonomous?",
    body:
      "Full autonomy in an unknown collapsed structure remains an open problem. URRT treats autonomy as a spectrum: assistive behaviours that reduce operator load — stabilised driving, assisted flipper poses, mapped return paths — while leaving judgement with the human operator.",
    methods: ["Shared-control interfaces", "Assisted teleoperation", "Operator situational awareness"],
  },
];

export const workflow: WorkflowStage[] = [
  {
    step: "01",
    title: "Problem",
    body: "Define the obstacle from the competition rulebook and from what actually breaks in the field.",
  },
  {
    step: "02",
    title: "Design",
    body: "CAD the mechanism, size the actuators, and check the mass and power budget before cutting anything.",
  },
  {
    step: "03",
    title: "Prototype",
    body: "Build the smallest version that can answer the question. Plywood and printed parts are legitimate.",
  },
  {
    step: "04",
    title: "Test",
    body: "Drive it against the real obstacle, not a convenient one. Log what fails and where.",
  },
  {
    step: "05",
    title: "Evaluate",
    body: "Compare against the requirement. Decide whether the failure is a bug or a wrong design.",
  },
  {
    step: "06",
    title: "Iterate",
    body: "Change one thing. Rebuild. The loop is the method — X1 to AEGIS is one turn of it.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Recruitment                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Recruitment is CLOSED as of this build.
 *
 * The source site carried two contradictory deadlines (1 March 2026 and
 * 13 March 2025) while still displaying "RECRUITING NOW". Both are in the past.
 * Rather than publish either, the page renders a closed state and routes
 * applicants to email. See content-audit/factual-issues.md S2-01.
 */
export const recruitment = {
  status: "closed" as "open" | "closed",
  cycle: "2026 intake",
  deadline: null as string | null,
  commitment: "8–12 hours per week during the semester",
  eligibility: "Open to students from all UIU departments",
  disciplines: [
    { name: "Mechanical", needs: "CAD in SolidWorks, Fusion 360 or Blender; fabrication; materials knowledge; comfort with hand tools and measuring instruments." },
    { name: "Software & Autonomous", needs: "Python or C++; ROS; image processing, object detection and segmentation; report writing." },
    { name: "Electrical", needs: "Circuit and PCB design; microcontrollers (Arduino, STM32, ESP32, Raspberry Pi); power system management." },
    { name: "Aerial & Communication", needs: "Networking, telemetry and communication protocols; RF systems; sensor and radio modules; UAV experience is a plus." },
    { name: "Media & Public Relations", needs: "Content writing, cinematography, graphic design, video editing, social media management." },
    { name: "Logistics", needs: "Event planning, budget management, procurement and sponsorship acquisition." },
  ],
};
