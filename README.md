# Timesheet App

Here is the timesheet management application I built. It's designed to help track employee hours and manage approvals.

## How to Run It

You'll need Node.js installed. Then just run:

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app should open up at `http://localhost:5173` (or whatever port Vite picks).

## Tech Stack

I went with a modern React setup for this one:

- **React 19** with **TypeScript**
- **Vite** for the build tool (super fast)
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Hook Form** + **Zod** for handling forms and validation
- **Lucide React** for icons
- **date-fns** for date manipulation

## Notes & Assumptions

- **Mock Data**: Since there's no real backend connected right now, I've set up some mock data and simulated API calls (with shorter delays) to show how it would work in a real scenario.
- **Authentication**: There's a basic auth flow simulated. You can usually log in with the mock credentials provided in the code (or just check `src/api/mock-data.ts` if you need a specific user).
- **Responsive**: Tried to make sure it looks decent on mobile, but primarily optimized for desktop use since it's an admin/entry tool.

## Time Spent

Spent about **27 hours** working on this, covering everything from the initial setup and design to the implementation and Testing the flow.
