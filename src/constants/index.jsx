import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";

export const navItems = [
  { label: "Workout Sessions", href: "#WorkoutSessions" },
  { label: "Gallery", href: "#Gallery" },
  { label: "Pricing", href: "#Pricing" },
  { label: "Contact", href: "#Contact" },
  { label: "BMI Calculator", href: "#bmicalculator" },
];

export const testimonials = [
  {
    user: "John Doe",
    company: "Stellar Solutions",
    // image: user1,
    text: "I am extremely satisfied with the services provided. The team was responsive, professional, and delivered results beyond my expectations.",
  },
  {
    user: "Jane Smith",
    company: "Blue Horizon Technologies",
    // image: user2,
    text: "I couldn't be happier with the outcome of our project. The team's creativity and problem-solving skills were instrumental in bringing our vision to life",
  },
  {
    user: "David Johnson",
    company: "Quantum Innovations",
    // image: user3,
    text: "Working with this company was a pleasure. Their attention to detail and commitment to excellence are commendable. I would highly recommend them to anyone looking for top-notch service.",
  },
  {
    user: "Ronee Brown",
    company: "Fusion Dynamics",
    // image: user4,
    text: "Working with the team at XYZ Company was a game-changer for our project. Their attention to detail and innovative solutions helped us achieve our goals faster than we thought possible. We are grateful for their expertise and professionalism!",
  },
  {
    user: "Michael Wilson",
    company: "Visionary Creations",
    // image: user5,
    text: "I am amazed by the level of professionalism and dedication shown by the team. They were able to exceed our expectations and deliver outstanding results.",
  },
  {
    user: "Emily Davis",
    company: "Synergy Systems",
    // image: user6,
    text: "The team went above and beyond to ensure our project was a success. Their expertise and dedication are unmatched. I look forward to working with them again in the future.",
  },
];

export const features = [
  {
    icon: <BotMessageSquare />,
    text: "Popunder / Pop Ads",
    description:
      "Popunder ads are advertisements that open in a new tab or window behind the user’s current browser window, typically after clicking a link or button.",
  },
  {
    icon: <Fingerprint />,
    text: "Vignette Banner",
    description:
      "Banner ads are rectangular images or text-based advertisements that appear on websites, typically along the top, sides, or bottom of the page.",
  },
  {
    icon: <ShieldHalf />,
    text: "Push Notifications",
    description:
      "Push ads are notifications that appear on a user’s device, even when they are not actively using the app or website that sent the notification.",
  },
  {
    icon: <BatteryCharging />,
    text: "SmartLink (Direct Link)",
    description:
      "Direct link ad formats are specific types of advertisements that direct users straight to a particular URL or landing page when clicked.",
  },
  // {
  //   icon: <PlugZap />,
  //   text: "Collaboration Tools",
  //   description:
  //     "Work together with your team in real-time on VR projects, enabling seamless collaboration and idea sharing.",
  // },
  // {
  //   icon: <GlobeLock />,
  //   text: "Analytics Dashboard",
  //   description:
  //     "Gain valuable insights into user interactions and behavior within your VR applications with an integrated analytics dashboard.",
  // },
];

export const checklistItems = [
  {
    title: "Code merge made easy",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "Review code without worry",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "AI Assistance to reduce time",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "Share work in minutes",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
];

export const pricingOptions = [
  {
    title: "Free",
    price: "$0",
    features: [
      "Private board sharing",
      "5 Gb Storage",
      "Web Analytics",
      "Private Mode",
    ],
  },
  {
    title: "Pro",
    price: "$10",
    features: [
      "Private board sharing",
      "10 Gb Storage",
      "Web Analytics (Advance)",
      "Private Mode",
    ],
  },
  {
    title: "Enterprise",
    price: "$200",
    features: [
      "Private board sharing",
      "Unlimited Storage",
      "High Performance Network",
      "Private Mode",
    ],
  },
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];
