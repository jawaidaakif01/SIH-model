What does this project do?
This project is a Water Quality Reporting and Prediction System. It lets users submit water sample data (like pH, turbidity, etc.) through a web form. The backend saves this data and sends it to a Machine Learning (ML) model, which predicts possible waterborne diseases and their severity. The results are shown to the user in a clean, easy-to-read format.

How does it work (big picture)?
Frontend (User Interface): Users fill out a form in their browser.
Backend (Server): Receives the form data, saves it to a database, and asks the ML model for predictions.
ML Service: A Python program that takes the data and predicts disease/severity.
Database: Stores user info and water reports.
Results: The user sees the prediction and their submitted data.




