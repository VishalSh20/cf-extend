
    // const [running, setRunning] = useState(false);
    // const [submitting, setSubmitting] = useState(false);
    // const [exampleTestCases, setExampleTestCases] = useState([]);

    // // test-run states
    // const [testOverallStatus, setTestOverallStatus] = useState(null);
    // const [testOverallMemory, setTestOverallMemory] = useState(-1);
    // const [testOverallTime, setTestOverallTime] = useState(-1);
    // const [testExecutionResults, setTestExecutionResults] = useState(null);
    // const [testExecutionError, setTestExecutionError] = useState(null);


    // // result states
    // const [executionResults, setExecutionResults] = useState(null);
    // const [executionStatus, setExecutionStatus] = useState(null);
    // const [executionTime, setExecutionTime] = useState(-1);
    // const [executionMemory, setExecutionMemory] = useState(-1);
    // const [currentSubmission, setCurrentSubmission] = useState(null);

    // const handleCodeRun = () => {
    //   const workerURL = `${process.env.NEXT_PUBLIC_EXECUTION_WORKER_URL}`;
    //   setRunning(true);
    //   axios.post(
    //     workerURL,
    //     {
    //       code: code[language],
    //       language: language,
    //       testcases: exampleTestCases
    //     }
    //   )
    //     .then((response) => {
    //       const data = response.data;
    //       const { overallStatus, overallMemory, overallTime, executionResults } = data;
    //       setTestOverallStatus(overallStatus);
    //       setTestOverallTime(overallTime);
    //       setTestOverallMemory(overallMemory);
    //       setTestExecutionResults(executionResults);

    //       if (overallStatus !== "Accepted") {
    //         toast.error(overallStatus);
    //         for (let i = 0; i < executionResults.length; i++) {
    //           if (executionResults[i].error) {
    //             setTestExecutionError(executionResults[i].error);
    //             break;
    //           }
    //         }
    //       }
    //       else
    //         toast.success("Executed Successfully!");


    //     })
    //     .catch((error) => {
    //       const errorResponse = error.response;
    //       const errorMessage = errorResponse ? errorResponse.data?.error : error.message;
    //       toast.error(`An error occured- ${errorMessage}`);
    //     })
    //     .finally(() => {
    //       setRunning(false);
    //       setIsTabVisible({ ...isTabVisible, ['test-output']: true })
    //       setTab("test-output");
    //     })
    // }

    // const handleCodeSubmission = () => {
    //   if (!isSignedIn) {
    //     router.push(`/sign-in?redirect_url=${encodeURIComponent(window.location.pathname)}`);
    //     return;
    //   }

    //   if (!user) {
    //     toast.error("Network Error - user status can't be fetched");
    //     return;
    //   }

    //   const workerURL = process.env.NEXT_PUBLIC_EXECUTION_WORKER_URL;
    //   setSubmitting(true);

    //   // Submit the code for execution
    //   axios
    //     .post(workerURL, {
    //       code: code[language],
    //       language,
    //       testcases: problem.testcases,
    //     })
    //     .then((response) => {
    //       const { overallStatus, overallMemory, overallTime, executionResults } = response.data;

    //       setExecutionStatus(overallStatus);
    //       setExecutionTime(overallTime);
    //       setExecutionMemory(overallMemory);
    //       setExecutionResults(executionResults);

    //       // Register the submission
    //       return axios.post('/api/submission', {
    //         userId: user.id,
    //         problemId: problem.id,
    //         code: code[language],
    //         language,
    //         status: overallStatus,
    //         time: overallTime,
    //         memory: overallMemory,
    //       });
    //     })
    //     .then((response) => {
    //       const submissionInstance = response.data.submissionInstance;
    //       setCurrentSubmission(submissionInstance);
    //     })
    //     .catch((error) => {
    //       const errorMessage = error.response?.data?.error || error.message || "An error occured";
    //       toast.error(errorMessage);
    //     })
    //     .finally(() => {
    //       if (executionStatus !== "Accepted") {
    //         toast.error(executionStatus);
    //         const errorResult = executionResults?.find((result) => result.error);
    //         if (errorResult) {
    //           setExecutionError(errorResult.error);
    //         }
    //       } else {
    //         if (currentSubmission) {
    //           toast.success("Accepted!!");
    //         }

    //       }
    //       setIsTabVisible({ ...isTabVisible, ['result']: true })
    //       setTab('result');
    //       setSubmitting(false);
    //     });
    // };
