// dataService.js - migrated from app/js/services.js (dataSvc)
import { config } from "../config";

async function getJson(url) {
  const res = await fetch(url);
  return res.json();
}

const fallbackRecentWork = {
  result: {
    content: [
      {
        id: 1001,
        title: "Senior Software Developer",
        company: "HP Inc",
        location: "London, UK",
        technologies: [
          "Vue",
          "React",
          "TypeScript",
          "Node.js",
          "SQL",
          "MongoDB",
          "AWS Lambda",
          "Amazon SQS",
          "RabbitMQ",
          "Kubernetes",
          "Docker",
          "CI/CD",
        ],
        highlights: [
          "Delivered enterprise frontend experiences using Vue, React, TypeScript, and Node.js for product teams in HP.",
          "Built scalable APIs and event-driven integrations with AWS Lambda and RabbitMQ to automate workflows.",
          "Improved application performance, reusability, and delivery quality through clean architecture and cross-team collaboration.",
        ],
      },
      {
        id: 1003,
        title: "Full stack developer",
        company: "HP Inc",
        location: "Bangalore, India",
        technologies: [
          "React",
          "React Native",
          "Node.js",
          "PostgreSQL",
          "Python",
          "CSS",
          "HTML5",
          "JavaScript",
        ],
        highlights: [
          "Led mobile app development (React Native) for HP OSS, guiding a team of four developers through architecture and code reviews.",
          "Created coding standards and mobile app architecture to guide team members.",
          "Developed HP OSS mobile app (React Native, iOS/Android) and web dashboard (React, D3) with custom analytics visualisations.",
          "Built backend APIs (Node.js, Python, PostgreSQL) to support mobile and web clients, including data modelling and query optimisation.",
          "Code review & deployment. (Tech stack: GitHub, AWS, CI/CD)",
        ],
      },
      {
        id: 1004,
        title: "Project Lead (Copilot)",
        company: "Topcoder Inc",
        location: "Freelance / Remote",
        technologies: [
          "React",
          "React Native",
          "Node.js",
          "Python",
          "SQL",
          "Angular.js",
          "CSS",
          "HTML",
          "JSON",
          "JavaScript",
        ],
        highlights: [
          "Participating in project requirement discussions with clients.",
          "Project budgeting.",
          "Creating project architecture.",
          "Led project development by assigning tasks/modules to developers & managing code development, code review & deployment.",
          "Presenting developed projects/modules to clients.",
          "Attending Topcoder Open regional and final events & interacting with developers & clients.",
        ],
      },
      {
        id: 1005,
        title: "Front-end developer",
        company: "Topcoder Inc",
        location: "Freelance / Remote",
        technologies: [
          "React",
          "React Native",
          "Node.js",
          "CSS",
          "HTML5",
          "JavaScript",
        ],
        highlights: [
          "Delivered pixel-perfect UI implementations (React, Angular, HTML/SCSS) under tight deadlines (4-7 days), consistently scoring in the top tier.",
          "Collaborating with the designer & project lead (copilot) to get all the required project info.",
          "Developing frontend / UI using the design storyboard. (Design storyboards are usually provided in Adobe XD, Photoshop, Marvel, etc formats).",
          "Debugging my code using the Chrome devTools, Firefox Devtools, etc.",
          "Developing Frontend & Apps using technologies like ReactJS, AngularJS, React Native, HTML, SCSS, CSS, JavaScript, jQuery, Axios, etc. & Charts using D3 & similar frameworks.",
          "API Integration with the front end.",
        ],
      },
      {
        id: 1006,
        title: "UI Engineer",
        company: "Engage Together",
        location: "San Diego, CA",
        technologies: ["CSS", "HTML5", "JavaScript"],
        highlights: [
          "Developed branded web experiences and reusable UI components for customer-facing applications.",
          "Enhanced interaction quality and responsiveness to improve the overall user journey.",
          "Collaborated with design and backend teams to deliver cohesive product features with strong UX.",
        ],
      },
      {
        id: 1007,
        title: "Software Engineer",
        company: "Capgemini",
        location: "Pune, India",
        technologies: ["CSS", "JavaScript"],
        highlights: [
          "I joined Capgemini after graduating from college. I worked there as a software developer for a financial company (ANZ).",
        ],
      },
    ],
  },
};

function normalizeProfileHistoryStats(data) {
  const content = data?.result?.content ?? {};
  const develop = content?.DEVELOP ?? {};

  if (typeof develop.wins === "number") {
    return {
      result: {
        content: {
          DEVELOP: {
            wins: develop.wins,
          },
        },
      },
    };
  }

  const subTracks = develop?.subTracks ?? [];
  const uiPrototype = subTracks.find(
    (subTrack) => subTrack.name === "UI_PROTOTYPE_COMPETITION",
  );

  return {
    result: {
      content: {
        DEVELOP: {
          wins: uiPrototype?.history?.length ?? 0,
        },
      },
    },
  };
}

export function getConfig() {
  return config;
}

export function getBasic() {
  return getJson(config.basic || "/data/basic.json");
}

export function getStat() {
  return getJson(config.stat || "/data/profile-history.json").then(
    normalizeProfileHistoryStats,
  );
}

export function getHistory() {
  return getJson(config.history || "/data/profile-history.json");
}

export function getLatestStat() {
  return getJson(config.latestStat || "/data/latest-stat.json")
    .then((data) => {
      const content = data?.result?.content;
      if (Array.isArray(content) && content.length > 0) {
        return data;
      }
      return fallbackRecentWork;
    })
    .catch(() => fallbackRecentWork);
}
