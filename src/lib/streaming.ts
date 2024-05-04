export function completeAndExtractJson(stream: string): string {
  /**
   * Extracts a JSON string from a stream of text and attempts to complete it to form a valid JSON.
   *
   * The function locates the first opening curly brace '{' to start extracting the JSON substring.
   * It then iterates over the characters, counting the braces to identify the end of the JSON object.
   * If it encounters an unbalanced quote, it adds a closing quote.
   * If there are more opening braces than closing, it appends the necessary closing braces.
   * The extraction stops once the braces are balanced and there are no open quotes, or at the end of the stream.
   *
   * This function is designed to handle cases where the JSON object is either incomplete or followed by non-JSON text.
   */

  // Finding the first opening bracket
  const firstOpeningBracket = stream.indexOf("{");
  if (firstOpeningBracket === -1) {
    return "";
  }

  let jsonSubstring = "";
  let openQuotes = false;
  let bracesCount = 0;

  for (let i = firstOpeningBracket; i < stream.length; i++) {
    const char = stream[i];
    jsonSubstring += char;

    // Toggle the quotes flag when a non-escaped quote is encountered
    if (char === '"' && (i === 0 || stream[i - 1] !== "\\")) {
      openQuotes = !openQuotes;
    } else if (!openQuotes) {
      if (char === "{") {
        bracesCount++;
      } else if (char === "}") {
        bracesCount--;
      }
    }

    // If braces are balanced and quotes are not open, stop the loop
    if (bracesCount === 0 && !openQuotes) {
      break;
    }
  }

  // Adding necessary closing braces and quotes
  if (openQuotes) {
    jsonSubstring += '"';
  }
  jsonSubstring += "}".repeat(Math.max(bracesCount, 0));

  return jsonSubstring;
}
export const finishJson5 = (unfinishedJson5: string) => {
  let stack = [];
  let inDoubleQuotes = false;
  let inSingleQuotes = false;
  let inSingleLineComment = false;

  for (let i = 0; i < unfinishedJson5.length; i++) {
    const currentChar = unfinishedJson5[i];
    const nextChar = unfinishedJson5[i + 1];
    let prevChar;
    if (i > 0) {
      prevChar = unfinishedJson5[i - 1];
    }
    if (
      currentChar === "/" &&
      nextChar === "/" &&
      !inDoubleQuotes &&
      !inSingleQuotes
    ) {
      inSingleLineComment = true;
    }
    if (
      currentChar === '"' &&
      !inSingleQuotes &&
      !inSingleLineComment &&
      prevChar !== "\\"
    ) {
      inDoubleQuotes = !inDoubleQuotes;
    }
    if (
      currentChar === "'" &&
      !inDoubleQuotes &&
      !inSingleLineComment &&
      prevChar !== "\\"
    ) {
      inSingleQuotes = !inSingleQuotes;
    }
    if (currentChar === "\n" && inSingleLineComment) {
      inSingleLineComment = false;
    }
    if (
      currentChar === "{" &&
      !inDoubleQuotes &&
      !inSingleQuotes &&
      !inSingleLineComment
    ) {
      stack.unshift("}");
    }
    if (
      currentChar === "[" &&
      !inDoubleQuotes &&
      !inSingleQuotes &&
      !inSingleLineComment
    ) {
      stack.unshift("]");
    }
    if (
      currentChar === "}" &&
      !inDoubleQuotes &&
      !inSingleQuotes &&
      !inSingleLineComment
    ) {
      stack.shift();
    }
    if (
      currentChar === "]" &&
      !inDoubleQuotes &&
      !inSingleQuotes &&
      !inSingleLineComment
    ) {
      stack.shift();
    }
  }

  if (inDoubleQuotes) {
    stack.unshift('"');
  }
  if (inSingleQuotes) {
    stack.unshift("'");
  }
  if (inSingleLineComment) {
    return unfinishedJson5;
  }

  return unfinishedJson5 + stack.join("");
};

export function validParsedJson(jsonString: string):
  | {
      [key: string]: any;
    }
  | false {
  try {
    JSON.parse(jsonString);
    return JSON.parse(jsonString);
  } catch (e) {
    return false;
  }
}

