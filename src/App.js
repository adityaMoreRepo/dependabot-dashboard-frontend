import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const fetchIssues = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/issues');
    return response.data;
  } catch (error) {
    console.error('Error fetching issues:', error.message);
    throw error;
  }
};

const App = () => {
  const dispatch = useDispatch();
  const issues = useSelector((state) => state.issues);

  useEffect(() => {
    const loadIssues = async () => {
      try {
        const issuesData = await fetchIssues();
        dispatch({ type: 'SET_ISSUES', payload: issuesData });
      } catch (error) {
        // Handle error
      }
    };

    loadIssues();
  }, [dispatch]);

  return (
    <div>
      <h1>GitHub Dependabot Dashboard</h1>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            {issue.title} - {issue.labels.map((label) => label.name).join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
