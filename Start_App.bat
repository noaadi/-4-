@echo off
echo מפעיל את שרת האפליקציה...

:: עובר לתיקייה שבה נמצא הקובץ
cd /d "%~dp0"

:: בודק אם npm מותקן
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo שגיאה: npm לא מותקן. אנא התקן Node.js מ-https://nodejs.org
    pause
    exit /b
)

:: מתקין תלויות אם node_modules לא קיים
if not exist "node_modules" (
    echo מתקין תלויות, אנא המתן...
    npm install
)

:: פותח את Chrome בחלון נפרד אחרי 5 שניות
start "" cmd /c "timeout /t 5 /nobreak >nul && start chrome http://localhost:5173/"

:: מפעיל את שרת הפיתוח
echo השרת עולה... Chrome יפתח בעוד כמה שניות.
npm run dev

pause
