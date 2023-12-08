
import { CVTemplate, baseTemplate } from "./base-template";

let modifiedTemplate = { ...baseTemplate };
modifiedTemplate.title = "AI Product Engineer";
modifiedTemplate.intro = "As a Product Engineer with a passion for AI and automation, I specialize in developing innovative AI solutions that drive efficiency and innovation in operations. My expertise in machine learning, deep learning, and NLP, combined with a knack for creating reusable AI tools, positions me as a valuable asset in any tech-driven environment. My experience spans full-stack development, AI research, and process automation, with a focus on delivering secure, efficient AI solutions that meet client needs. My ability to communicate complex technical concepts effectively makes me a strong team player, adept at collaborating with diverse stakeholders.";
modifiedTemplate.employment["tp-ai-architect"].description = "In my role as AI Architect at Te Pūkenga, I focused on designing and implementing AI solutions to simplify user navigation across networks. This included developing a comprehensive library of reusable AI models and automations, enhancing process efficiency, and reducing tech debt. My work involved close collaboration with engineering experts to refine AI solutions, ensuring they align with client requirements. My contribution was instrumental in driving automation and innovation in the organization.";
modifiedTemplate.employment["cz-digital-experience-lead"].description = "At Competenz, I led the digital customer experience, focusing on scaling personalized experiences through data-driven micro-services architecture. This role involved creating automated systems and AI-driven tools, contributing to process efficiency and innovation. My ability to interrogate and utilize extensive libraries of existing designs was key in developing new, effective solutions.";

export const aIEngineeringTemplate: CVTemplate = modifiedTemplate;
   