# StudyEase

StudyEase is a comprehensive educational platform aimed at providing a seamless experience for students and educators alike. It offers a range of features that facilitate learning, collaboration, and resource sharing.

![StudyEase Logo](https://res.cloudinary.com/dafhg0j7y/image/upload/v1751907424/Screenshot_2025-07-07_222616_rejrxq.png)


## DESCRIPTION

The StudyEase project is designed to streamline the educational process. It allows users to access a variety of educational materials, collaborate on projects, and interact with educators, enhancing the learning experience. StudyEase employs a monolithic architecture and leverages a tech stack involving React.js, Node.js, Express.js, MongoDB, Cloudinary, and Tailwind CSS.

## TECHNOLOGY STACK

StudyEase is built using the following technologies:

### FRONTEND

- *FIGMA :*
  Figma is a collaborative interface design tool that enables multiple users to work on designing clean and minimal user interfaces simultaneously. Its cloud-based approach makes it accessible for design teams to create, prototype, and collaborate on user interface designs.

- *REACT.JS :*
  React.js is a widely used JavaScript library for building user interfaces. It allows for the creation of interactive and reusable UI components, enabling efficient rendering and managing of application state, leading to a seamless user experience.

- *CSS & TAILWIND :*
  Both CSS (Cascading Style Sheets) and Tailwind CSS are styling frameworks used to create visually appealing and responsive user interfaces. CSS is the fundamental technology for styling web pages, while Tailwind CSS is a utility-first CSS framework that aids in building custom designs by composing utility classes.

- *REDUX :*
  Redux is a predictable state container for JavaScript applications. It helps manage the application's state and centralizes the state logic, making it easier to maintain and manage state changes across different parts of the application.

- *CHART.JS :*
  Chart.js is an open-source JavaScript charting library that allows developers to create interactive and visually appealing charts on web applications. It's easy to use and provides a variety of chart types, making data visualization more accessible and engaging for users.

### BACKEND

- *NODE.JS :*
  Node.js is a server-side runtime environment that allows the execution of JavaScript code outside a web browser. It is based on the V8 JavaScript engine and is designed to build scalable and fast network applications. In StudyEase, Node.js serves as the foundational technology for the backend, facilitating the server operations, handling HTTP requests, and managing the overall application workflow.

- *EXPRESS.JS :*
  Express.js is a minimal and flexible Node.js web application framework. It provides a robust set of features to build web applications and APIs. In the context of StudyEase, Express.js simplifies routing, middleware implementation, and handling HTTP requests, allowing for efficient creation and management of backend APIs.

- *MONGODB :*
  MongoDB is a popular NoSQL database that uses a flexible and JSON-like document structure. It's well-known for its scalability, flexibility, and high performance. StudyEase leverages MongoDB to store and manage data efficiently, allowing for easy adaptation to changing data requirements and enabling seamless integration with the application.

- *CLOUDINARY :*
  Cloudinary is a cloud-based media management solution that specializes in the storage, optimization, and delivery of images and videos. In StudyEase, Cloudinary plays a crucial role in managing all media-related content, including images, videos, and documents. It provides functionalities for uploading, storage, and manipulation of media files, ensuring a reliable and scalable media management system.


## API ROUTE

### AUTHENTICATION

| ENDPOINT              | API PATH                           |
|-----------------------|------------------------------------|
| SENDOTP               | `api/v1/auth/sendotp`              |
| SIGNUP                | `api/v1/auth/signup`               |
| LOGIN                 | `api/v1/auth/login`                |
| RESETPASSTOKEN        | `api/v1/auth/reset-password-token` |
| RESETPASSWORD         | `api/v1/auth/reset-password`       |

### PROFILE

| ENDPOINT                 | API PATH                               |
|--------------------------|----------------------------------------|
| GET_USER_DETAILS         | `api/v1/profile/getUserDetails`        |
| GET_USER_ENROLLED_COURSES| `api/v1/profile/getEnrolledCourses`    |
| GET_INSTRUCTOR_DATA      | `api/v1/profile/instructorDashboard`   |

### STUDENT 

| ENDPOINT                 | API PATH                               |
|--------------------------|----------------------------------------|
| COURSE_PAYMENT           | `api/v1/payment/capturePayment`        |
| COURSE_VERIFY            | `api/v1/payment/verifyPayment`         |
| SEND_PAYMENT_SUCCESS_EMAIL| `api/v1/payment/sendPaymentSuccessEmail`|

### COURSE 

| ENDPOINT                     | API PATH                                    |
|------------------------------|---------------------------------------------|
| GET_ALL_COURSE               | `api/v1/course/getAllCourses`                 |
| COURSE_DETAILS               | `api/v1/course/getCourseDetails`              |
| EDIT_COURSE                  | `api/v1/course/editCourse`                    |
| COURSE_CATEGORIES            | `api/v1/course/showAllCategories`             |
| CREATE_COURSE                | `api/v1/course/createCourse`                 |
| CREATE_SECTION               | `api/v1/course/addSection`                   |
| CREATE_SUBSECTION            | `api/v1/course/addSubSection`                |
| UPDATE_SECTION               | `api/v1/course/updateSection`                |
| UPDATE_SUBSECTION            | `api/v1/course/updateSubSection`             |
| GET_ALL_INSTRUCTOR_COURSES   | `api/v1/course/getInstructorCourses`         |
| DELETE_SECTION               | `api/v1/course/deleteSection`                |
| DELETE_SUBSECTION            | `api/v1/course/deleteSubSection`             |
| DELETE_COURSE                | `api/v1/course/deleteCourse`                 |
| GET_FULL_COURSE_DETAILS_AUTHENTICATED | `api/v1/course/getFullCourseDetails`|
| LECTURE_COMPLETION           | `api/v1/course/updateCourseProgress`         |
| CREATE_RATING                | `api/v1/course/createRating`                 |

### RATINGS & REVIEWS

| ENDPOINT                  | API PATH                          |
|---------------------------|-----------------------------------|
| REVIEWS_DETAILS           | `api/v1/course/getReviews`        |

### CATEGORIES 

| ENDPOINT              | API PATH                              |
|-----------------------|---------------------------------------|
| CATEGORIES            | `api/v1/course/showAllCategories`      |

### CATALOG
| ENDPOINT              | API PATH                              |
|-----------------------|---------------------------------------|
| CATALOG_PAGE_DATA       | `api/v1/course/getCategoryPageDetails`|

### CONTACT US 

| ENDPOINT              | API PATH                           |
|-----------------------|------------------------------------|
| CONTACT_US            | `api/v1/reach/contact`              |

### SETTING

| ENDPOINT                  | API PATH                              |
|---------------------------|---------------------------------------|
| UPDATE_DISPLAY_PICTURE     | `api/v1/profile/updateDisplayPicture`  |
| UPDATE_PROFILE             | `api/v1/profile/updateProfile`        |
| CHANGE_PASSWORD            | `api/v1/auth/changepassword`          |
| DELETE_PROFILE             | `api/v1/profile/deleteProfile`       |


### FUNCTIONALITIES

The back end of StudyEase provides a range of features and functionalities, including:

1. *USER AUTHENTICATION & AUTHORIZATION:* Students and instructors can sign up and log in using email addresses and passwords. The platform supports OTP (One-Time Password) verification and forgot password functionality for enhanced security.
2. *COURSE MANAGEMENT:* Instructors can create, read, update, and delete courses, manage course content, and media. Students can view and rate courses.
3. *PAYMENT INTEGRATION:* Students can purchase and enroll in courses by completing the checkout flow that includes Razorpay integration for payment handling.
4. *CLOUD-BASED MEDIA MANAGEMENT:* StudyEase utilizes Cloudinary, a cloud-based media management service, to store and manage all media content, including images, videos, and documents.
5. *MARKDOWN FORMATTING:* Course content is stored in Markdown format, allowing easier display and rendering on the front end.

### FRONTEND

The front end of StudyEase is designed using Figma, a popular design tool that allows for the creation of clean and minimal user interfaces. It comprises various pages for Students, Instructors, and potential Admin functionalities:

#### STUDENT

- *HOMEPAGE:* Brief introduction to the platform with links to the course list and user details.
- *COURSE LIST:* Displays all available courses with descriptions and ratings.
- *WISHLIST:* Shows courses added to the student's wishlist.
- *CART CHECKOUT:* Allows users to complete the course purchase.
- *COOURSE CONTENT:* Displays course material, including videos and related content.
- *USER DETAILS:* Contains information about the student's account.
- *USER EDIT DETAILS:* Enables students to edit their account details.

#### INSTRUCTOR

- *DASHBOARD:* Overview of the instructor's courses, including ratings and feedback.
- *INSIGHTS:* Detailed metrics of the instructor's courses.
- *COURSE MANAGEMENT PAGES:* Creation, update, and deletion of courses, as well as managing content and pricing.
- *VIEW & EDIT PROFILE DETAILS:* View and edit account details.

#### ADMIN (Future Scope)

- *DASHBOARD:* Overview of the platform's courses, instructors, and students.
- *INSIGHTS:* Detailed metrics of the platform, including user count, courses, and revenue.
- *INSTRUCTOR MANAGEMENT:* Admin access to manage instructors, their account details, courses, and ratings.
- *MISCELLANEOUS* Access to user and course management pages.


## ACKNOWLEDGEMENT

I would like to acknowledge the invaluable support and inspiration from the open-source community and various educational platforms that motivated me to develop StudyEase.