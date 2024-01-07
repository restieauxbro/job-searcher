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

type JsonMessage = {
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

type TextMessageWithJson = JsonMessage | TextMessage;

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
      const extractedJson = completeAndExtractJson(jsonStr);
      const content = validParsedJson(extractedJson) || extractedJson;
      messages.push({ type: "json", content });
    }
  }

  return messages;
}

// Example usage

const input1 =
  'The following CV would look like this: { "title": "Software Development Engineer", "intro": "As a software development engineer, I specialise in designing, coding, testing, and managing software applications", "employment": { "company": "b"';

const input2 =
  'The following CV would look like this: { "title": "Software Development Engineer" } How did I do?';

 const output1 = parseMessageWithJson(`{ "employment": { "tp-ai-architect": { "description": "In my role as an AI Architect at Te Pūkenga, I was responsible for architecting, designing, and developing sophisticated AI solutions that transformed the way users navigate the network. From conducting AI research, driving front end development, to creating scalable, modular applications, I focused on integrating real-time data in intelligent ways for ākonga and kaimahi. Leading the 'Intelligent Navigation' workstream, I developed agile solutions that minimized tech debt during transition, simplifying the user experience. In my experience, I have proven proficiency in large language models, their implementation, and optimization. I also served as a mentor to junior AI Engineers, nurturing a culture of continuous improvement within my team. I consistently engaged with stakeholders, presenting complex findings and progress clearly and effectively. My commitment to ethical AI practices and compliance standards was pivotal in every project I handled." } } }`);
// const output2 = parseMessageWithJson(input2);

 console.log(output1);
// console.log(output2);
