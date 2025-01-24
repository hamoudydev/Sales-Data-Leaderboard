# Sales Dashboard with Next.js and Google Sheets

This project is a **Sales Dashboard** built with **Next.js** and **Tailwind CSS**. It fetches data from a **Google Sheet** and displays it as a visual leaderboard using bar charts. The dashboard is designed to track metrics like `Credit`, `Submissions`, and `Fundings` for salespeople.

## Features
- **Dynamic Data Fetching**: Fetches data from a Google Sheet in real-time.
- **Visual Leaderboard**: Displays data as bar charts using **Chart.js**.
- **Refresh Button**: Allows manual refreshing of data.
- **Responsive Design**: Built with **Tailwind CSS** for a clean and responsive UI.

---

## Prerequisites
Before running the project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

---

## Getting Started

### 1. Clone the Repository
Clone this repository to your local machine:
```bash
git clone https://github.com/your-username/sales-dashboard.git
cd sales-dashboard
```
### 2. Install Dependencies
Install the required dependencies:
```bash
npm install
```
### 3. Set Up Google Sheets
1. **Create a Google Sheet**:
   - Create a new Google Sheet and add the following column headers (or use your own, just make sure to adjust in the SalesData.tsx file):
     ```
     Salesperson | Credit | Submissions | Fundings
     ```
   - Populate the sheet with your sales data.

2. **Publish the Sheet**:
   - Go to `File > Share > Publish to Web`.
   - Select the sheet and choose `Comma-separated values (.csv)` as the format.
   - Click `Publish` and copy the URL.

3. **Update the URL in the Code**:
   - Open the `SalesData.tsx` file and replace the `url` variable with your published Google Sheets URL:
     ```tsx
     const url = 'YOUR_GOOGLE_SHEETS_PUBLISHED_URL';
     ```

     ### 4. Run the Project
Start the development server:
```bash
npm run dev
```
## Project Structure

sales-dashboard/
├── src/
│   ├── components/
│   │   ├── BarChart.tsx       # Bar chart component
│   │   └── SalesData.tsx      # Main dashboard component
│   ├── app/
│   │   └── page.tsx           # Main page (Next.js App Router)
│   └── styles/
│       └── globals.css        # Global styles
├── public/                    # Static assets
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Project dependencies
└── README.md                  # This file

## Google Sheets Column Headers
Your Google Sheet must have the following column headers for the dashboard to work correctly:
- **Salesperson**: The name of the salesperson.
- **Credit**: The credit amount (e.g., `$5000`).
- **Submissions**: The number of submissions (e.g., `10`).
- **Fundings**: The funding amount (e.g., `$2000`).

Example:
| Salesperson | Credit | Submissions | Fundings |
|-------------|--------|-------------|----------|
| John Doe    | $5000  | 10          | $2000    |
| Jane Smith  | $3000  | 8           | $1500    |

## Technologies Used
- **Next.js**: React framework for server-side rendering and static site generation.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Chart.js**: JavaScript library for creating charts.
- **Google Sheets**: Used as a data source for the dashboard.

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Chart.js Documentation](https://www.chartjs.org/docs/)