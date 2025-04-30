import React from "react";
import "./SearchResults.css"; // Ensure this CSS file exists

function SearchResults({ results }) {
  return (
    <div className="search-results-grid">
      {results.length > 0 ? (
        results.map((user, index) => (
          <div key={index} className="user-card">
		  <img  src={`http://localhost:5000/proxy-image?url=${encodeURIComponent(user.profile_pic_url)}`}
		  		  alt={user.username}
		  		  className="profile-pic"
		  			  
		  			/>
            <p className="username">{user.username}</p>
            <p className="fullname">{user.full_name}</p>
			

          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}


export default SearchResults;
