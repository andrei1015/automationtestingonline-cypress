## How-to

```npm install```
then
```npx cypress run```
or
```npx cypress open```


## Test Cases for main page

### Successful booking

- Go to https://automationintesting.online/
- Click the **Book this room** button
- Select a valid date range
- Input valid first and last names
- Input a valid email
- Input a valid phone number
- Click the **Book** button
- Assert a confirmation modal appears
- Assert the modal title is **Booking Successful!**
- Assert the period displayed in the modal is correct


### Failed booking (missing first name)

- Go to https://automationintesting.online/
- Click the **Book this room** button
- Select a valid date range
- Leave the **First Name** field empty
- Input a valid last name
- Input a valid email
- Input a valid phone number
- Click the **Book** button
- Assert there are errors related to the first name:
  - it should be between 3 and 18 characters
  - should not be blank

(should also test a 1 letter name and a 19 letter name)

### Failed booking (missing last name)

- Go to https://automationintesting.online/
- Click the **Book this room** button
- Select a valid date range
- Input a valid first name
- Leave the **Last Name** field empty
- Input a valid email
- Input a valid phone number
- Click the **Book** button
- Assert there are errors related to the last name:
  - it should be between 3 and 18 characters
  - should not be blank

(should also test a 1 letter name and a 19 letter name)

### Failed booking (missing email)

- Go to https://automationintesting.online/
- Click the **Book this room** button
- Select a valid date range
- Input valid first and last names
- Leave the **Email** field empty
- Input a valid phone number
- Click the **Book** button
- Assert there are errors related to the email:
  - should not be blank

#### Failed booking (invalid email)

- Go to https://automationintesting.online/
- Click the **Book this room** button
- Select a valid date range
- Input valid first and last names
- Input an invalid email
- Input a valid phone number
- Click the **Book** button
- Assert there are errors related to the email:
  - be a well-formed email address

Invalid emails to try:
- username
- username@
- username@domain
- username@domain.

### Failed booking (missing phone number)

- Go to https://automationintesting.online/
- Click the **Book this room** button
- Select a valid date range
- Input valid first and last names
- Input a valid email
- Leave the **Phone** field empty
- Click the **Book** button
- Assert there are errors related to the email:
  - should not be blank
  - should be between 11 and 21 digits

(should also test a 10 digits and 22 digits)


### Successful message sent

- Go to https://automationintesting.online/
- Scroll to thee message form
- Input a valid Name
- Input a valid Email
- Input a valid Phone
- Input a valid Subject
- Input a valid Message
- Click the **Submit** button
- Assert the form is replaced by the success message
  - Assert the title of the success message contains your **Name**
  - Assert the success message contains your **Subject**

### Failed sending message (missing name)

- Go to https://automationintesting.online/
- Scroll to thee message form
- Leave the **Name** empty
- Input a valid Email
- Input a valid Phone
- Input a valid Subject
- Input a valid Message
- Click the **Submit** button
- Assert there are errors related to the **Name**:
  - should not be blank

### Failed sending message (missing email)
- Go to https://automationintesting.online/
- Scroll to thee message form
- Input a valid Name
- Leave the **Email** empty
- Input a valid Phone
- Input a valid Subject
- Input a valid Message
- Click the **Submit** button
- Assert there are errors related to the **Name**:
  - should not be blank

### Failed sending message (invalid email)

- Go to https://automationintesting.online/
- Scroll to thee message form
- Input a valid Name
- Input an invalid email
- Input a valid Phone
- Input a valid Subject
- Input a valid Message
- Click the **Submit** button
- Assert there are errors related to the **Name**:
  - be a well-formed email address

Invalid emails to try:
- username
- username@
- username@domain
- username@domain.

### Failed sending message (missing phone)

- Go to https://automationintesting.online/
- Scroll to thee message form
- Input a valid Name
- Input a valid Email
- Leave the **Phone** empty
- Input a valid Subject
- Input a valid Message
- Click the **Submit** button
- Assert there are errors related to the **Phone**:
  - should not be blank
  - should be between 11 and 21 characters

(should also test with 10 digits and 22 digits)

### Failed sending message (missing subject)

- Go to https://automationintesting.online/
- Scroll to thee message form
- Input a valid Name
- Input a valid Email
- Input a valid Phone
- Leave the **Subject** empty
- Input a valid Message
- Click the **Submit** button
- Assert there are errors related to the **Subject**:
  - should be between 5 and 100 characters.
  - should not be blank

(should also test with a Subject of 4 characters and 101 characters)

### Failed sending message (missing message)

- Go to https://automationintesting.online/
- Scroll to thee message form
- Input a valid Name
- Input a valid Email
- Input a valid Phone
- Input a valid Subject
- Leave the **Message** empty
- Click the **Submit** button
- Assert there are errors related to the **Subject**:
  - should be between 20 and 2000 characters.
  - should not be blank

(should also test with a message of 19 characters and 2001 characters)

## Test Cases for admin

### Successful admin login

- Go to https://automationintesting.online/#/admin
- Input "admin" for the username
- Input "password" for the password
- Click the **Login** button
- Assert the login was successful

### Failed login (username)

- Go to https://automationintesting.online/#/admin
- Input an invalid username
- Input "password" for the password
- Click the **Login** button
- Assert the fields now have a red border
- Assert the user is not logged in

### Failed login (password)

- Go to https://automationintesting.online/#/admin
- Input "admin" for the username
- Input an invalid password
- Click the **Login** button
- Assert the fields now have a red border
- Assert the user is not logged in

<!-- ### Check the previously created booking
Prerequisites: 
- run "Successful booking"
- run "Successful admin login"

- Click the Admin messages icon
- Assert there is a message about your booking (based on name)
- Open the booking message
- Assert the message contains:
  - the correct name for the person
  - the correct date range
  - the correct email
  - the correct phone number

### Create a new room

Prerequisites: 
- run "Successful admin login"

- Go to Rooms in the top navigation
- Input a Room number
- Select a Type
- Select True for Accesible
- Input a Price
- Select Details
- Click the **Create** button
- Go to the main page
- Assert the newly created room is present on the main page -->
 
## Issues I found

1. The phone number field for creating a booking doesn't check for the field to contain only numbers

2. The map at the bottom doesn't seem to do anything

3. The error messages from the booking form don't mention the field where the error appeared

3. Can't seem to be able to select a single day, maybe by design?

4. The database resets every 10 minutes, this can cause issues. In a normal environment I would also do a cleanup in the successful booking test, to make sure there are no collisions when running the test multiple times. 

5. The admin login page performs a request to `/validate` on page entry, so I had to add a workaround to ignore it

6. One email validation fails.
