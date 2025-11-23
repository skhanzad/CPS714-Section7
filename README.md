# CPS714-Section7-Team1

=================================================================================================================

### Overview

This Branch contains the Identity & Access Teams, implementation of the Front-End Authentication for the

CampusConnect Web Application. This implementation leverages Google SSO for secure domain authentication

and uses JS to display appropriate error messages incase of invalid inputs as well as blocks unauthorized

access attempts.

### Features

- Seamless Google SSO Integration using Google OAuth
- Restricted Access, only users with @torontomu domain email addresses can access CampusConnect
- Clear \& Concise Error Messages shown for unauthorized access attempts.
- Built on Pure Vanilla JS, CSS \& HTML

### How to Authenticate

1. Upon Accessing Site user first lands on login page
2. User clicks "Sign in with Google"
3. Google OAuth Popup Window appears
4. Users authenticates with @torontomu.ca domain email
5. JS is used to validate the users email domain is @torontomu.ca
   --> If Domain match, the user is redirect CampusConnect HomePage
   --> If Invalid Domain is entered, the access is denied and error message is displayed

### FrontEnd UI

The Frontend UI is a vanilla development, meaning its easy to work with for any dev wish to branch of or contribute
to the project. The Focus was to keep simplicity at the center when it came to looks and interaction with the webapp

- The Homepage after successful login for now only shows a simple Navigation Bar with links to different subpages
  users can click the appropriate nav link and access the required page. But this is subject to access restrictions
- Role Access restrictions were taken into account, since not all pages will be accessible by users
  --> For Example, if a user without the appropriate role requirements attempts accessing create events the
  user will see an error message indicated they don't have required permission to access create event
  Note: User roles and permissions are retrieved from the database hosted on Supabase.

### Team Members

Eric, Tommy, Nini, Markand, Andy

#### Contributing

1. Create a Feature Branch from Team-1---working-branch
2. Submit a pull request with a detail description
3. Request will be reviewed by Team 1 - Identity \& Access Team and approved by team management


### Testing

In order to do testing, you will need to install playwright.

Run npx playright test to test the code and backend.