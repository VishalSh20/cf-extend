export const JUDGE_URL = "http://13.50.157.72:2358";
export const LANGUAGES = ['c','cpp','java','python','javascript'];
export const LANGUAGE_ID = {
    cpp:54,
    java:91,
    python:92,
    javascript:63
}
export const BASIC_TEMPLATE = {
    'c': '#include<stdio.h>\nint main(){\n\tprintf("Hello World!");\n\treturn 0;\n}',
    'cpp': '#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n\tcout<<"Hello World!";\n\treturn 0;\n}',
    'java': 'public class Main{\n\tpublic static void main(String[] args){\n\t\tSystem.out.println("Hello World!");\n\t}\n}',
    'python': 'print("Hello World!")',
    'javascript': 'console.log("Hello World!")'
}

// export const JUDGE_API_KEY = "cdad6e2b7amshffa186cab35b37ap1a9b51jsnfa254a428aa8";