export type JsonMessage = {
  type: "json";
  content:
    | {
        [key: string]: any;
      }
    | string; // May be a string if the JSON is invalid
};

type TextMessage = {
  type: "text";
  content: string;
};

export type TextMessageWithJson = JsonMessage | TextMessage;

export function parseMessageWithJson(inputStr: string): TextMessageWithJson[] {
  const messages: TextMessageWithJson[] = [];
  let i = 0;

  while (i < inputStr.length) {
    if (inputStr[i] !== "{" && inputStr[i] !== "[") {
      // Extract text message
      let textEnd = i;
      while (
        textEnd < inputStr.length &&
        inputStr[textEnd] !== "{" &&
        inputStr[textEnd] !== "["
      ) {
        textEnd++;
      }
      messages.push({ type: "text", content: inputStr.substring(i, textEnd) });
      i = textEnd;
    } else {
      // Extract JSON message
      const jsonStart = i;
      let bracketCount = 1;
      i++;
      while (i < inputStr.length && bracketCount > 0) {
        if (inputStr[i] === "{" || inputStr[i] === "[") {
          bracketCount++;
        } else if (inputStr[i] === "}" || inputStr[i] === "]") {
          bracketCount--;
        }
        i++;
      }

      const jsonStr = inputStr.substring(jsonStart, i);
      const extractedJson = finishJson5(jsonStr);
      const content = validParsedJson(extractedJson);
      if (content) {
        messages.push({ type: "json", content });
      } else messages.push({ type: "text", content: extractedJson });
    }
  }

  return messages;
}

// Example usage

const input1 =
  '{ "title": "Software Development Engineer", "intro": "As a software development engineer, I specialise in designing, coding, testing, and managing software applications", "employment": { "company": "b"}, "haiku": [{"bonk":';

const input2 =
  'The following CV would look like this: { "title": "Software Development Engineer" } How did I do?';

