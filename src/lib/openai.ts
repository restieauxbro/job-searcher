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
