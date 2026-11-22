document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const registerMessage = document.getElementById('registerMessage');
    let isAdmin = true;

    const arithmeticChallengeSpan = document.getElementById('arithmetic-challenge');
    const arithmeticAnswerInput = document.getElementById('arithmetic-answer');
    const refreshArithmeticCaptchaButton = document.getElementById('refresh-arithmetic-captcha');
    const arithmeticError = document.getElementById('arithmetic-error');
    const captchaAttemptsError = document.getElementById('captcha-attempts-error');

    let arithmeticNum1, arithmeticNum2, arithmeticExpectedAnswer;
    let incorrectAttempts = 0;
    const maxIncorrectAttempts = 3;
    function generateArithmeticCaptcha() {
        //הגרלת 2 מספרים רנדומלים מ- 1 עד 10
        arithmeticNum1 = Math.floor(Math.random() * 10) + 1;
        arithmeticNum2 = Math.floor(Math.random() * 10) + 1;
        /* אתחול אופרטור חישובי ע”י הגרלת מספר בין 1 ל- 0 ולפי בחירת חיבור 
    או חיסור */
        const operations = ['+', '-', '*', '/'];
        const operation = operations[Math.floor(Math.random() * operations.length)];
        //חישוב התוצאה עבור חיבור, חיסור, כפל וחילוק
        if (operation === '+') {
            arithmeticExpectedAnswer = arithmeticNum1 + arithmeticNum2;
        }
        else if (operation === '-') {
            arithmeticExpectedAnswer = arithmeticNum1 - arithmeticNum2;
        }
        else if (operation === '*') {
            arithmeticExpectedAnswer = arithmeticNum1 * arithmeticNum2;
        }
        else {
            arithmeticExpectedAnswer = arithmeticNum1;
            arithmeticNum1 = arithmeticNum1 * arithmeticNum2;
        }

        arithmeticChallengeSpan.textContent =
            `${arithmeticNum1} ${operation} ${arithmeticNum2} = ?`;
        arithmeticAnswerInput.value = '';
        arithmeticError.classList.add('hidden');
    }
    generateArithmeticCaptcha();

    function refreshCaptcha() {
        generateArithmeticCaptcha();
    }
    refreshArithmeticCaptchaButton.addEventListener('click', refreshCaptcha);

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (incorrectAttempts >= maxIncorrectAttempts) {
            captchaAttemptsError.classList.remove('hidden');
            return;
        }

        const username = document.getElementById('userInput').value;
        const email = document.getElementById('mailInput').value;
        const password = document.getElementById('passInput').value;
        const confirmPassword = document.getElementById('passInput2').value;
        const dob = document.getElementById('dateInput').value;
        registerMessage.textContent = "";

        if (password !== confirmPassword) {
            registerMessage.textContent = "Passwords do not match.";
            registerMessage.classList.remove("text-green-500");
            registerMessage.classList.add("text-red-500");
            return;
        }

        let captchaCorrect = false;
        const userAnswer = parseInt(arithmeticAnswerInput.value);
        if (!isNaN(userAnswer) && userAnswer === arithmeticExpectedAnswer) {
            try {
                if (find(username)) {
                    registerMessage.textContent = "Username or email already exists.";
                    registerMessage.classList.remove("text-green-500");
                    registerMessage.classList.add("text-red-500");
                    return;
                }
                if (users == undefined || users.length < 1)
                    isAdmin = true;
                else
                    isAdmin = false;
                add(username, email, password, dob, isAdmin);
                registerMessage.textContent = "Registration successful!";
                registerMessage.classList.remove("text-red-500");
                registerMessage.classList.add("text-green-500");
                document.getElementById('userInput').value = "";
                document.getElementById('mailInput').value = "";
                document.getElementById('passInput').value = "";
                document.getElementById('passInput2').value = "";
                document.getElementById('dateInput').value = "";
            } catch (error) {
                registerMessage.textContent = "An error occurred during registration.";
                registerMessage.classList.remove("text-green-500");
                registerMessage.classList.add("text-red-500");
            }


            incorrectAttempts = 0; //איפוס כמות ניסיונות שגויים
            refreshCaptcha(); //ריענון חישוב אריתמטי
        } else {
            incorrectAttempts++;
            arithmeticError.classList.remove('hidden');
        }

    });


});



