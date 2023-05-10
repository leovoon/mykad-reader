# MyKad Reader

This project is a MyKad (Malaysian identity card) reader that reads and extracts information from the card using a card reader device. The extracted information includes the cardholder's name, IC number, sex, date of birth, state of birth, validity date, nationality, ethnic/race, religion, and address.

## Prerequisites

Before using this project, you will need the following:

-   A card reader device that supports MyKad
-   A computer running Windows, macOS, or Linux
-   Node.js installed on your computer

## Installation

To install the project, follow these steps:

1. Clone the project repository to your computer.
2. Install the project dependencies by running the following command in the project directory:

```bash
npm install
```

## Usage

To use the MyKad reader, follow these steps:

1. Connect the card reader device to your computer.
2. Run the following command in the project directory to start the application:

```bash
node app.js
```

3. Insert a MyKad into the card reader device.
4. The application will automatically read and extract the information from the card and display it on the console.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

This project was inspired by the need for a reliable and efficient way to read and extract information from MyKad identity cards. The project uses the MyKad SDK provided by the Malaysian government.
