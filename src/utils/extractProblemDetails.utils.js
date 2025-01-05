export const extractProblemDetails = () => {
    try {
      const titleElement = document.querySelector(".title");
      let title = titleElement ? titleElement.innerText : "";
      title = title.length ? title.substring(title.indexOf(".")+1).trim() : "";
      const slug = title.replaceAll(" ", "-").toLowerCase();
  
      const timeLimitElement = document.querySelector(".time-limit");
      let timeLimit = timeLimitElement
        ? timeLimitElement.innerText.replace("time limit per test", "")
        : "0";
      timeLimit = Number(timeLimit.split(" ")[0]) || 0;
  
      const memoryLimitElement = document.querySelector(".memory-limit");
      let memoryLimit = memoryLimitElement
        ? memoryLimitElement.innerText.replace("memory limit per test", "")
        : "0";
      memoryLimit = Number(memoryLimit.split(" ")[0]) || 0;
  
      const sampleInputs = Array.from(
        document.querySelectorAll(".input pre") || []
      ).map((input) => input.innerText);
      const sampleOutputs = Array.from(
        document.querySelectorAll(".output pre") || []
      ).map((output) => output.innerText);
  
      const sampleTestCases = sampleInputs.map((input, index) => ({
        input,
        output: sampleOutputs[index] || "",
      }));
  
      return { title, slug, timeLimit, memoryLimit, sampleTestCases };
    } catch (error) {
      console.error("Error extracting problem details:", error);
      return null;
    }
  };
  