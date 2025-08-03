# FoodEase Desktop POS

A standalone Point of Sale (POS) application for restaurants, designed to run on Windows.

---

## 🚀 Setup and Installation

Follow these steps precisely to get the development environment running.

### Prerequisites

* [Node.js](https://nodejs.org/en/) (v18 or later recommended)
* [Composer](https://getcomposer.org/)

### 1. Clone the Repository

You **must** clone the repository with the `--recurse-submodules` flag to correctly pull in the `www` directory.

```bash
git clone --recurse-submodules https://github.com/pavanvattikala/foodease-desktop.git
cd foodease-desktop
```

### 2. Set Up PHP Runtime

The Electron app requires a local PHP installation to run the backend.

* Download the **VS16 x64 Thread Safe** ZIP package for PHP from [the official PHP website](https://windows.php.net/download/).
* Extract the entire contents of the ZIP file into the `/php/` folder at the root of this project.

### 3. Configure the Laravel Backend

All backend setup happens inside the `www` folder.

* **Navigate into the `www` directory:**
    ```bash
    cd www
    ```

* **Install PHP Dependencies:**
    ```bash
    composer install
    ```

* **Create the Environment File:**
    ```bash
    copy .env.example .env
    ```

* **Configure the `.env` for SQLite:**
    Open the new `.env` file and make the following changes:
    1.  Set the database connection to SQLite:
        `DB_CONNECTION=sqlite`
    2.  **Delete** these lines, as they are not needed for SQLite:
        ```
        DB_HOST=127.0.0.1
        DB_PORT=3306
        DB_DATABASE=laravel
        DB_USERNAME=root
        DB_PASSWORD=
        ```
    3.  Add the `LINK_TARGET` variable to enable desktop mode navigation (prevents new tabs from opening):
        `LINK_TARGET=_self`

* **Create the SQLite Database File:**
    ```bash
    touch database/database.sqlite
    ```

* **Generate Application Key:**
    ```bash
    php artisan key:generate
    ```

* **Run Database Migrations & Seeders:**
    This will create all necessary tables in your `database.sqlite` file and fill them with default data.
    ```bash
    php artisan migrate --seed
    ```

### 4. Install Node.js Dependencies

* **Navigate back to the project root:**
    ```bash
    cd ..
    ```

* **Install Electron dependencies:**
    ```bash
    npm install
    ```

---

## ▶️ Running the Application

After completing all installation steps, you can start the FoodEase desktop application.

```bash
npm start
```

---

## 📦 Building for Production

To package the application into a distributable `.exe` file, run the build command from the root directory:

```bash
npm run package
