// Decode Google JSON web token
function decodeJWT(token) {
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    let jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
}

// Runs after Google sign-in successful
function onSignIn(response) {
    // Decode JWT
    const userData = decodeJWT(response.credential);

    // Check if  email ends with @torontomu.ca
    if (userData.email.endsWith("@torontomu.ca")) {
        //Show website content on successful login
        document.getElementById("mainContent").style.display = "block";
        document.getElementById("landingContainer").style.display = "none";

        // Profile info
        const userInfoDiv = document.getElementById("userInfo");
        userInfoDiv.innerHTML = `
          <div style="display:flex;align-items:center;gap:10px;">
            <a href="/profile.html" style="text-decoration:none;color:inherit;">
              <img src="${userData.picture}" alt="Profile" style="width:40px;height:40px;border-radius:50%;" />
              <span>${userData.given_name}'s Console</span>
            </a>
          </div>
        `;
        // Save user data to sessionStorage
        sessionStorage.setItem("userData", JSON.stringify(userData)); 

        // Debug TMU account info in console
        console.log("Account Info:");
        console.log("  Full Name: " + userData.name);
        console.log("  First Name: " + userData.given_name);
        console.log("  Last Name: " + userData.family_name);
        console.log("  ID: " + userData.sub);
        console.log("  Profile image URL: " + userData.picture);
        console.log("  Email: " + userData.email);

        console.log("Signed in user:", userData);
    } 
    // Access denied alert
    else {
        alert("Access restricted to @torontomu.ca email addresses.");
    }
}

// Fetch user data from cookies for profile page
function populateUserProfile() {
    const userData = JSON.parse(sessionStorage.getItem("userData"));

    if (userData) {
        document.getElementById("userName").textContent = userData.name || "N/A";
        document.getElementById("userEmail").textContent = userData.email || "N/A";

        const roles = ["Students", "Club Leaders", "Department Admins", "System Admins"];
        document.getElementById("userRole").textContent = roles[userData.role] || "Unknown Role";
    } else {
        alert("No user data found in sessionStorage.");
    }
}

// Call populateUserProfile if the profile page is loaded
if (document.body.classList.contains("profile-page")) {
    populateUserProfile();
}