const output1 = parseMessageWithJson(
  '{' +
      '  isCV: true,' +
      '  documentType: "cv",' +
      '  cv: {' +
      '    title: "Product Engineer",' +
      `    intro: "I'm someone with a unique journey into web and app development – one grounded in a rich history of user experience design and digital marketing. I haven't always been a programmer, in fact my career begins solely in the marketing space; and when I found how our advertising efforts were limited by stilted digital experiences and a slow pipeline from design to code I took up the responsibility to drive the digital strategy and got onto the tools. I'm using this term to describe what I do: I'm a Product Engineer. A Product Engineer is someone who develops solutions and then builds them. It's someone who can come up with and programme features that are mindfully connected to the whole digital strategy. A software engineer who markets and a marketer who codes.",` +
      '    employment: {' +
      '      "Oscar Tango": {' +
      '        company: "Oscar Tango",' +
      '        companyDescription: "Oscar Tango is a boutique development agency I co-founded that sub-contracts from creative agencies when they need extra resource building AI applications. We specialise in building knowledge-bases, enhanced search and chat interfaces for agency clients to sell on to their clients. I am the principle developer and consult on digital strategy.",' +
      '        position: "Full-stack Developer / Co-founder",' +
      '        startDate: "Nov 2023",' +
      '        endDate: "Present",' +
      '        totalDuration: "5 months",' +
      '        description: "Web Development",' +
      '        hightlights: [' +
      '          "Created a full-stack RAG AI application as a knowledge-base alternative that saved our client 100 hours of development time on an old-school solution",' +
      '          "Developed a cost per conversion service that ensures a ROI on limits AI features when as they become more or less effective on each user. Our client had a controlled",' +
      '          "Developed a chatbot that resists and reports adversarial attacks, staying on brand and on message"' +
      '        ]' +
      '      },' +
      '      "Te Pūkenga": {' +
      '        company: "Te Pūkenga",' +
      `        companyDescription: "Te Pūkenga is New Zealand's premier vocational education provider undergoing the biggest digital transformation ever seen in the public sector to unify 24 businesses into a single network.",` +
      '        position: "Artificial Intelligence Architect",' +
      '        startDate: "Oct 2021",' +
      '        endDate: "Present", ' +
      '        totalDuration: "2 years 5 months",' +
      '        description: "Solutions Design\AI Engineering",' +
      '        hightlights: [' +
      `          "Developed micro front-end apps embeddable in any of Te Pūkenga's 24 businesses, delivering a cohesive network experience. Qualitative research showed a 78% boost in the sentiment \\"I got exactly what I needed\\"",` +
      `          "Architected our web 'Intelligence Layer' – a microservice for extracting and transforming data across products and users, enhancing with LLMs and passing back to the front-end to power personalisation. In the 6 months following its launch the website conversion rate increased from 1.5% to 3.5%.",` +
      '          "Architected and developed a method for our front-end applications to generate components from a centralised design system and automate A/B testing. In our sample testing we were able to increase the click-through rate by 22%.",' +
      '          "Designed and developed a custom CMS, an internal digital product that reduced the time to publish content from 1 week to 4 hours"' +
      '        ]' +
      '      },' +
      '      "Competenz": {' +
      '        company: "Competenz",' +
      '        companyDescription: "Competenz is a B2B Industry Training Organisation in New Zealand serving 32 industry sectors and with over 11,000 business customers. As Digital Marketing Lead I had 1 direct report.",' +
      '        position: "Digital Experience Lead",' +
      '        startDate: "Oct 2021",' +
      '        endDate: "Jun 2022",' +
      '        totalDuration: "9 months",' +
      '        description: "UX Management\Full-stack Development",' +
      '        hightlights: [' +
      `          "Ownership of the customer's digital experience from ad channels to the website, from lead nurture through to conversion, as well as the technology stack of our new platforms. My time at Competenz was focused on building a micro-services architecture to scale personalised experiences driven by data. We automated nurture funnels that set unqualified learners up with recruitment coaching and that integrated with our digital systems. We rebuilt content delivery systems to suit the micro-campaign strategy of the organisation.",` +
      '          "Designed the end-to-end customer experience for our automated nuture journey; taking user retention from 31% to 64%",' +
      '          "Developed revisions to our customer tracking pipeline through the phone team, increasing the accuracy of our data and reducing the time to onboard a new customer by 2 weeks"' +
      '        ],' +
      '        achievements: [' +
      '          "Competenz is a B2B Industry Training Organisation in New Zealand serving 32 industry sectors and with over 11,000 business customers. As Digital Marketing Lead I had 1 direct report.",' +
      `          "All things digital marketing for New Zealand's largest Industry Training Organisation – using data to maximise ad spend across 32 discreet industry sectors. We used behavioural metadata to create distinct IDs and follow cross-channel engagement – the kind of thing a Customer Data Platform does out-of-the-box I set up through automations and integrations with the technology we had available.",` +
      '          "As a Digital Marketing Executive, I collaborated with agencies and internal teams to execute strategically aligned digital campaigns. I tracked key metrics to measure campaign success and derive insights for potential improvements. My duties included managing social media, optimising SEO, and developing digital marketing content. This role honed my skills in digital marketing and paved the way for my transition to the Digital Marketing Lead role."' +
      '        ]' +
      '      }' +
      '    },' +
      '    education: [' +
      '      {' +
      '        institution: "Auckland University of Technology",' +
      '        qualification: "Bachelor of Communications Studies",' +
      '        details: "Major in Creative Industries, Minor in Advertising",' +
      '        startDate: "2016",' +
      '        endDate: "2018"' +
      '      }' +
      '    ],' +
      '    skills: [' +
      '      "React",' +
      '      "Javascript",' +
      '      "Typescript", ' +
      '      "HTML & CSS",' +
      '      "Node",' +
      '      "PostgreSQL",' +
      '      "Figma", ' +
      '      "LLM Finetuning",' +
      '      "User research",' +
      '      "Full-stack Development",' +
      '      "AWS",' +
      '      "Identity",' +
      '      "Product Strategy"' +
      '    ]' +
      '  }' +
      '}'
);

 //console.log(output1)

 console.log(JSON.parse(`{"name": "hi"}`))