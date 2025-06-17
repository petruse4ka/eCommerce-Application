# 🛍️ eCommerce Application

This is the final team project for the **JavaScript/Front-end 2024Q4** course at **Rolling Scopes School**, developed by [**Konstantin Petrov**](https://github.com/petruse4ka), [**Daniil Biver**](https://github.com/tearzday) and [**Olga Paklonskaya**](https://github.com/pokolga) under the mentorship of [**Marharyta Malets**](https://github.com/margaryta-maletz).

Our team develops a responsive and fully functional 🛍️ **eCommerce web application** that simulates real-world online shop. The platform allows users to get a full-scale online shopping experience from registration to checkout, offering an intuitive and engaging journey available on all devices 💻📱 with screen sizes as little as **390px**.

The main features of the application include:

- 🔐 **User Authorization** via a dedicated login form
- 🛍️ **Browsing** a wide range of products
- 🔎 **Viewing** detailed product information
- 🛒 **Adding** products to a shopping basket
- 🔍 **Searching, sorting, and filtering** products
- 💳 **Completing purchases** via a checkout page
- 🌐 **Integration with [CommerceTools](https://commercetools.com/)** for product management

---

## 📄 Key Pages

- 🏠 **Main Page**
- 📝 **Login and Registration**
- 👤 **User Profile**
- 🙋‍♂️ **About Us**
- 📋 **Catalog**
- 🔎 **Detailed Product Page**
- 🛒 **Shopping Basket**
- 🧾 **Checkout**

---

## 💻 Technology Stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)  
**HTML5** – Used for structuring the content following modern web standards.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)  
**TypeScript** – Used for enhancing JavaScript with static typing to improve code quality.

![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white)  
**Tailwind CSS** – Used for building modern and responsive UI with a utility-first approach.

![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)  
**Vite** – Used for bundling optimized production builds.

![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=white)  
**Vitest** – Used for unit testing, ensuring high-quality, bug-free code.

![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)  
**ESLint** – Used for enforcing coding standards and catching errors early during development.

![Prettier](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=white)  
**Prettier** – Used for ensuring consistent code style across the entire project.

![Husky](https://img.shields.io/badge/Husky-4E8CAB?logo=husky&logoColor=white)  
**Husky** – Used for automating code checks before commits.

![Stylelint](https://img.shields.io/badge/Stylelint-263238?logo=stylelint&logoColor=white)  
**Stylelint** – Used for maintaining consistent and error-free SCSS/CSS code.

![Netlify](https://img.shields.io/badge/Netlify-00C7B7?logo=netlify&logoColor=white)  
**Netlify** – Used for continuous deployment and hosting.

---

## 🚀 Project setup

Follow these steps to set up and run the project locally.

### Basic requirements

Make sure to have the following installed:

- [Node.js](https://nodejs.org/) version: **23.x** or higher
- [npm](https://www.npmjs.com/)

Verify installation by running in the console:

```bash
node -v
npm -v
```

### Setup Instructions

1. **Open the console and clone the repository**

```bash
git clone https://github.com/petruse4ka/eCommerce-Application.git
```

This will create the new folder with all the files from the repository.

2. **Navigate to the project directory**

```bash
cd ecommerce-application
```

3. **Install project dependencies**

```bash
npm install
```

This will install all packages listed in `package.json`.

4. **Initialize Husky for Git hooks**

```bash
npm run prepare
```

This will set up Husky to run the Git hooks for pre-commit and other automation.

5. **Add environment configuration files**

Create a `.env` file in the root directory with the following CommerceTools API variables:
```
VITE_CTP_PROJECT_KEY=your_project_key
VITE_CTP_CLIENT_SECRET=your_client_secret
VITE_CTP_CLIENT_ID=your_client_id
VITE_CTP_AUTH_URL=your_auth_url
VITE_CTP_API_URL=your_api_url
VITE_CTP_SCOPES=your_api_scopes
```

Also create environment-specific files:
- `.env.development` - Used when running `npm run dev`
- `.env.production` - Used when running `npm run build`

These files should contain environment-specific configurations, including, but not limited to:
```
# .env.development
VITE_API_URL=http://localhost:3000
VITE_DEBUG=true 

# .env.production
VITE_DEBUG=false
```

For local development, you can create a `.env.local` file which will override the values in `.env`.

> ⚠️ **Important:** 
> - Make sure that all the `.env` files are placed in `.gitignore` and are not committed to version control. 
> - All environment variables must be prefixed with `VITE_`.
> - The loading order is: `.env` → `.env.[mode]` → `.env.local` → `.env.[mode].local`
> - Later files override earlier ones.

6. **Start the development server**

```bash
npm run dev
```

This will launch the Vite development server to test that the project has been setup correctly.

> ⚠️ **Important:** If your IDE shows TypeScript-related errors, make sure to check not only the installed TypeScript version but also the TypeScript configuration in your IDE. For **Visual Studio Code** select the TypeScript version by either:
>
> - Clicking the TypeScript version number in the bottom right corner and choosing "Use Workspace Version"
> - Or using the Command Palette (Ctrl+Shift+P or Cmd+Shift+P) and selecting "TypeScript: Select TypeScript Version" → "Use Workspace Version"

## 🎨 Tailwind CSS Development Setup

### VS Code Extensions

To enhance your development experience with Tailwind CSS, install the following extension:

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Tailwind CSS IntelliSense"
4. Click Install

This extension provides:

- Autocomplete suggestions
- Linting
- Hover previews

> ⚠️ **Important:** Make sure to open the project as a separate workspace in VS Code (File → Open Folder → select project folder) to ensure that the workspace-specific Tailwind CSS settings are properly applied. Opening the project as a subfolder of another workspace will not apply the correct settings.

### Font Configuration

To add new fonts to the project:

1. Add the font import URL in `src/styles/main.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');
```

2. Configure the font in Tailwind theme in `src/styles/main.css`:

```css
@theme {
  --custom-font: 'Custom Font', sans-serif;
}
```

3. Use the font in the components:

```typescript
const font = ['custom-font'];
```

### Color Configuration

To add custom colors to the project:

1. Configure the colors in Tailwind theme in `src/styles/main.css`:

```css
@theme {
  --color-accent: #e7426a;
  --color-primary: #f7ebe5;
  --color-secondary: #4e9dd3;
}
```

2. Use the colors in the components:

```typescript
const styles = ['bg-color-accent', 'border-color-secondary', 'hover:bg-color-primary'];
```

---

## 📜 Scripts

Use the following scripts to assist with development, formatting, linting, building, and deploying.

### 🧹 Code Quality Scripts

| Script                  | Description                                                                                                                                                                 |
| :---------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run lint`          | Execute ESLint on all `.ts`, and `.js` files in the `src/` folder to check for code quality issues.                                                                         |
| `npm run lint:fix`      | Execute ESLint and automatically fix all fixable issues.                                                                                                                    |
| `npm run stylelint`     | Execute Stylelint on all `.css` and `.scss` files in the `src/` folder to check for stylesheet issues.                                                                      |
| `npm run stylelint:fix` | Execute Stylelint and automatically fix all fixable issues.                                                                                                                 |
| `npm run format`        | Execute Prettier on all `.ts`, `.js`, `.css`, and `.scss` files in the `src/` folder to check if the files are properly formatted and automatically fix all fixable issues. |
| `npm run format:check`  | Execute Prettier without formatting the files.                                                                                                                              |

### ✅ Testing

| Script                  | Description                                                                         |
| :---------------------- | :---------------------------------------------------------------------------------- |
| `npm run test`          | Execute unit tests using Vitest.                                                    |
| `npm run test:coverage` | Execute unit tests using Vitest and view coverage info.                             |
| `npm run test:update`   | Update snapshots after making changes to test expectations.                         |
| `npm run check`         | Execute a code quality check: Vitest, ESLint, Stylelint, Prettier formatting check. |

### ⚙️ Development & Deployment

| Script            | Description                                 |
| :---------------- | :------------------------------------------ |
| `npm run dev`     | Start a local development server with Vite. |
| `npm run build`   | Build the project for production.           |
| `npm run preview` | Preview the production build locally.       |
| `npm run deploy`  | Build the project and deploy to Netlify     |

### 🛡️ Git Hooks

| Script               | Description                                               |
| :------------------- | :-------------------------------------------------------- |
| `npm run prepare`    | Set up Husky hooks.                                       |
| `npm run pre-commit` | Run linting and formatting on staged files before commit. |

---

## 🌿 Branch Naming Rules

To maintain consistency across the project, follow the branch naming conventions below:

- **New feature:**  
  `feature/task-code-task-name`  
  _Example:_ `feature/RSS-ECOMM-1_01-set-up-github-repository`

- **Bugfix:**  
  `bugfix/task-code-task-name`  
  _Example:_ `bugfix/RSS-ECOMM-1_10-12-set-up-configurations`

- **Refactor:**  
  `refactor/task-code-task-name`  
  _Example:_ `refactor/RSS-ECOMM-1_17-update-readme`

---

## 📝 Commit Naming Rules

Please use **clear, structured commit messages** following these prefixes:

- **`feat:`** – for implementing a new feature  
  _Example:_ `feat: add paginator to cards list`

- **`fix:`** – for fixing a bug in existing functionality  
  _Example:_ `fix: change margins for header`

- **`refactor:`** – for optimizing, cleaning, or changing code structure without changing functionality  
  _Example:_ `refactor: remove redundant interfaces`

- **`docs:`** – for documentation updates or improvements  
  _Example:_ `docs: update README with setup instructions`

- **`test:`** – for adding or improving tests  
  _Example:_ `test: add unit tests for login service`

- **`chore:`** – for minor maintenance tasks that don't affect files or tests  
  _Example:_ `chore: rename environment variable file`

Ensure all commit messages follow this format to maintain consistency throughout the project. For other prefixes, check the **[convention documentation](https://www.conventionalcommits.org/en/v1.0.0/)** to ensure proper usage.

---

## 🔠 Enums/Constants Naming Rules

### General Guidelines

- Use **PascalCase** for enum names.
- Use **UPPER_CASE** for enum members and constants.
- Keep names **meaningful and clear**.
- **Avoid abbreviations** unless widely recognized.
- **Separate words with underscores** when necessary.

### Example Enums

```typescript
enum CardinalDirections {
  NORTH = 'North',
  EAST = 'East',
  SOUTH = 'South',
  WEST = 'West',
  SOUTH_WEST = 'South West',
}

enum UserRoles {
  ADMIN = 'Administrator',
  EDITOR = 'Editor',
  VIEWER = 'Viewer',
}
```

### Example Constants

```typescript
const MAX_RETRIES = 3;
const API_BASE_URL = 'https://api.example.com';
const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection lost',
  PERMISSION_DENIED: 'You do not have permission to perform this action',
  INVALID_PASSWORD: 'The provided credentials are incorrect',
};
```

---

### 🧪 Testing Rules

Follow these guidelines for writing tests:

- Use **BDD (Behavior-Driven Development)** style with `describe` and `test`
- Group related tests under `describe` blocks
- Write test descriptions that read like technical specifications:
  ```typescript
  describe('User Authentication', () => {
    test('should accept valid credentials', () => {
      // test code
    });
    test('should reject invalid password', () => {
      // test code
    });
  });
  ```

---

## 👥 Team Members

- [**Daniil Biver**](https://github.com/tearzday) - Student
- [**Olga Paklonskaya**](https://github.com/pokolga) - Student
- [**Konstantin Petrov**](https://github.com/petruse4ka) - Student
- [**Marharyta Malets**](https://github.com/margaryta-maletz) - Mentor

---

## ✨ Special Acknowledgements

- [**Marharyta Malets**](https://github.com/margaryta-maletz) — Our incredible mentor, whose dedication, continuous support, and valuable feedback guided us throughout the 2nd stage of the Course. Her expertise and encouragement were vital in helping us grow our knowledge, keep our spirits high and stay full focused till the end of the course.
- [**Rolling Scopes School**](https://rs.school/) — For providing an outstanding learning platform, and to all the organizers, coordinators, mentors, moderators, activists, and fellow students of the JavaScript/Front-end Course 2024 Q4 for creating an inspiring and supportive community.
- Our families and friends — For always believing and supporting us unconditionally, allowing us to dedicate countless hours to learning, practicing, and growing during this intense journey even at the expense of spending much less time with us than they would otherwise want.
