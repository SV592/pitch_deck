###  Overview (IN PROGRESS)
This is an **AI-powered pitch deck generator**, a tool designed to streamline pitch deck creation. 
It uses AI to generate and customize pitch presentations.

---

### Key Features

* **AI Content Generation:** Uses the **OpenAI API** to generate initial pitch deck content based on user input.
* **Dynamic UI:** Allows for **drag-and-drop** slide reordering and dynamic editing.
* **Individual Slide Regeneration:** Users can regenerate content for a specific slide based on new instructions.
* **AI-Generated Speaker Notes:** Automatically creates speaker notes for each slide to assist with presentation delivery.
* **User Management:** Implements **Auth0** for secure user authentication and data persistence via a **PostgreSQL** database.
* **Export:** Saves pitch decks in **PowerPoint (.pptx)** format.

---

### Screenshots
    ![screenshoots](https://github.com/user-attachments/assets/aea6da31-6092-4dab-8250-2b79206c5df2)
    ![screenshoots](https://github.com/user-attachments/assets/651917d4-7918-4d9a-b8e1-475d4cf7314c)
    ![screenshoots](https://github.com/user-attachments/assets/726bb98b-1ebf-42e4-b7f9-9bd1d9e14c8c)
    ![screenshoots](https://github.com/user-attachments/assets/c567c9da-a359-4bfb-ac70-1eb89ad305df)
    ![screenshoots](https://github.com/user-attachments/assets/d44b89e7-977c-4edd-a4d9-a9c35914992c)
    ![screenshoots(https://github.com/user-attachments/assets/99781da5-90ab-46c8-ab75-c3b94066c76e)
    ![screenshoots](https://github.com/user-attachments/assets/556c0b3d-d920-405f-8ab3-a00b2b40e24e)
---

### Stack

* **Frontend:** **Next.js** and **Tailwind CSS** for the frontend.
* **Backend:** **NestJS** microservices handle API requests and interact with the **OpenAI API**.
* **Database:** **PostgreSQL** for data management and persistence.
* **Authentication:** **Auth0** for user authentication and authorization.

---

### Todo
* Improve formatting
* Implement the save to PPTX function
* Incorporate AI-generated images
* Improve responsiveness
* Sanitize free-form prompts for regenerating individual slides
* Version control
* Improve progress indicator
* Add keyboard shortcuts
* Add a color palette
