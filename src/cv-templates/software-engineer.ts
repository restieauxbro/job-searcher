import { CVTemplate, baseTemplate } from "./base-template";

let modifiedTemplate = { ...baseTemplate };
modifiedTemplate.title = "AI Product Engineer";
modifiedTemplate.intro =
  "As a Product Engineer with a passion for AI and automation, I specialize in developing innovative AI solutions that drive efficiency and innovation in operations. My expertise in machine learning, deep learning, and NLP, combined with a knack for creating reusable AI tools, positions me as a valuable asset in any tech-driven environment. My experience spans full-stack development, AI research, and process automation, with a focus on delivering secure, efficient AI solutions that meet client needs. My ability to communicate complex technical concepts effectively makes me a strong team player, adept at collaborating with diverse stakeholders.";
modifiedTemplate.employment["tp-ai-architect"].description =
  "In my role as AI Architect at Te Pūkenga, I focused on designing and implementing AI solutions to simplify user navigation across networks. This included developing a comprehensive library of reusable AI models and automations, enhancing process efficiency, and reducing tech debt. My work involved close collaboration with engineering experts to refine AI solutions, ensuring they align with client requirements. My contribution was instrumental in driving automation and innovation in the organisation.";
modifiedTemplate.employment["cz-digital-experience-lead"].description =
  "At Competenz, I led the digital customer experience, focusing on scaling personalized experiences through data-driven micro-services architecture. This role involved creating automated systems and AI-driven tools, contributing to process efficiency and innovation. My ability to interrogate and utilize extensive libraries of existing designs was key in developing new, effective solutions.";
modifiedTemplate.employment = {
  ...modifiedTemplate.employment,
  "lead-dev": {
    company: "Oscar Tango",
    endDate: "Present",
    position: "Full-stack Developer / Co-founder",
    startDate: "Nov 2023",
    description:
      "Oscar Tango is a boutique development agency I co-founded that sub-contracts from creative agencies when they need extra resource building AI applications. We specialise in building knowledge-bases, enhanced search and chat interfaces for agency clients to sell on to their clients. I am the principle developer and consult on digital strategy.",
    hightlights: ["Web Development"],
    achievements: [
      "Created a full-stack RAG AI application as a knowledge-base alternative that saved our client 100 hours of development time on an old-school solution.",
      "Developed a chatbot that resists and reports adversarial attacks, staying on brand and on message.",
    ],
    totalDuration: "4 months",
  },
};
delete modifiedTemplate.employment["uxbridge-arts-culture"];

export const aIEngineeringTemplate: CVTemplate = modifiedTemplate;
