import React, { useState } from 'react'; 
import './App.css'; 
import SearchResults from './components/SearchResults'; 
 
function App() { 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [searchResults, setSearchResults] = useState([]); 
  const [error, setError] = useState(''); 
  const apiKey = 'place token'; // Replace with your actual API key 
 
  const handleInputChange = (event) => { 
    const value = event.target.value; 
    const alphanumericRegex = /^[a-zA-Z0-9]*$/; 
 
    if (value.length <= 30 && alphanumericRegex.test(value)) { 
      setSearchTerm(value); 
      setError(''); 
    } else if (value.length > 30) { 
      setError('Maximum length of 30 characters reached.'); 
    } else if (!alphanumericRegex.test(value)) { 
      setError('Only alphanumeric characters are allowed.'); 
    } 
  }; 
 
  const handlePaste = (event) => { 
    event.preventDefault(); 
    setError('Pasting is not allowed.'); 
  }; 
 
  const handleSearch = async () => { 
    if (!searchTerm) { 
      setSearchResults([]); 
      return; 
    } 
 
    try { 
		const response = await fetch("https://v1.rocketapi.io/instagram/user/search", {
		      method: "POST",
		      headers: {
		        "Content-Type": "application/json",
		        Authorization: `Token ${apiKey}`,
		      },
		      body: JSON.stringify({ query: searchTerm }), // Send the search term in the request body
		    }); 
 
      if (!response.ok) { 
        const errorData = await response.json(); 
        setError(`Search failed: ${errorData.message || 
response.statusText}`); 
        setSearchResults([]); 
        return; 
      } 
 
      const data = await response.json(); 
      if (data && data.response) { 
        const formattedResults = data.response.body.users.map((user) => ({ 
          username: user.username, 
          full_name: user.full_name, 
          profile_pic_url: user.profile_pic_url, 
        })); 
		console.log(formattedResults)
        setSearchResults(formattedResults); 
        setError(''); 
      } else { 
        setSearchResults([]); 
        setError('No results found.'); 
      } 
    } catch (err) { 
      console.error('Error during search:', err); 
      setError('Failed to fetch search results.'); 
      setSearchResults([]); 
    } 
  }; 
 
  return ( 
    <div className="app-container"> 
      <h1>RocketReach Search</h1> 
      <div className="search-input-container"> 
        <input 
          type="text" 
          value={searchTerm} 
          onChange={handleInputChange} 
          onPaste={handlePaste} 
          placeholder="Enter search term (alphanumeric, max 30 chars)" 
        /> 
        <button onClick={handleSearch}>Search</button> 
      </div> 
      {error && <p className="error-message">{error}</p>} 
      <SearchResults results={searchResults} /> 
    </div> 
  ); 
} 
 
export default App;