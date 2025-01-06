import { openDB } from 'idb';

const dbPromise = openDB('CF-Extend', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('solution_code')) {
      const solutionCodeStore = db.createObjectStore('solution_code', { keyPath: 'id', autoIncrement: true });
      solutionCodeStore.createIndex('contest_id_and_problem_index', ['contest_id', 'problem_index']);
    }

    if (!db.objectStoreNames.contains('template')) {
      const templateStore = db.createObjectStore('template', { keyPath: 'id', autoIncrement: true });
      templateStore.createIndex('language', 'language');
    }

    if (!db.objectStoreNames.contains('theme')) {
      const themeStore = db.createObjectStore('theme', { keyPath: 'themeKey' });

      themeStore.put({ themeKey: 'background', themeValue: 'default' });
      themeStore.put({ themeKey: 'font-size', themeValue: 14 });
      themeStore.put({ themeKey: 'element-styles', themeValue: 'none' });
      themeStore.put({ themeKey: 'font-family', themeValue: 'default' });
    }
    
    if(!db.objectStoreNames.contains('currentProblem')){
      db.createObjectStore('currentProblem', { keyPath: 'id', autoIncrement: true });
    }
  },
});

// Solution Code Functions
export const addSolutionCode = async (contest_id, problem_index, code, language) => {
  const db = await dbPromise;
  return db.put('solution_code', { contest_id, problem_index, code, language });
};

export const getAllSolutionCodes = async (contest_id, problem_index) => {
  const db = await dbPromise;
  return db.getAllFromIndex('solution_code', 'contest_id_and_problem_index', [contest_id, problem_index]);
};

export const updateSolutionCode = async (id, contest_id, problem_index, code, language) => {
  const db = await dbPromise;
  return db.put('solution_code', { id, contest_id, problem_index, code, language });
};

export const deleteSolutionCode = async (id) => {
  const db = await dbPromise;
  return db.delete('solution_code', id);
};

// Template Functions
export const addTemplate = async (name, code, cursorPosition, language) => {
  const db = await dbPromise;
  return db.put('template', { name, code, cursorPosition, language });
};

export const getAllTemplates = async () => {
  const db = await dbPromise;
  return db.getAll('template');
};

export const getTemplatesByLanguage = async (language) => {
  const db = await dbPromise;
  return db.getAllFromIndex('template', 'language', language);
};

export const updateTemplate = async (id, name, code, cursorPosition, language) => {
  const db = await dbPromise;
  return db.put('template', { id, name, code, cursorPosition, language });
};

export const deleteTemplate = async (id) => {
  const db = await dbPromise;
  return db.delete('template', id);
};

// Theme Functions
export const editThemeAttribute = async (themeKey, themeValue) => {
  const db = await dbPromise;
  return db.put('theme', { themeKey, themeValue });
};

export const getAllThemeAttributes = async () => {
  const db = await dbPromise;
  return db.getAll('theme');
};

// Current Problem Functions
export const addCurrentProblem = async (problem) => {
  const db = await dbPromise;
  return db.put('currentProblem', problem);
};

export const clearCurrentProblem = async () => {
  const db = await dbPromise;
  return db.clear('currentProblem');
};

export const getCurrentProblem = async () => {
  const db = await dbPromise;
  return db.get('currentProblem', 0);
};