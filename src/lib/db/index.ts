
// Re-export all database operations from this central file

// User profile operations
export { 
  createUserProfile,
  getUserProfile,
  updateUserProgress,
  setAdminStatus,
  getAllUsers 
} from './user-operations';

// Questions operations
export { 
  getQuestions 
} from './questions-operations';

// Progress tracking operations
export {
  getUserProgress
} from './progress-operations';
