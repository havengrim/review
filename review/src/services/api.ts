import axios from 'axios';

const baseURL : string = 'https://schoolmanagementsystem.cloud/sms.evaluation/system/';
const api_key : string = 'jIJJXQdYAMFCFxBXbtxnBHqnPey5ya2';

// Create an Axios instance with base URL and API key header
const instance = axios.create({
    baseURL: baseURL,
    headers: {
        'X-API-KEY': api_key
    }
});
// Function to submit evaluation
const submitEvaluation = async (evaluationData) => {
    try {
        const response = await instance.post('api/review/submit_evaluation', evaluationData);
        return response.data;
    } catch (error) {
        console.error('Error submitting evaluation:', error);
    }
};
// Function to get evaluation info by ID
const fetchEvaluationInfo = async (evaluationId) => {
    try {
        const response = await instance.get(`api/review/${evaluationId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting evaluation info:', error);
    }
}
// Function to get all evaluations
const fetchAllEvaluations = async () => {
    try {
        const response = await instance.get('api/review/all_evaluations');
        return response.data;
    } catch (error) {
        console.error('Error getting all evaluations:', error);
    }
};
// Function to get evaluations by school code
const fetchEvaluationsBySchool = async (schoolCode) => {
    try {
        const response = await instance.get(`api/review/evaluations_by_school/${schoolCode}`);
        return response.data;
    } catch (error) {
        console.error('Error getting evaluations by school:', error);
    }
};
// Function to delete evaluation by ID
const deleteEvaluation = async (evaluationId) => {
    try {
        const response = await instance.delete(`api/review/evaluation_info/${evaluationId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting evaluation:', error);
    }
};

export {
    fetchAllEvaluations,
    fetchEvaluationInfo,
    fetchEvaluationsBySchool,
    submitEvaluation,
    deleteEvaluation,
    
};
